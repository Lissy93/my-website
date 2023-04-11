import { redirect } from '@sveltejs/kit';

import config from '$src/helpers/config';
import * as publicEnvs from '$env/static/public';

// If the app is configured to use the /index route instead of home, then redirect
export function load() {
  const shouldLoadIndex = publicEnvs?.PUBLIC_LOAD_INDEX || config?.loadIndex;
  if (shouldLoadIndex) {
    throw redirect(302, '/index');
  }
};