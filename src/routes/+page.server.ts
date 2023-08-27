// import { redirect } from '@sveltejs/kit';

// import config from '$src/helpers/config';
// import * as publicEnvs from '$env/static/public';

// // If the app is configured to use the /index route instead of home, then redirect
// export function load() {
//   const shouldLoadIndex = publicEnvs?.PUBLIC_LOAD_INDEX || config?.loadIndex;
//   if (shouldLoadIndex) {
//     throw redirect(302, '/index');
//   }
// };

import { load as loadPosts } from '$src/routes/blog/+page.server';
import { load as loadProjects } from '$src/routes/projects/+page.server';
import { load as loadSocials } from '$src/routes/contact/+page.server';
import config from '$src/helpers/config';
import type { PageServerLoad } from './$types';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch }: PageServerLoad) => {
  return {
    posts: (await loadPosts({ fetch }, config.initialFeeds)).posts,
    repos: (await loadProjects({ fetch })).repos,
    socials: (await loadSocials({ fetch })).props,
  };
};
