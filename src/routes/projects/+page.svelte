<script lang="ts">
  import { browser } from '$app/environment';
  import { slide } from 'svelte/transition';
  import Heading from '$src/components/Heading.svelte';
  import ProjectCard from './ProjectCard.svelte';
  import ProjectRow from './ProjectRow.svelte';
  import type { Project } from '$src/types/Project';
  import AnimateOnScroll from '$src/components/AnimateOnScroll.svelte';
  import Icon from '$src/components/Icon.svelte';
  import RadioGroup from '$src/components/RadioGroup.svelte';
  import LangBadge from '$src/components/LangBadge.svelte';
  

  export let data;
  let searchTerm = '';
  let showFilters = false;
  let filteredRepos = data.repos;
  const repos = data.repos;
  let searchInputRef: any | HTMLElement; // Has to be any, as used in context of <svelte:element>
  
  let sortBy: string = '';
  let orderBy: string = '';
  let hiddenRepos: string[] = [];
  let selectedLanguages: string[] = [];
  let selectedTopics: string[] = [];

  type DisplayModes = 'grid' | 'list' | null;
  let displayMode: DisplayModes = null;

  const getAllLanguages = (repos: Project[]): string[] => {
    const languages = repos.map((repo: Project) => repo.language);
    const nonNullArr = languages.filter(item => item !== null) as string[];
    const frequency: { [key: string]: number } = {};
    nonNullArr.forEach(item => {
        frequency[item] = (frequency[item] || 0) + 1;
    });
    const result = nonNullArr.sort((a, b) => frequency[b] - frequency[a])
      .filter((item, index, self) => self.indexOf(item) === index);
    return result || [];
  };

  const getAllTopics = (repos: Project[]): string[] => {
    const topics = repos.map((repo: Project) => repo.topics).flat();
    const nonNullArr = topics.filter(item => item !== null) as string[];
    const frequency: { [key: string]: number } = {};
    nonNullArr.forEach(item => {
        frequency[item] = (frequency[item] || 0) + 1;
    });
    const result = nonNullArr.sort((a, b) => frequency[b] - frequency[a])
      .filter((item, index, self) => self.indexOf(item) === index).slice(0,20);
    return result || [];
  };

  /* Sets display mode to grid, list or null (for auto) */
  const toggleDisplayMode = (newVal: DisplayModes) => {
    displayMode = newVal;
  };

  /* Resets search field, shows all results again. Triggered by Clear btn or Esc key*/
  const cancelSearch = () => {
    searchTerm = '';
    filteredRepos = repos;
    showFilters = false;

    sortBy = '';
    orderBy = '';
    hiddenRepos = [];
    selectedLanguages = [];
    selectedTopics = [];
  };

  const toggleShowFilters = (e: any) => {
    showFilters = !showFilters;
  };

  const handleSortRadio = (event: { detail: { selected: any; }; }) => {
    sortBy = event.detail.selected || '';
    updateFilteredRepos();
  };
  const handleOrderRadio = (event: { detail: { selected: any; }; }) => {
    orderBy = event.detail.selected || '';
    updateFilteredRepos();
  };
  const handleHideRepos = (event: { detail: { selected: any; }; }) => {
    hiddenRepos = event.detail.selected || [];
    updateFilteredRepos();
  };
  const updateSelectedLanguages = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      selectedLanguages = selectedLanguages.filter(item => item !== lang);
    } else {
      selectedLanguages.push(lang);
    }
    selectedLanguages = [...selectedLanguages];
    updateFilteredRepos();
  }
  const updateSelectedTopics = (event: { detail: { selected: any; }; }) => {
    selectedTopics = event.detail.selected;
    updateFilteredRepos();
  }

  /* Update displayed repositories, based on users search term */
  const updateFilteredRepos = () => {
    const doesValInclude = (searchVal: string, dataItem: string | null) => {
      return (
        dataItem && dataItem.toLowerCase().includes(searchVal.toLowerCase())
      );
    };
    // Search by name
    filteredRepos = repos.filter((repo: Project) => {
      return doesValInclude(searchTerm, repo.name);
    });
    // If no results, then expand search to include description, language and homepage
    if (filteredRepos.length === 0) {
      filteredRepos = repos.filter((repo: Project) => {
        return (
          doesValInclude(searchTerm, repo.description) ||
          doesValInclude(searchTerm, repo.language) ||
          doesValInclude(searchTerm, repo.homepage)
        );
      });
    }

    if (hiddenRepos.length > 0) {
      filteredRepos = filteredRepos.filter((repo: Project) => {
        if (hiddenRepos.includes('hide-forks') && repo.isFork) return false;
        if (hiddenRepos.includes('hide-archived') && repo.archived) return false;
        return true;
      });
    }

    if (sortBy) {
      filteredRepos = filteredRepos.sort((a: Project, b: Project) => {
        if (sortBy === 'sort-date') {
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        } else if (sortBy === 'sort-stars') {
          return b.stars - a.stars;
        }
        return 0;
      });
    }

    if (selectedLanguages.length > 0) {
      filteredRepos = filteredRepos.filter((repo: Project) => {
        return selectedLanguages.includes(repo.language);
      });
    }

    if (selectedTopics.length > 0) {
      filteredRepos = [...filteredRepos.filter((repo: Project) => {
        return repo.topics.some((topic: string) => {
          return selectedTopics.includes(topic);
        });
      })];
    }


    if (orderBy) {
      filteredRepos = orderBy === 'order-asc' ? filteredRepos.reverse() : filteredRepos;
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
  };

  const isSpan = (repo: Project) =>
    repo.featured ? 'grid-row: span 2; grid-column: span 2;' : '';
</script>

<svelte:window on:keydown={handleKeydown} />

<section>
  <div class="title">
    <Heading level="h2" size="2.5rem">projects</Heading>
  </div>

  <div class="post-filter-options">
    <div>
      {#if searchTerm}
        <div class="results-info">
          <p>
            Showing {filteredRepos.length} results for '<i>{searchTerm}</i>'
          </p>
          <button class="clear-search" on:click={cancelSearch}>✗ Clear</button>
        </div>
      {/if}
    </div>

    <div class="filter-controls">
      <button on:click={toggleShowFilters} class="filter-toggle-btn">
        { showFilters ? '⌃ Hide' : '⌄ Show' } Filters
      </button>
      <label for="filter-input">Search</label>
      <input
        bind:value={searchTerm}
        type="text"
        id="filter-input"
        on:keyup={updateFilteredRepos}
        bind:this={searchInputRef}
      />
    </div>
  </div>

  {#if showFilters}
  <div class="advanced-filters" transition:slide>
    <div class="af af-view-wrap">
      <label on:click={() => toggleDisplayMode(null)} class="view-mode-label">View</label>
      <div class="view-mode-options">
        <button class="display-btn" class:selected="{displayMode === 'grid'}" on:click={() => toggleDisplayMode('grid')}>
          <Icon name="grid" />
        </button>
        <button class="display-btn" class:selected="{displayMode === 'list'}" on:click={() => toggleDisplayMode('list')}>
          <Icon name="list" />
        </button>
      </div>
    </div>

    <RadioGroup
      on:change={handleSortRadio}
      groupLabel="Sort by"
      groupId="sort-by"
      options={[{ id: 'sort-date', label: 'Last Updated', selected: false }, { id: 'sort-stars', label: 'Popularity', selected: false }]}
    />

    <RadioGroup
      on:change={handleOrderRadio}
      groupLabel="Order"
      groupId="sort-order"
      options={[{ id: 'order-asc', label: 'Ascending', selected: false }, { id: 'order-desc', label: 'Descending', selected: false }]}
    />

    <RadioGroup
      on:change={handleHideRepos}
      groupLabel="Hide repos"
      groupId="hide-repos"
      multiple={true}
      options={[{ id: 'hide-forks', label: 'Hide Forks', selected: false }, { id: 'hide-archived', label: 'Hide Archived', selected: false }]}
    />

    <div class="af af-view-wrap">
      <label class="view-mode-label">Languages</label>
      <div class="view-mode-options language-selector">
        {#each getAllLanguages(repos) as lang}
        <span on:click={() => updateSelectedLanguages(lang)} class:selectedLang={selectedLanguages.includes(lang)}>
          <LangBadge language={lang} size={20} />
        </span>
        {/each}
      </div>
    </div>


    <RadioGroup
      on:change={updateSelectedTopics}
      groupLabel="Topics"
      groupId="select-topics"
      multiple={true}
      options={getAllTopics(repos).map(topic => ({ id: topic, label: topic, selected: false }))}
    />

    <div class="af cancel-filters">
      <label class="view-mode-label">Cancel</label>
      <button class="clear-search" on:click={cancelSearch}>✗ Reset all Filters</button>
    </div>
  </div>
  {/if}

  <div class="project-grid">
    {#each filteredRepos as repo, index}
      {#if (index < 7 && searchTerm === '' && !showFilters && displayMode !== 'grid')
        && (browser && window.innerWidth > 768)
        || displayMode === 'list'
      }
        <AnimateOnScroll
        once={true}
        animation={'fade-in 1s cubic-bezier(0.4, 0.6, 0.5, 1.000) both'}
        style="grid-column: 1 / -1;"
      >
        <ProjectRow {repo} />
        </AnimateOnScroll>
      {:else}
        <AnimateOnScroll
        once={true}
        animation={'fade-in 1s cubic-bezier(0.4, 0.6, 0.5, 1.000) both'}
        style={isSpan(repo)}
      >
        <ProjectCard {repo} />
      </AnimateOnScroll>
      {/if}
    {/each}
  </div>
</section>

<style lang="scss">
  @import '$src/styles/dimensions.scss';
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
      .filter-toggle-btn {
        font-family: FiraCode;
        background: var(--card-background);
        border: var(--card-border);
        border-radius: var(--curve-factor);
        padding: 0.35rem;
        color: var(--foreground);
        cursor: pointer;
      }
    }
  }

  .advanced-filters {
    display: flex;
    align-items: center;
    margin: 0 calc(5vw + 1rem);
    flex-wrap: wrap;
    .view-mode-label {
      font-size: 0.8rem;
      color: var(--dimmed-text);
    }
    .view-mode-options {
      display: flex;
    }
    .language-selector {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      align-items: center;
      .selectedLang {
        display: flex;
        border: var(--card-border);
        padding: 5px 5px 0 5px;
        border-radius: 4px;
        &::before {
          content: '✓';
          margin-right: 10px;
        }
      }
    }
    .af {
      display: flex;
      flex-direction: column;
      &.cancel-filters {
        button {
          margin: 0 0.25rem;
          padding: 0.2rem 0.25rem;
          font-family: FiraCode;
          background: var(--card-background);
          border: var(--card-border);
          border-radius: 4px;
          cursor: pointer;
          &:hover { color: var(--accent); }
        }
      }
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

  .display-btn {
    background: var(--card-background);
    border: var(--card-border);
    border-radius: var(--curve-factor);
    margin-right: 0.25rem;
    display: flex;
    padding: 0.35rem;
    color: var(--foreground);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:last-of-type {
      margin-right: 1rem;
    }
    &:hover {
      color: var(--accent);
      transform: scale(1.05);
    }
    &.selected {
      // color: var(--accent);
      border: 1px solid var(--accent);
    }
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
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
