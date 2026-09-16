const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const resourceTypes = ['writing', 'scholarship', 'books', 'software', 'teaching', 'service'];
const resourceLabels = {
  writing: 'Writing',
  scholarship: 'Scholarship',
  books: 'Books',
  software: 'Software',
  teaching: 'Teaching',
  service: 'Service',
};

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

const slugify = (value) => String(value).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const assertUnique = (values, label) => {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) throw new Error(`${label}: duplicate ${value}`);
    seen.add(value);
  }
};

function normalizeReference(type, value, label) {
  if (type === 'teaching') {
    const item = asObject(value, label);
    assertFields(item, new Set(['institution', 'course']), label);
    return { institution: text(item.institution, `${label}.institution`), course: text(item.course, `${label}.course`) };
  }
  const id = text(value, label);
  return type === 'writing' ? normalizeRoute(id, label) : id;
}

function normalizeFeatured(value, label) {
  const item = asObject(value, label);
  const type = text(item.type, `${label}.type`);
  if (!resourceTypes.includes(type)) throw new Error(`${label}.type must be one of ${resourceTypes.join(', ')}`);
  if (type === 'teaching') {
    assertFields(item, new Set(['type', 'institution', 'course']), label);
    return { type, institution: text(item.institution, `${label}.institution`), course: text(item.course, `${label}.course`) };
  }
  assertFields(item, new Set(['type', 'id']), label);
  const id = text(item.id, `${label}.id`);
  return { type, id: type === 'writing' ? normalizeRoute(id, `${label}.id`) : id };
}

const referenceKey = (type, reference) => type === 'teaching'
  ? `${type}:${reference.institution}:${reference.course}`
  : `${type}:${reference}`;

const featuredKey = (item) => referenceKey(item.type, item.type === 'teaching' ? item : item.id);

export function normalizeSubjectsSource(source) {
  const root = asObject(source, '_data/subjects.yml');
  assertFields(root, new Set(['subjects']), '_data/subjects.yml');
  if (!Array.isArray(root.subjects) || root.subjects.length === 0) throw new Error('_data/subjects.yml must define a nonempty subjects array');

  const subjects = root.subjects.map((value, index) => {
    const label = `subjects[${index}]`;
    const item = asObject(value, label);
    assertFields(item, new Set(['slug', 'title', 'description', 'writing_subject', 'featured', 'resources']), label);
    const slug = text(item.slug, `${label}.slug`);
    if (!slugPattern.test(slug)) throw new Error(`${label}.slug must be lowercase kebab-case`);
    if (item.writing_subject != null && !slugPattern.test(text(item.writing_subject, `${label}.writing_subject`))) throw new Error(`${label}.writing_subject must be lowercase kebab-case`);

    const rawResources = asObject(item.resources, `${label}.resources`);
    assertFields(rawResources, new Set(resourceTypes), `${label}.resources`);
    const resources = {};
    for (const [type, values] of Object.entries(rawResources)) {
      if (!Array.isArray(values) || values.length === 0) throw new Error(`${label}.resources.${type} must be a nonempty array`);
      const normalized = values.map((entry, resourceIndex) => normalizeReference(type, entry, `${label}.resources.${type}[${resourceIndex}]`));
      assertUnique(normalized.map((entry) => referenceKey(type, entry)), `${label}.resources.${type}`);
      resources[type] = normalized;
    }
    if (Object.keys(resources).length < 2) throw new Error(`${label} must connect at least two destination families`);

    const featured = (item.featured ?? []).map((entry, featuredIndex) => normalizeFeatured(entry, `${label}.featured[${featuredIndex}]`));
    if (featured.length > 4) throw new Error(`${label}.featured may contain at most four resources`);
    assertUnique(featured.map(featuredKey), `${label}.featured`);
    const resourceKeys = new Set(Object.entries(resources).flatMap(([type, values]) => values.map((entry) => referenceKey(type, entry))));
    for (const entry of featured) if (!resourceKeys.has(featuredKey(entry))) throw new Error(`${label}.featured references a resource not present in its destination group: ${featuredKey(entry)}`);

    return {
      slug,
      title: text(item.title, `${label}.title`),
      description: text(item.description, `${label}.description`),
      ...(item.writing_subject == null ? {} : { writing_subject: item.writing_subject.trim() }),
      featured,
      resources,
    };
  });
  assertUnique(subjects.map((item) => item.slug), 'subjects');
  return { subjects };
}

