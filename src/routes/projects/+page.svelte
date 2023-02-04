<script lang="ts">
  import Heading from '$src/components/Heading.svelte';
  import ProjectCard from './ProjectCard.svelte';
  import type { Project } from '$src/types/Project';
  import AnimateOnScroll from '$src/components/AnimateOnScroll.svelte';

  export let data;
  let searchTerm = '';
  let filteredRepos = data.repos;
  const repos = data.repos;
  let searchInputRef: any | HTMLElement; // Has to be any, as used in context of <svelte:element>

  /* Resets search field, shows all results again. Triggered by Clear btn or Esc key*/
  const cancelSearch = () => {
    searchTerm = '';
    filteredRepos = repos;
  };

  /* Update displayed repositories, based on users search term */
  const updateFilteredRepos = () => {
    const doesValInclude = (searchVal: string, dataItem: string | null) => {
      return (dataItem && dataItem.toLowerCase().includes(searchVal.toLowerCase()));
    };
    // Search by name
    filteredRepos = repos.filter((repo: Project) => {
      return doesValInclude(searchTerm, repo.name);
    });
    // If no results, then expand search to include description, language and homepage
    if (filteredRepos.length === 0) {
      filteredRepos = repos.filter((repo: Project) => {
        return doesValInclude(searchTerm, repo.description)
          || doesValInclude(searchTerm, repo.language)
          || doesValInclude(searchTerm, repo.homepage);
      });
    }
  };

  /**
   * Trigger/ cancel search when a keyboard event is triggered
   * If key is alphanumeric then focus search field, or if it's the Esc key then de-focus
   * @param event
   */
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key.length === 1 && /^[a-z0-9]+$/i.test(event.key)) {
      searchInputRef.focus();
    } else if (event.key === 'Escape') {
      cancelSearch();
      searchInputRef.blur();
    }
  }

  const isSpan = (repo: Project) => repo.featured ? 'grid-row-start: span 2; grid-column-start: span 2;' : '';

</script>

<svelte:window on:keydown={handleKeydown} />

<section>
  <div class="title">
    <Heading level="h2" size="2.5rem">projects</Heading>
  </div>

  <div class="post-filter-options">
    <div>
      {#if searchTerm }
        <div class="results-info">
          <p>Showing {filteredRepos.length} results for '<i>{searchTerm}</i>'</p>
          <button class="clear-search" on:click={cancelSearch}>✗ Clear</button>
        </div>
      {/if}
    </div>
    <div class="filter-controls">
      <form class="filter-form">
        <label for="filter-input">Search</label>
        <input
          bind:value={searchTerm}
          type="text"
          id="filter-input"
          on:keyup={updateFilteredRepos}
          bind:this={searchInputRef}
        />
      </form>
    </div>
  </div>


  <div class="project-grid">
  {#each filteredRepos as repo}
    <AnimateOnScroll once={true} animation={'fade-in 1s cubic-bezier(0.4, 0.6, 0.5, 1.000) both'} style={isSpan(repo)}>
        <ProjectCard repo={repo} />
    </AnimateOnScroll>
  {/each}
  </div>
    

</section>

<style lang="scss">
  @import "$src/styles/dimensions.scss";
  section {
    margin: 1rem auto;
    text-align: left;
    width: 100%;
  }
  .title {
    margin: 0 calc(5vw + 1rem);
  }
  .project-grid {
    display: grid;
    grid-auto-flow: dense;
    grid-template-columns: repeat(auto-fit, minmax(var(--grid-item-width), 1fr));
    gap: var(--grid-item-spacing);
    padding: var(--grid-item-spacing);
    margin: var(--grid-item-spacing) 5vw;
    list-style: none;
  }


  .post-filter-options {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .filter-controls {
      display: flex;
      gap: 1rem;
      margin: 0 calc(5vw + 1rem);
    }
  }

  form {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  label {
    margin-right: 1rem;
  }
  input {
    background: var(--card-background);
    outline: none;
    border: var(--card-border);
    padding: 0.25rem 0.5rem;
    color: var(--accent);
    font-family: FiraCode;
    font-size: 1rem;
    border-radius: 4px;
  }

  .results-info {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin: 0.25rem calc(5vw + 1rem);
    p {
      margin: 0;
    }
    button {
      border: none;
      outline: none;
      background: var(--accent);
      color: var(--foreground);
      border-radius: 4px;
      margin: 0 0.5rem;
      cursor: pointer;
    }
  }

  .no-results {
    background: var(--card-background);
    border: var(--card-border);
    border-radius: 4px;
    color: var(--foreground);
    margin: 2rem calc(5vw + 1rem);
    padding: 1rem 2rem;
    h4 {
      font-size: 1.6rem;
      margin: 0.5rem 0;
    }
  }

  @keyframes -global-fade-in {
    0% { opacity: 0; }
    100% {opacity: 1; }
  }
</style>
