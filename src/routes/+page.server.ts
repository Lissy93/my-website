import { redirect } from '@sveltejs/kit';

import config from '$src/helpers/config';
import { LOAD_INDEX } from '$env/static/private';

// If the app is configured to use the /index route instead of home, then redirect
export function load() {
  if ((LOAD_INDEX && LOAD_INDEX === 'true') || config?.loadIndex) {
    throw redirect(302, '/index');
  }
};