export function subjectRoutes(source) {
  return ['/subjects/', ...source.subjects.map((item) => `/subjects/${item.slug}/`)];
}

const plainMarkdown = (value) => String(value ?? '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  .replace(/[*_`~]/g, '')
  .replace(/\s+/g, ' ')
  .trim();

function scholarshipRecords(markdown) {
  const records = new Map();
  for (const match of String(markdown).matchAll(/^\*\*\[([^\]]+)\]\(([^)]+)\)\*\*\s+(.+)$/gm)) {
    const [, title, id, remainder] = match;
    const boundary = remainder.indexOf('.  ');
    const metadata = plainMarkdown(boundary < 0 ? remainder : remainder.slice(0, boundary + 1));
    const description = boundary < 0 ? '' : plainMarkdown(remainder.slice(boundary + 3));
    records.set(id, {
      type: 'scholarship',
      id,
      family: resourceLabels.scholarship,
      title: plainMarkdown(title),
      href: id,
      metadata,
      description,
    });
  }
  return records;
}

const published = (data, now) => {
  if (data.published === false) return false;
  if (!data.date) return true;
  let date = data.date instanceof Date ? data.date : new Date(data.date);
  if (Number.isNaN(date.valueOf()) && /^\d{4}-\d{2}-\d{2}T/.test(String(data.date))) date = new Date(`${String(data.date).slice(0, 10)}T00:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date <= now;
};

const writingResource = (post) => {
  const data = post.data ?? post;
  const date = data.date instanceof Date ? data.date.toISOString() : String(data.date);
  return {
    type: 'writing',
    id: post.route ?? data.route,
    family: resourceLabels.writing,
    route: post.route ?? data.route,
    title: String(data.title).replaceAll('&mdash;', '—').replaceAll('&ndash;', '–').replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&apos;', "'"),
    date,
    calendar_date: data.calendar_date ?? `D${date.slice(0, 10)}`,
    featured_image: data.featured_image,
    excerpt: data.excerpt ?? post.excerpt ?? '',
    ...(data.historical_status ? { historical_status: data.historical_status } : {}),
  };
};

export function buildSubjectsData(rawSource, canonical, occupiedRoutes = [], now = new Date()) {
  const source = normalizeSubjectsSource(rawSource);
  const routes = subjectRoutes(source);
  assertUnique(routes, 'Subject routes');
  const occupied = new Set(occupiedRoutes.map((route) => normalizeRoute(route, 'occupied route')));
  for (const route of routes) if (occupied.has(route)) throw new Error(`Subject route collides with an existing route: ${route}`);

  const postMap = new Map(canonical.posts.map((post) => [post.route ?? post.data?.route, post]));
  const writingSubjectMap = new Map(canonical.writing.subjects.map((item) => [item.slug, item]));
  const scholarshipMap = scholarshipRecords(canonical.scholarshipMarkdown);
  const bookMap = new Map(Object.entries(canonical.books).flatMap(([group, items]) => items.map((item) => [item.slug, { ...item, group }])));
  const softwareMap = new Map(Object.entries(canonical.software).flatMap(([group, items]) => Array.isArray(items) ? items.map((item) => [item.name, { ...item, group }]) : []));
  const institutionMap = new Map(canonical.teaching.institutions.map((institution) => [institution.id, institution]));
  const serviceMap = new Map(canonical.service.filter((item) => item.id).map((item) => [item.id, item]));

  const resolve = (type, reference, label) => {
    if (type === 'writing') {
      const post = postMap.get(reference);
      if (!post) throw new Error(`${label}: unknown post route ${reference}`);
      if (!published(post.data ?? post, now)) throw new Error(`${label}: post is not published ${reference}`);
      return writingResource(post);
    }
    if (type === 'scholarship') {
      const record = scholarshipMap.get(reference);
      if (!record) throw new Error(`${label}: unknown selected-scholarship identity ${reference}`);
      return record;
    }
    if (type === 'books') {
      const book = bookMap.get(reference);
      if (!book) throw new Error(`${label}: unknown book slug ${reference}`);
      return {
        type,
        id: reference,
        family: resourceLabels[type],
        title: book.title,
        href: book.detail_url ?? book.games_url ?? book.source_url ?? book.publisher_url,
        metadata: [book.edition, book.year, book.role].filter(Boolean).join(' · '),
        description: book.summary,
      };
    }
    if (type === 'software') {
      const project = softwareMap.get(reference);
      if (!project) throw new Error(`${label}: unknown software project ${reference}`);
      return {
        type,
        id: reference,
        family: resourceLabels[type],
        title: project.name,
        href: `/software/#software-${slugify(project.name)}`,
        metadata: [project.status, project.period, project.technology].filter(Boolean).join(' · '),
        description: project.summary,
      };
    }
    if (type === 'teaching') {
      const institution = institutionMap.get(reference.institution);
      if (!institution) throw new Error(`${label}: unknown teaching institution ${reference.institution}`);
      const course = institution.courses.find((item) => item.code === reference.course);
      if (!course) throw new Error(`${label}: unknown course ${reference.institution}:${reference.course}`);
      return {
        type,
        id: `${reference.institution}:${reference.course}`,
        family: resourceLabels[type],
        title: `${course.code} — ${course.title}`,
        href: `/teaching/#teaching-${slugify(reference.institution)}-${slugify(reference.course)}`,
        metadata: institution.name,
        description: course.description,
      };
    }
    if (type === 'service') {
      const item = serviceMap.get(reference);
      if (!item) throw new Error(`${label}: unknown service id ${reference}`);
      return {
        type,
        id: reference,
        family: resourceLabels[type],
        title: item.organization,
        href: item.detail_page ?? `/service/#service-${slugify(reference)}`,
        metadata: [item.role, item.dates].filter(Boolean).join(' · '),
        description: item.summary,
      };
    }
    throw new Error(`${label}: unsupported resource type ${type}`);
  };

  const subjects = source.subjects.map((subject) => {
    const groups = Object.entries(subject.resources).map(([type, references]) => ({
      type,
      title: resourceLabels[type],
      items: references.map((reference, index) => resolve(type, reference, `subject ${subject.slug}.${type}[${index}]`)),
    }));
    const resolvedByKey = new Map(groups.flatMap((group) => group.items.map((item, index) => [referenceKey(group.type, subject.resources[group.type][index]), item])));
    const writingSubject = subject.writing_subject ? writingSubjectMap.get(subject.writing_subject) : undefined;
    if (subject.writing_subject && !writingSubject) throw new Error(`subject ${subject.slug}: unknown Writing Subject ${subject.writing_subject}`);
    return {
      slug: subject.slug,
      title: subject.title,
      description: subject.description,
      route: `/subjects/${subject.slug}/`,
      families: groups.map((group) => group.title),
      resource_counts: Object.fromEntries(groups.map((group) => [group.type, group.items.length])),
      featured: subject.featured.map((item) => resolvedByKey.get(featuredKey(item))),
      groups,
      ...(writingSubject ? { writing_subject: { slug: writingSubject.slug, title: writingSubject.title, route: writingSubject.route, description: writingSubject.description, post_count: writingSubject.posts.length } } : {}),
    };
  });

  for (const subject of subjects) if (subject.featured.some((item) => !item)) throw new Error(`subject ${subject.slug}: a featured resource did not resolve`);
  return { source, routes, subjects };
}
