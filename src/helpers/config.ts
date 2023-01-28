
import type { RssUrlList } from '$src/types/RssXml';
import type { Usernames } from '$src/types/Socials';

interface SiteConfig {
  title: string, // Website title / name
  source: string, // Link to project source (e.g. on GitHub)
  initialFeeds: RssUrlList, // List of RSS feeds to fetch + show on load
  additionalFeeds: RssUrlList, // List of all available feeds to add to filter dropdown
  routeLinks: { // List of route links to show in the navbar
    route: string,
    label: string,
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
  contact: {
    name: string, // Full name associated with contact email
    email: string, // Email address to display
    socials: Usernames, // Keyed list of social media usernames
    socialButtonLimit: number, // Number of social links to show, before show-more clicked
  },
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
    // { label: 'Twitter', url: 'https://raw.githubusercontent.com/Lissy93/feeds/main/twitter.atom' },
    { label: 'Reddit', url: 'https://raw.githubusercontent.com/Lissy93/feeds/main/reddit.atom' },
    { label: 'Mastodon', url: 'https://raw.githubusercontent.com/Lissy93/feeds/main/mastodon.atom' },
    { label: 'YouTube', url: 'https://raw.githubusercontent.com/Lissy93/feeds/main/youtube.atom' },
  ],
  routeLinks: [
    { label: 'Home', route: '/', color: '#ff0099' },
    { label: 'Blog', route: '/blog', color: '#b45eff' },
    { label: 'Projects', route: '/projects', color: '#01c0f0' },
    { label: 'Contact', route: '/contact', color: '#ff0099' },
    { label: 'About', route: '/about', color: '#1de691' },
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
  ],
  contact: {
    name: 'Alicia Sykes',
    email: 'alicia@omg.lol',
    socials: {
      Twitter: 'Lissy_Sykes',
      GitHub: 'Lissy93',
      'Dev.to': 'Lissy93',
      Mastodon: '@Lissy93',
      LinkedIn: 'in/AliciaSykes',
      Instagram: 'liss.sykes',
      YouTube: 'AliciaSykes',
      Reddit: 'lissy93',
      StackOverflow: '979052/alicia',
      KeyBase: 'AliciaSykes',
      Facebook: 'Liss.Sykes',
      PeerList: 'alicia',
      CodersRank: 'lissy93',
      'OMG.lol': 'alicia',
    },
    socialButtonLimit: 6,
  },
};

export default config;
