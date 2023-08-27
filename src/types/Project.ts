export interface Project {
  id: number;
  name: string;
  user: string;
  url: string;
  description: string;
  isFork: boolean;
  createdAt: string;
  updatedAt: string;
  homepage: string;
  language: string;
  license: string;
  size: number;
  stars: number;
  forks: number;
  issues: number;
  topics: string[];
  thumbnail?: string;
  hidden?: boolean;
  featured?: boolean;
  archived?: boolean;
}

export interface Mirror {
  id: number;
  name: string;
  full_name: string;
  description: string;
  avatar_url: string;
  language: string;
  html_url: string;
  website: string;
  stars_count: number;
  created_at: string;
  updated_at: string;
}
