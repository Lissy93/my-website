import autoAdapter from '@sveltejs/adapter-auto';
import staticAdapter from '@sveltejs/adapter-static';
import netlifyAdapter from '@sveltejs/adapter-netlify';
import vercelAdapter from '@sveltejs/adapter-vercel';
import nodeAdapter from '@sveltejs/adapter-node';

import { vitePreprocess } from '@sveltejs/kit/vite';

let selectedAdapter;

if (process.env.DEPLOY_TARGET === 'NETLIFY') {
  selectedAdapter = netlifyAdapter();
} else if (process.env.DEPLOY_TARGET === 'VERCEL') {
  selectedAdapter = vercelAdapter();
} else if (process.env.DEPLOY_TARGET === 'NODE') {
  selectedAdapter = nodeAdapter();
} else if (process.env.DEPLOY_TARGET === 'AUTO') {
  selectedAdapter = autoAdapter();
} else {
  selectedAdapter = staticAdapter();
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: selectedAdapter,
    alias: {
      '$src/*': 'src/*',
    },
    prerender: {
      handleMissingId: 'ignore', // or 'remove' or 'fail'
      crawl: true,
    }
  },
  worker: {
    plugins: [
      {
        name: 'remove-manifest',
        configResolved(c) {
          const manifestPlugin = c.worker.plugins.findIndex((p) => p.name === 'vite:manifest');
          c.worker.plugins.splice(manifestPlugin, 1);
          const ssrManifestPlugin = c.worker.plugins.findIndex(
            (p) => p.name === 'vite:ssr-manifest'
          );
          c.plugins.splice(ssrManifestPlugin, 1);
        }
      }
    ]
  }
};

export default config;
