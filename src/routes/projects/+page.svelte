<script lang="ts">
  import { browser } from '$app/environment';
  import { slide } from 'svelte/transition';
  import Heading from '$src/components/Heading.svelte';
  import Button from '$src/components/Button.svelte';
  import ProjectCard from './ProjectCard.svelte';
  import MirrorCard from './MirrorCard.svelte';
  import ProjectRow from './ProjectRow.svelte';
  import type { Project } from '$src/types/Project';
  import AnimateOnScroll from '$src/components/AnimateOnScroll.svelte';
  import Icon from '$src/components/Icon.svelte';
  import RadioGroup from '$src/components/RadioGroup.svelte';
  import LangBadge from '$src/components/LangBadge.svelte';
  

  export let data;
  let searchTerm = '';
  let showFilters = false;
  let filteredRepos = data.repos.filter((r: Project) => !r.isFork);
  const repos = data.repos;
  const mirrors = data.mirrors;
  let searchInputRef: any | HTMLElement; // Has to be any, as used in context of <svelte:element>
  let itemsToShow = 20;
  
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

    itemsToShow = 20;
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

    itemsToShow = repos.length; // Show everything while searching

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

    // Hide repo types if selected by user (forks and archived projects)
    if (hiddenRepos.length > 0) {
      filteredRepos = filteredRepos.filter((repo: Project) => {
        if (hiddenRepos.includes('hide-forks') && repo.isFork) return false;
        if (hiddenRepos.includes('hide-archived') && repo.archived) return false;
        return true;
      });
    }

    // If sort preference set, then sort results
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

    // If language selected, then filter by language
    if (selectedLanguages.length > 0) {
      filteredRepos = filteredRepos.filter((repo: Project) => {
        return selectedLanguages.includes(repo.language);
      });
    }

    // If topic selected, then filter by topic
    if (selectedTopics.length > 0) {
      filteredRepos = [...filteredRepos.filter((repo: Project) => {
        return repo.topics.some((topic: string) => {
          return selectedTopics.includes(topic);
        });
      })];
    }

    // If order preference set, then order results
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
    (repo.featured && browser && window.innerWidth > 768) ? 'grid-row: span 2; grid-column: span 2;' : '';
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
      {:else if (index < itemsToShow)}
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

{#if repos.length > itemsToShow}
  <div class="load-more">
    <span>Showing {itemsToShow} of {repos.length}+ projects</span>
    <Button
      icon="expand-down"
      click={() => itemsToShow += 20}
    >Load more</Button>
  </div>
{/if}

{#if repos.length <= itemsToShow && repos.length >= 100}
  <div class="load-more">
    <span>Due to limitations with the GitHub API, this page only shows a maximum of 100 repositories</span>
  </div>
{/if}

{#if mirrors.length > 0}
<section class="mirror-list">
  <div class="title">
    <Heading level="h2" size="2.5rem">mirrors</Heading>
  </div>
  <div class="mirror-grid">
    {#each mirrors as mirror}
      <AnimateOnScroll
        once={true}
        animation={'fade-in 1s cubic-bezier(0.4, 0.6, 0.5, 1.000) both'}
      >
        <MirrorCard {mirror} />
      </AnimateOnScroll>
    {/each}
  </div>
</section>
{/if}

<style lang="scss">
  @import './styles.scss';
</style>
