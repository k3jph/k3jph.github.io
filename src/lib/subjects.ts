interface SubjectResource {
  route?: string;
  href?: string;
}

interface SubjectGroup {
  items?: SubjectResource[];
}

interface Subject {
  route: string;
  featured?: SubjectResource[];
  groups?: SubjectGroup[];
}

const localResourceRoute = (resource: SubjectResource) => {
  if (resource.route?.startsWith('/')) return resource.route;
  if (resource.href?.startsWith('/') && !resource.href.includes('#')) return resource.href;
  return undefined;
};

export const subjectsForRoute = (subjects: Subject[], route: string) => subjects.filter((subject) => {
  const resources = [
    ...(subject.featured ?? []),
    ...(subject.groups ?? []).flatMap((group) => group.items ?? []),
  ];
  return resources.some((resource) => localResourceRoute(resource) === route);
});
