export function load({ params }) {
  const slug = params.slug;
  if (slug === '404') throw error(404);

  return {
    slug,
  };
}
