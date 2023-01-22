
import type { RssUrlList } from '$src/types/RssXml';

interface SiteConfig {
  title: string, // Website title / name
  source: string, // Link to project source (e.g. on GitHub)
  initialFeeds: RssUrlList, // List of RSS feeds to fetch + show on load
  additionalFeeds: RssUrlList, // List of all available feeds to add to filter dropdown
  routeLinks: { // List of route links to show in the navbar
    route: string,
    label: string,
  }[],
  routeColors?: { // Accent colors for each route (may be hex code, or CSS variable)
    route: string,
    color: string,
  }[],
  footerInfo: { // Meta and legal info to display in the footer
    author: string,
    authorSite: string,
    license: string,
    licenseLink: string,
    copyright: boolean,
  },
  githubUser: string, // GitHub username to fetch projects from
  projects: {
    repo: string, // GitHub repo name
  }[],
};

const config: SiteConfig = {
  title: 'Alicia Sykes',
  source: 'https://github.com/lissy93/aggregated-blog',
  initialFeeds: [
    { label: 'Notes', url: 'https://notes.aliciasykes.com/feed' },
  ],
  additionalFeeds: [
    { label: 'Notes', url: 'https://notes.aliciasykes.com/feed' },
    { label: 'Dev.to', url: 'https://raw.githubusercontent.com/Lissy93/feeds/main/dev-to.atom' },
    { label: 'BlogSpot', url: 'https://raw.githubusercontent.com/Lissy93/feeds/main/blogger.atom' },
    { label: 'GitHub', url: 'https://raw.githubusercontent.com/Lissy93/feeds/main/github.atom' },
    { label: 'StackOverflow', url: 'https://raw.githubusercontent.com/Lissy93/feeds/main/stackoverflow.atom' },
    // { label: 'Twitter', url: 'https://raw.githubusercontent.com/Lissy93/feeds/main/___.atom' },
    { label: 'Reddit', url: 'https://raw.githubusercontent.com/Lissy93/feeds/main/reddit.atom' },
    { label: 'Mastodon', url: 'https://raw.githubusercontent.com/Lissy93/feeds/main/mastodon.atom' },
    { label: 'YouTube', url: 'https://raw.githubusercontent.com/Lissy93/feeds/main/youtube.atom' },
  ],
  routeLinks: [
    { label: 'Home', route: '/' },
    { label: 'Blog', route: '/blog' },
    { label: 'Projects', route: '/projects' },
    { label: 'Contact', route: '/contact' },
    { label: 'About', route: '/about' },
  ],
  routeColors: [
    { route: '/', color: '#ff0099' },
    { route: '/blog', color: '#b45eff' },
    { route: '/about', color: '#1de691' },
    { route: '/contact', color: '#ff0099' },
    { route: '/projects', color: '#01c0f0' },
  ],
  footerInfo: {
    author: 'Alicia Sykes',
    authorSite: 'https://github.com/lissy93',
    license: 'MIT',
    licenseLink: '',
    copyright: true,
  },
  githubUser: 'lissy93',
  projects: [
    { repo: 'aggregated-blog' },
  ]
};

export default config;
