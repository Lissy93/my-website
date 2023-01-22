import { config } from '$src/store/BlogStore';
import type { Project } from '$src/types/Project';

const makeProjectList = async (ghResponse: any): Promise<Project[]> => {
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
  })
  .sort((a, b) => {
    return b.stars - a.stars; 
  });
};

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const githubApiUrl = `https://api.github.com/users/${config.githubUser}/repos?per_page=100`;
  const repos = await fetch(githubApiUrl)
  .then((res: any) => res.json())
  .then(makeProjectList);
  return {
    repos,
  };
}
