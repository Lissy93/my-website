import { config } from '$src/store/BlogStore';
import { GITHUB_TOKEN } from '$env/static/private';
import type { Project } from '$src/types/Project';

const makeProjectList = async (ghResponse: any): Promise<Project[]> => {
  if (!ghResponse || !Array.isArray(ghResponse)) return [];
  return ghResponse
    .map((repo: any) => {
      const projectComplimentaryData =
        config.projectComplimentaryData.find(
          (p) => p.name.toLocaleLowerCase() === repo.name.toLocaleLowerCase()
        ) || {};
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
        archived: repo.archived,
        ...projectComplimentaryData, // Append and merge with any hard-coded data from config
      };
    })
    .sort((a, b) => {
      return b.stars - a.stars;
    });
};

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const githubApiUrl = `https://api.github.com/users/${config.githubUser}/repos?per_page=100`;
  const githubRequest = {
    headers: GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {},
  };
  const repos = await fetch(githubApiUrl, githubRequest)
    .then((res: any) => res.json())
    .then(makeProjectList);
  return { repos };
}
