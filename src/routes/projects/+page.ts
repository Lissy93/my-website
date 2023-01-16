import { config } from '$src/store/BlogStore';

interface Project {
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
};

const makeProjectList = (ghResponse: any): Project[] => {
  return ghResponse.map((repo: any) => {
    return {
      id: repo.id,
      name: repo.name,
      user: repo.owner.login,
      url: repo.html_url,
      description: repo.description,
      isFork: repo.fork,
      createdAt: repo.created_at,
      updatedAt: repo.pushed_at,
      homepage: repo.homepage,
      language: repo.language,
      license: repo.license?.name,
      size: repo.size,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      issues: repo.open_issues_count,
      topics: repo.topics,
    }
  });
};


/** @type {import('./$types').PageLoad} */
export async function load() {
  const githubApiUrl = `https://api.github.com/users/${config.githubUser}/repos?per_page=100`;
  const repos = fetch(githubApiUrl).then(makeProjectList);
  return {
    repos,
  };
}
