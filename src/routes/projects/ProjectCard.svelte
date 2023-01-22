<script lang="ts">
  import type { Project } from '$src/types/Project';
  import LinkButton from '$src/components/LinkButton.svelte';
  import LangBadge from '$src/components/LangBadge.svelte';
  import Icon from '$src/components/Icon.svelte';

  export let repo: Project;

  /* Make large numbers easier to read, with commas */
  const putCommasInBigNum = (bigNum: number): string => {
    return bigNum.toLocaleString();
};

  /* Get date in month YYYY format*/
  const getMonthYear = (inputDate: string): string => {
    const date = new Date(inputDate);
    return `${date.toLocaleString('default', { month: 'short' })}, ${date.getFullYear()}`;
  };

  /* Get amount of time ago (e.g. 5 days, 1 year) */
  const calculateTimeAgo = (inputDate: string) => {
  const seconds = Math.floor((new Date().getTime() - new Date(inputDate).getTime()) / 1000);  
  const intervals = [31536000, 2592000, 86400, 3600, 60];
  const intervalNames = ['year', 'month', 'day', 'hour', 'minute'];

  for (let i = 0; i < intervals.length; i++) {
    const interval = Math.floor(seconds / intervals[i]);
    if (interval >= 1) {
      return `${interval} ${intervalNames[i]}${interval > 1 ? 's' : ''} ago`;
    }
  }
  return `${Math.floor(seconds)} seconds ago`;
}

</script>


<div class="project-card">
  
  <!-- Project name, and fork badge if applicable -->
  <h2>
    {repo.name}
    {#if repo.isFork}<span class="is-fork-label">Fork</span>{/if}
  </h2>
  
  <!-- Project description -->
  <p class="repo-description">
    {#if repo.description}
      {repo.description}
    {:else}
      <i>A mysterious project, without a description</i>
    {/if}
  </p>

  <!-- Project stats -->
  <div class="repo-info">
    <!-- Programming language badge -->
    {#if repo.language}
      <LangBadge class="lang-badge" language={repo.language} />
    {/if}
    <!-- Star count -->
    {#if repo.stars > 3}
    <div class="info-item">
      {putCommasInBigNum(repo.stars)} <Icon name="star" color="var(--foreground)" />
    </div>
    {/if}
    <!-- Fork count -->
    {#if repo.forks > 1}
    <div class="info-item">
      {putCommasInBigNum(repo.forks)} <Icon name="fork" color="var(--foreground)" />
    </div>
    {/if}
    <!-- Dates created and last updated -->
    <div class="info-item date-info">
      <p title={repo.createdAt}>Created {getMonthYear(repo.createdAt)}</p>
      <p title={repo.updatedAt}>Updated {calculateTimeAgo(repo.updatedAt)}</p>
    </div> 
  </div>

  <!-- Project link buttons -->
  <div class="view-buttons">
    <!-- Link to GitHub repo -->
    <LinkButton to={repo.url} target="_blank" icon="github">View on GitHub</LinkButton>
    <!-- Link to project homepage / demo, if available -->
    {#if repo.homepage && !repo.isFork}
      <LinkButton
        to={repo.homepage}
        priority="secondary"
        target="_blank"
        icon="website"
        textColor="var(--foreground)">
        View Demo
      </LinkButton>
    {/if}
  </div>

</div>

<style lang="scss">
  .project-card {
    padding: 0 0.5rem;
    border: var(--card-border);
    background: var(--card-background);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.2s ease-in-out;
    cursor: default;
    height: 100%;
    h2 {
      margin: 0;
      display: flex;
      align-items: center;
      gap: 1rem;
      justify-content: space-between;
      font-family: RedHatText;
    }
    p {
      margin: 0.25rem 0;
    }
    .is-fork-label {
      display: inline;
      font-size: 0.75rem;
      font-weight: normal;
      opacity: 0.5;
      border: var(--card-border);
      padding: 0.1rem 0.25rem;
      border-radius: var(--curve-factor);
    }
    .repo-description {
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      margin: 0.5rem 0;
      font-family: RedHatText;
      line-height: 1.5rem;
    }
    .repo-info {
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: inherit;
      opacity: 0.65;
      transition: all 0.2s ease-in-out;
      .info-item {
        display: flex;
        gap: 0.25rem;
        align-items: center;
      }
      .date-info {
        display: flex;
        flex-direction: column;
        align-items: baseline;
        font-size: 0.7rem;
        line-height: 0.6rem;
        color: var(--dimmed-text);
        p {
          margin: 0;
        }
      }
    }
    .view-buttons {
      padding: 0.5rem 0;
      display: flex;
      gap: 1rem;
      justify-content: space-between;
    }
    &:hover {
      .repo-info {
        opacity: 1;
      }
    }
  }
</style>