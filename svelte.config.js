import autoAdapter from '@sveltejs/adapter-auto';
import netlifyAdapter from '@sveltejs/adapter-netlify';
import vercelAdapter from '@sveltejs/adapter-vercel';
import nodeAdapter from '@sveltejs/adapter-node';

import { vitePreprocess } from '@sveltejs/kit/vite';

const multiAdapter = (adapters) => {
  return {
    async adapt(argument) {
      await Promise.all(adapters.map(item =>
        Promise.resolve(item).then(resolved => resolved.adapt(argument))
      ))
    }
  };
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: multiAdapter([autoAdapter(), netlifyAdapter(), vercelAdapter(), nodeAdapter()]),
    alias: {
      '$src/*': 'src/*',
    },
  },
};

export default config;
