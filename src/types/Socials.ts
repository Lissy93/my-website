export const SupportedSocials: readonly string[] = [
  'Twitter',
  'GitHub',
  'Dev.to',
  'Mastodon',
  'LinkedIn',
  'Instagram',
  'YouTube',
  'Reddit',
  'StackOverflow',
  'KeyBase',
  'Facebook',
  'PeerList',
] as const;

export interface SocialNetwork {
  name: typeof SupportedSocials[number];
  icon: string;
  tone: string;
  link: string;
  noAt?: boolean;
}

export interface SocialMetric {
  label: string;
  value: string | number;
}

export interface UserSocial extends SocialNetwork {
  user: string;
  metrics?: SocialMetric[];
}

export type Usernames = {
  [key in typeof SupportedSocials[number]]: string;
};

export interface SocialMetric {
  label: string;
  value: string | number;
}
