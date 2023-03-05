import type { SocialNetwork } from '$src/types/Socials';

export const emailJsEndpoint = 'https://api.emailjs.com/api/v1.0/email/send';

export const socialNetworks: SocialNetwork[] = [
  {
    name: 'Twitter',
    icon: 'twitter',
    tone: '#1DA1F2',
    link: 'https://twitter.com/',
  },
  {
    name: 'GitHub',
    icon: 'github2',
    tone: '#585858',
    link: 'https://github.com/',
  },
  { name: 'Dev.to', icon: 'dev-to', tone: '#f1f155', link: 'https://dev.to/' },
  {
    name: 'Mastodon',
    icon: 'mastodon',
    tone: '#6364FF',
    link: 'https://mastodon.social/',
    noAt: true,
  },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    tone: '#0A66C2',
    link: 'https://www.linkedin.com/',
    noAt: true,
  },
  {
    name: 'Instagram',
    icon: 'instagram',
    tone: '#E4405F',
    link: 'https://www.instagram.com/',
  },
  {
    name: 'YouTube',
    icon: 'youtube',
    tone: '#FF0000',
    link: 'https://www.youtube.com/c/',
  },
  {
    name: 'Reddit',
    icon: 'reddit',
    tone: '#FF4500',
    link: 'https://www.reddit.com/user/',
  },
  {
    name: 'StackOverflow',
    icon: 'stackoverflow',
    tone: '#F58025',
    link: 'https://stackoverflow.com/users/',
    noAt: true,
  },
  {
    name: 'KeyBase',
    icon: 'keybase',
    tone: '#33A0FF',
    link: 'https://keybase.io/',
    noAt: true,
  },
  {
    name: 'Facebook',
    icon: 'facebook',
    tone: '#1877F2',
    link: 'https://www.facebook.com/',
  },
  {
    name: 'PeerList',
    icon: 'peerlist',
    tone: '#00ac43',
    link: 'https://peerlist.io/',
  },
  {
    name: 'CodersRank',
    icon: 'codersrank',
    tone: '#72a0a8',
    link: 'https://profile.codersrank.io/user/',
  },
  {
    name: 'OMG.lol',
    icon: 'omg-lol',
    tone: '#ff69ad',
    link: 'https://omg.lol/',
  },
];
