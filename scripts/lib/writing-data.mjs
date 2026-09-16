const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const asObject = (value, label) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object`);
  return value;
};

const assertFields = (value, allowed, label) => {
  for (const field of Object.keys(value)) if (!allowed.has(field)) throw new Error(`${label}: unsupported field ${field}`);
};

const text = (value, label) => {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${label} must be a nonempty string`);
  return value.trim();
};

const normalizeRoute = (value, label) => {
  const route = text(value, label);
  if (!route.startsWith('/') || route.startsWith('//') || route.includes('?') || route.includes('#')) throw new Error(`${label} must be a canonical site route`);
  return route === '/' || route.endsWith('/') || /\.[a-z0-9]+$/i.test(route) ? route : `${route}/`;
};

const normalizeReference = (value, label, { featured = false } = {}) => {
  const item = typeof value === 'string' ? { route: value } : asObject(value, label);
  assertFields(item, new Set(featured ? ['route', 'note', 'featured'] : ['route', 'note']), label);
  if (item.note != null && (typeof item.note !== 'string' || !item.note.trim())) throw new Error(`${label}.note must be a nonempty string when provided`);
  if (featured && item.featured != null && typeof item.featured !== 'boolean') throw new Error(`${label}.featured must be a boolean when provided`);
  return {
    route: normalizeRoute(item.route, `${label}.route`),
    ...(item.note == null ? {} : { note: item.note.trim() }),
    ...(!featured || item.featured == null ? {} : { featured: item.featured }),
  };
};

const assertUnique = (values, label) => {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) throw new Error(`${label}: duplicate ${value}`);
    seen.add(value);
  }
};

export function normalizeWritingSource(source) {
  const root = asObject(source, '_data/writing.yml');
  assertFields(root, new Set(['selected', 'subjects', 'series']), '_data/writing.yml');
  if (!Array.isArray(root.selected) || !Array.isArray(root.subjects) || !Array.isArray(root.series)) throw new Error('_data/writing.yml must define selected, subjects, and series arrays');

  const selected = root.selected.map((item, index) => normalizeReference(item, `selected[${index}]`, { featured: true }));
  assertUnique(selected.map((item) => item.route), 'selected');

  const subjects = root.subjects.map((value, index) => {
    const item = asObject(value, `subjects[${index}]`);
    assertFields(item, new Set(['slug', 'title', 'description', 'posts']), `subjects[${index}]`);
    const slug = text(item.slug, `subjects[${index}].slug`);
    if (!slugPattern.test(slug)) throw new Error(`subjects[${index}].slug must be lowercase kebab-case`);
    if (!Array.isArray(item.posts) || item.posts.length === 0) throw new Error(`subjects[${index}].posts must be a nonempty array`);
    const posts = item.posts.map((post, postIndex) => normalizeReference(post, `subjects[${index}].posts[${postIndex}]`));
    assertUnique(posts.map((post) => post.route), `subject ${slug}`);
    return { slug, title: text(item.title, `subjects[${index}].title`), description: text(item.description, `subjects[${index}].description`), posts };
  });
  assertUnique(subjects.map((item) => item.slug), 'subjects');

  const series = root.series.map((value, index) => {
    const item = asObject(value, `series[${index}]`);
    assertFields(item, new Set(['slug', 'title', 'description', 'posts']), `series[${index}]`);
    const slug = text(item.slug, `series[${index}].slug`);
    if (!slugPattern.test(slug)) throw new Error(`series[${index}].slug must be lowercase kebab-case`);
    if (!Array.isArray(item.posts) || item.posts.length < 2) throw new Error(`series[${index}].posts must contain at least two posts`);
    const posts = item.posts.map((post, postIndex) => normalizeReference(post, `series[${index}].posts[${postIndex}]`));
    assertUnique(posts.map((post) => post.route), `series ${slug}`);
    return { slug, title: text(item.title, `series[${index}].title`), description: text(item.description, `series[${index}].description`), posts };
  });
  assertUnique(series.map((item) => item.slug), 'series');

  return { selected, subjects, series };
}

export function writingRoutes(source) {
  const routes = ['/writing/', '/writing/subjects/', '/writing/series/'];
  routes.push(...source.subjects.map((item) => `/writing/subjects/${item.slug}/`));
  routes.push(...source.series.map((item) => `/writing/series/${item.slug}/`));
  return routes;
}

const isPublished = (data, now) => {
  if (data.published === false) return false;
  if (!data.date) return true;
  let date = data.date instanceof Date ? data.date : new Date(data.date);
  if (Number.isNaN(date.valueOf()) && /^\d{4}-\d{2}-\d{2}T/.test(String(data.date))) date = new Date(`${String(data.date).slice(0, 10)}T00:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date <= now;
};

const resolvedPost = (post) => {
  const data = post.data ?? post;
  const date = data.date instanceof Date ? data.date.toISOString() : String(data.date);
  const title = String(data.title)
    .replaceAll('&mdash;', '—').replaceAll('&ndash;', '–').replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&apos;', "'");
  return {
    route: post.route ?? data.route,
    title,
    date,
    calendar_date: data.calendar_date ?? `D${date.slice(0, 10)}`,
    featured_image: data.featured_image,
    excerpt: data.excerpt ?? post.excerpt ?? '',
    ...(data.historical_status ? { historical_status: data.historical_status } : {}),
  };
};

export function buildWritingData(rawSource, posts, occupiedRoutes = [], now = new Date()) {
  const source = normalizeWritingSource(rawSource);
  const byRoute = new Map(posts.map((post) => {
    const data = post.data ?? post;
    return [post.route ?? data.route, post];
  }));
  const resolve = (reference, label) => {
    const post = byRoute.get(reference.route);
    if (!post) throw new Error(`${label}: unknown post route ${reference.route}`);
    const data = post.data ?? post;
    if (!isPublished(data, now)) throw new Error(`${label}: post is not published ${reference.route}`);
    return { ...resolvedPost(post), ...('note' in reference ? { note: reference.note } : {}), ...('featured' in reference ? { featured: reference.featured } : {}) };
  };

  const routes = writingRoutes(source);
  assertUnique(routes, 'Writing routes');
  const occupied = new Set([...occupiedRoutes].map((route) => normalizeRoute(route, 'occupied route')));
  for (const route of routes) if (occupied.has(route)) throw new Error(`Writing route collides with an existing route: ${route}`);

  return {
    source,
    routes,
    selected: source.selected.map((item, index) => resolve(item, `selected[${index}]`)),
    subjects: source.subjects.map((subject) => ({
      slug: subject.slug,
      title: subject.title,
      description: subject.description,
      route: `/writing/subjects/${subject.slug}/`,
      posts: subject.posts.map((item, index) => resolve(item, `subject ${subject.slug}[${index}]`)),
    })),
    series: source.series.map((series) => ({
      slug: series.slug,
      title: series.title,
      description: series.description,
      route: `/writing/series/${series.slug}/`,
      part_count: series.posts.length,
      posts: series.posts.map((item, index) => ({ ...resolve(item, `series ${series.slug}[${index}]`), part: index + 1 })),
    })),
  };
}
