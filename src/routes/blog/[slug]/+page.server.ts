import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const prerender = true;

export function load(pageData: PageServerLoad) {
  const slug = pageData.params.slug;
  if (slug === '404') throw error(404);

  return {
    slug,
  };
}
