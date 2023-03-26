import type { SiteConfig } from '$src/types/Config';

const config: SiteConfig = {
  title: 'Alicia Sykes',
  source: 'https://github.com/lissy93/devolio',
  baseUrl: 'https://as93.net',
  initialFeeds: [{ label: 'Notes', url: 'https://notes.aliciasykes.com/feed' }],
  additionalFeeds: [
    { label: 'Notes', url: 'https://notes.aliciasykes.com/feed' },
    {
      label: 'Dev.to',
      url: 'https://raw.githubusercontent.com/Lissy93/feeds/main/dev-to.atom',
    },
    {
      label: 'BlogSpot',
      url: 'https://raw.githubusercontent.com/Lissy93/feeds/main/blogger.atom',
    },
    {
      label: 'GitHub',
      url: 'https://raw.githubusercontent.com/Lissy93/feeds/main/github.atom',
    },
    {
      label: 'StackOverflow',
      url: 'https://raw.githubusercontent.com/Lissy93/feeds/main/stackoverflow.atom',
    },
    // { label: 'Twitter', url: 'https://raw.githubusercontent.com/Lissy93/feeds/main/twitter.atom' },
    {
      label: 'Reddit',
      url: 'https://raw.githubusercontent.com/Lissy93/feeds/main/reddit.atom',
    },
    {
      label: 'Mastodon',
      url: 'https://raw.githubusercontent.com/Lissy93/feeds/main/mastodon.atom',
    },
    {
      label: 'YouTube',
      url: 'https://raw.githubusercontent.com/Lissy93/feeds/main/youtube.atom',
    },
  ],

  routeLinks: [
    { label: 'Home', route: '/', color: 'var(--accent-1, #ff0099)' },
    {
      label: 'Blog',
      route: '/blog',
      color: 'var(--accent-2, #b45eff)',
      description: 'Published articles, notes, tutorials and updates',
    },
    {
      label: 'Projects',
      route: '/projects',
      color: 'var(--accent-3, #01c0f0)',
      description: 'Personal projects and open source work',
    },
    {
      label: 'Contact',
      route: '/contact',
      color: 'var(--accent-1, #ff0099)',
      description: 'Social profile links, GPG keys and contact form',
    },
    {
      label: 'About',
      route: '/about',
      color: 'var(--accent-4, #1de691)',
      description: 'Bio and professional experience',
    },
  ],
  footerInfo: {
    author: 'Alicia Sykes',
    authorSite: 'https://github.com/lissy93',
    license: 'MIT',
    licenseLink: '',
    copyright: true,
  },
  githubUser: 'lissy93',
  defaultTheme: 'callisto',
  defaultLanguage: 'en',
  colorSchemes: {
    dark: {
      background: '#101010',
      foreground: '#fafafa',
      'dimmed-text': '#808080',
      'card-background': '#1b1b1b',
      'card-border': '1px solid #2a2a2a',
      'code-background': '#333',
      accent: '#01c0f0',
      'accent-1': '#ff0099',
      'accent-2': '#b45eff',
      'accent-3': '#01c0f0',
      'accent-4': '#1de691',
    },
    light: {
      background: '#F8F8FF',
      foreground: '#2a3367',
      'card-background': '#ededed',
      'card-border': '1px solid #0000001a',
    },
    callisto: {
      background: '#0B1021',
      foreground: '#dcdcdc',
      'card-background': '#060913',
      'card-border': '1px solid #ffffff1a',
      'accent-1': '#00ccb4',
      'accent-2': '#00ccb4',
      'accent-3': '#00ccb4',
      'accent-4': '#00ccb4',
    },
  },
  projectComplimentaryData: [
    {
      name: 'quick-example-of-testing-in-nodejs',
      thumbnail: 'https://i.ibb.co/WDpBStz/better-test3.png',
    },
    // { name: 'personal-security-checklist', thumbnail: 'https://repository-images.githubusercontent.com/123631418/75bac380-b260-11ea-8cc4-c2272744feab' },
    {
      name: 'dashy',
      featured: true,
      thumbnail:
        'https://repository-images.githubusercontent.com/343078060/82f850a2-b1af-4e9f-9245-c92700d74856',
    },
    {
      name: 'awesome-privacy',
      thumbnail:
        'https://repository-images.githubusercontent.com/512269935/6b38d78e-6e4d-484e-bbc8-e0dd81c97e0a',
    },
    {
      name: 'email-comparison',
      thumbnail: 'https://i.ibb.co/f8ZfxmW/email-comparison-screenshot.png',
    },
    {
      name: 'twitter-sentiment-visualisation',
      thumbnail: 'https://i.ibb.co/W0f10Vv/sentiment-sweep-grid.png',
    },
    {
      name: 'espanso-config',
      thumbnail:
        'https://repository-images.githubusercontent.com/362820466/b1ef9380-a909-11eb-9d34-2aaf94ed5d95',
    },
    { name: '', thumbnail: '' },
    { name: '', thumbnail: '' },
  ],
  postComplimentaryData: [
    {
      postRef: 'CLI tools you cant live without',
      thumbnail: 'https://i.ibb.co/F4THZ2T/cli-tools-banner.png',
    },
    {
      postRef: '20 git commands',
      thumbnail: 'https://i.ibb.co/yqtrTTS/git-commands-banner.png',
    },
    {
      postRef: 'useful css resources',
      thumbnail: 'https://i.ibb.co/CMxy3tz/css-resources-2.png',
    },
    {
      postRef: 'my top 50 windows apps',
      thumbnail: 'https://i.ibb.co/nmPRGgp/open-source-windows-apps.png',
    },
    {
      postRef: 'my top 50 android apps',
      thumbnail: 'https://i.ibb.co/cc8WP4K/App-icons-banner-medium.png',
    },
    {
      postRef: 'pimping up your duckduckgo',
      thumbnail: 'https://i.ibb.co/6XYydtq/Duck-Duck-Go-Themes.png',
    },
    {
      postRef: 'custom styling for listed',
      thumbnail: 'https://i.ibb.co/dMh1y13/listed-dark.png',
    },
    {
      postRef: 'fun with realtime data',
      thumbnail: 'https://i.ibb.co/HqJ77Mf/Fun-with-live-data-banner.png',
    },
    {
      postRef: 'fave youtube chanels',
      thumbnail: 'https://i.ibb.co/185MLZq/youtube-channels-banner.png',
    },
    {
      postRef: 'top 25 raspberry pi projects',
      thumbnail: 'https://i.ibb.co/LP1wZtc/Top-Raspberry-Pi-Projects.png',
    },
    {
      postRef: 'using espanso to boost efficiency',
      thumbnail: 'https://i.ibb.co/6W1Bqyz/espanso-config-banner.png',
    },
    {
      postRef: 'hello world',
      thumbnail: 'https://i.ibb.co/0rfWV1f/DSCN0566-1.jpg',
    },
    {
      postRef: 'dashy a selfhosted homelab dashboard',
      thumbnail: 'https://i.ibb.co/c6kTRch/dashy-theme.png',
    },
    { postRef: '', thumbnail: '' },
  ],
  contact: {
    name: 'Alicia Sykes',
    email: 'alicia@omg.lol',
    website: 'https://aliciasykes.com',
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
    mailerConfig: {
      service_id: 'gmail',
      template_id: 'website-contact-form',
      user_id: 'user_K6F041q1dQvz8SJLSOZCR',
      template_params: {},
    },
    pgpKeyLink: 'https://keybase.io/aliciasykes/pgp_keys.asc?fingerprint=0688f8d34587d954e9e51fb8fedb68f55c0283a7',
    pgpPublicKey: `-----BEGIN PGP PUBLIC KEY BLOCK-----
      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
      mFFVmpQe2X/qgZBVVYC+LjpxNEMt6w==
      =dpLK
      -----END PGP PUBLIC KEY BLOCK-----
`,
  },
  about: {
    intro: 'Just your average dev...',
    bio: [
      "I'm Alicia, a London-based software engineer.",

      `I have a particular interest in privacy-respecting software, as well as security.
      I've carried out a few audits, and authored the initial versions of
      <a href="https://github.com/Lissy93/personal-security-checklist">Personal Security Checklist</a>
      and <a href="https://github.com/Lissy93/awesome-privacy">Awesome Privacy</a>.`,

      `I enjoy going to (<a href="https://notes.aliciasykes.com/p/0s5s3uOtKj">and sometimes winning!</a>) hackathons.
      And if you're London-based, you'll probably have bumped into me at a tech meetup.`,

      `I love Linux, and (imo) have a neat
      <a href="https://github.com/lissy93/dotfiles">dotfiles setup</a> which I'm always tweaking.
      And I have a small homelab, that I'm using to learn more about system administration,
      and host my own services to (attempt to) escape big tech.
      I made <a href="https://github.com/Lissy93/dashy">dashboard app</a> for it.
      `,

      `For work, I'm a principal software engineer at <a href="https://and.digital/">AND.Digital</a>,
      where I work across various client projects, help to upskill and mentor junior and mid-level
      developers and ensure that the code we're delivering is the best it can be.`,

      `Away from the keyboard, I like sports, hanging out with friends, and going to Church.`,
    ],
    picture: 'https://i.ibb.co/svxHFMD/alicia-sykes-3.jpg',
  },
  techStack: {
    backend: [
      {
        language: 'Go',
        projects: ['go-apod'],
      },
      {
        language: 'Node',
        projects: [' twitter-sentiment-visualisation', 'quick-example-of-testing-in-nodejs'],
      },
      {
        language: 'Python',
        projects: ['gh-trending-no-cors', 'tfl-lift-availability-dash', 'pax'],
      },
      {
        language: 'Java',
        projects: ['Minesweper', 'AlternativeVoteSystem', 'TuneSender', 'TreasureHunt'],
      },
      {
        language: 'PHP',
        projects: [ 'revision-quizzes', 'intern-magnet', 'usermonkey' ],
      },
    ],
    frontend: [
      {
        language: 'Vue',
        projects: ['dashy', 'all-the-countries', 'alicia-sykes-website', 'tfl-lift-availability-dash'],
      },
      {
        language: 'Angular',
        projects: ['happy-app', 'realtime-speech-analytics'],
      },
      {
        language: 'Svelte',
        projects: ['devolio', 'cheat-code'],
      },
      {
        language: 'D3',
        projects: ['twitter-sentiment-visualisation', 'voronoi-site-template', 'happy-app', 'realtime-speech-analytics'],
      },
      {
        language: 'HTML',
        projects: ['md-cv-maker', 'email-extractor', 'bullet-convertor', 'cyber-defence-presentation', 'voronoi-site-template', 'web-dev-school'],
      },
      {
        language: 'CoffeeScript',
        projects: ['sentiment-analysis'],
      },
    ],
    mobile: [
      {
        language: 'Swift',
        projects: ['hasami-shogi', 'Spotter'],
      },
      {
        language: 'Kotlin',
        projects: ['anti-theft-charge'],
      },
      {
        language: 'Flutter',
        projects: ['nfu'],
      },
      {
        language: 'Android',
        projects: ['Minesweper', 'anti-theft-charge', 'TuneSender', 'TreasureHunt', 'got-home-safe', 'Study-Time'],
      },
      // {
      //   language: 'React Native',
      //   projects: [''],
      // },
    ],
    other: [
      {
        language: 'Bash',
        projects: ['minimal-terminal-prompt'],
      },
      {
        language: 'Docker',
        projects: ['docker-tcpdump', 'dashy'],
      },
      {
        language: 'Config',
        projects: ['dotfiles', 'espanso-config', 'conky-system-stats-widget', 'Brewfile'],
      },
      {
        language: 'Markdown',
        projects: ['personal-security-checklist', 'awesome-privacy'],
      },
    ],
  }
  
  // [
  //   {
  //     language: 'JavaScript',
  //     projects: [ 'alicia', 'thing' ],
  //   },
  // ],
};

export default config;
