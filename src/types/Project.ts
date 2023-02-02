
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
};
