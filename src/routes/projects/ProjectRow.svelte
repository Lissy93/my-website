<script lang="ts">
  import type { Project } from '$src/types/Project';
  import LinkButton from '$src/components/LinkButton.svelte';
  import LangBadge from '$src/components/LangBadge.svelte';
  import Icon from '$src/components/Icon.svelte';
  import {
    formatTitle,
    putCommasInBigNum,
    getMonthYear,
    calculateTimeAgo
  } from './card-helpers';

  export let repo: Project;

</script>

<div class="project-row">

  <!-- Image -->
  {#if repo.thumbnail}
    <img class="thumbnail" src="{repo.thumbnail}" alt="Screenshot of {repo.name}" width="300" />
  {/if}

  <!-- Main content -->
  <div class="row-left">

    <!-- Project name, and fork badge if applicable -->
    <h2>
      {formatTitle(repo.name)}
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

    <div class="lower-row">  
      <!-- Project stats -->
      <div class="repo-info">
        <!-- Programming language badge -->
        {#if repo.language}
          <LangBadge class="lang-badge" language={repo.language} />
        {/if}
        <!-- Star count -->
        {#if repo.stars > 3}
          <div class="info-item star-count" title="{repo.stars} Stars">
            {putCommasInBigNum(repo.stars)}
            <Icon
              name="star"
              color="var(--foreground)"
              hoverColor="var(--warning)"
            />
          </div>
        {/if}
        <!-- Fork count -->
        {#if repo.forks > 1}
          <div class="info-item fork-count" title="{repo.forks} Forks">
            {putCommasInBigNum(repo.forks)}
            <Icon name="fork" color="var(--foreground)" />
          </div>
        {/if}
        {#if repo.issues > 0}
          <div class="info-item issue-count" title="{repo.issues} Open Issues">
            {putCommasInBigNum(repo.issues)}
            <Icon name="issue" color="var(--foreground)" />
          </div>
        {/if}
        {#if repo.license && (repo.featured || repo.stars <= 3)}
          <div class="info-item license-type" title="Licensed under {repo.license}">
            {repo.license.replace('License', '')}
            <Icon name="license" color="var(--foreground)" />
          </div>
        {/if}
        {#if repo.size}
          <div class="info-item size-value" title="Size: {repo.size} KB">
            {Math.round(repo.size / 1024)} mb <Icon
              name="size"
              color="var(--foreground)"
            />
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
        <LinkButton to={repo.url} target="_blank" icon="github"
          >View on GitHub</LinkButton
        >
        <!-- Link to project homepage / demo, if available -->
        {#if repo.homepage && !repo.isFork}
          <LinkButton
            to={repo.homepage}
            priority="secondary"
            target="_blank"
            icon="website"
            textColor="var(--foreground)"
          >
            View Demo
          </LinkButton>
        {/if}
      </div>
    </div>
  </div>
</div>


<style lang="scss">
  .project-row {
    background: var(--card-background);
    border: var(--card-border);
    display: flex;
    flex-wrap: wrap;
    .row-left {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin: 0 var(--grid-item-spacing);;
      justify-content: space-between;
      min-width: 20rem;
      .lower-row {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 1rem 0.25rem;
      }
    }
    .thumbnail {
      width: min(100%, 24rem);
      max-height: 12rem;
      border-radius: 4px;
      margin: 0 auto;
    }
    h2 {
      font-family: RedHatText;
      font-size: 2rem;
      margin: 0.5rem 0;
      text-transform: capitalize;
      .is-fork-label {
        font-size: 1rem;
        font-weight: normal;
        border: var(--card-border);
        border-radius: 4px;
        padding: 0 0.25rem;
        vertical-align: middle;
        margin-left: 0.5rem;
      }
    }
    .repo-description {
      font-family: RedHatText;
      margin: 0.5rem 0;
    }
    .repo-info {
      display: flex;
      gap: var(--grid-item-spacing);
      justify-content: space-between;
      overflow: hidden;
      flex-wrap: wrap;
      opacity: 0.65;
    }
    .date-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      p {
        margin: 0;
        font-size: 0.75rem;
        color: var(--foreground);
      }
    }
    .view-buttons {
      display: flex;
      gap: var(--grid-item-spacing);
      margin: 0 0 0.5rem auto;
      float: right;
      flex-direction: row-reverse;
      :global(a) {
        height: fit-content;
      }
    }
    &:hover {
      .repo-info {
        opacity: 1;
      }
      .star-count :global(svg path) {
        fill: var(--warning);
      }
      .fork-count :global(svg path) {
        fill: var(--success);
      }
      .issue-count :global(svg path) {
        fill: var(--error);
      }
      .license-type :global(svg path) {
        fill: var(--info);
      }
      .size-value :global(svg path) {
        fill: var(--misc);
      }
    }
  }
</style>
