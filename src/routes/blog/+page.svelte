<script lang="ts">
  import { goto } from '$app/navigation';
  import { t } from '$src/store/Language';
  import {
    blogStore,
    filtered,
    searchTerm,
    rssFeedUrls,
  } from '$src/store/BlogStore';
  import { slugify, formatDate } from '$src/helpers/post-utils';
  import { PostStatus, type RssPost } from '$src/types/RssXml';
  import SearchBar from '$src/components/SearchBar.svelte';
  import Loading from '$src/components/Loading.svelte';
  import DropDown from '$src/components/DropDown.svelte';
  import Heading from '$src/components/Heading.svelte';
  import AnimateOnScroll from '$src/components/AnimateOnScroll.svelte';

  export let data;

  import { _loadPosts } from './client';

  export let fetchStatus: PostStatus = PostStatus.Loading;

  blogStore.set(data.posts);

  rssFeedUrls.subscribe(() => {
    _loadPosts();
  });

  let searchInputRef: any | HTMLElement; // Has to be any, as used in context of <svelte:element>

  /**
   * Make path for blog post, based on post title
   * @param postTitle
   */
  const makeHref = (postTitle: string) => {
    return `/blog/${slugify(postTitle)}`;
  };

  /**
   * Navigate to post when clicked
   * Only used, if the user misses the inner <a> tag
   * @param postTitle
   */
  const postClicked = (postTitle: string) => {
    goto(makeHref(postTitle), {});
    return null;
  };

  /**
   * Resets search field, and show all results again
   * Triggered when Clear button or Esc key is pressed
   */
  const cancelSearch = () => {
    searchTerm.set('');
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

  const makeHoverText = (post: RssPost) => {
    const secondsDifference =
      new Date().getTime() - new Date(post.pubDate).getTime();
    const daysBack = Math.round(secondsDifference / (1000 * 60 * 60 * 24));
    const timeAgo =
      daysBack <= 365
        ? `${daysBack} days ago`
        : `${Math.round(daysBack / 365)} years ago`;
    return `Read: ${post.title}${
      post.author ? `\nFrom: ${post.author}` : ''
    }\nPublished: ${timeAgo}`;
  };
</script>

<div class="heading">
  <Heading>{$t('pages.blog')}</Heading>
</div>
<div class="post-filter-options">
  <div>
    {#if $searchTerm}
      <div class="results-info">
        <p>Showing {$filtered.length} results for '<i>{$searchTerm}</i>'</p>
        <button class="clear-search" on:click={cancelSearch}
          >✗ {$t('blog.search.clear')}</button
        >
      </div>
    {/if}
  </div>
  <div class="filter-controls">
    <SearchBar bind:searchInputRef />
    <DropDown />
  </div>
</div>

{#if $filtered.length === 0}
  <div class="no-results">
    <h4>{$t('blog.results.none')} :(</h4>
    <p>
      {$t('blog.results.none-1')}
      {$t('blog.results.none-2')}
    </p>
  </div>
{:else if $filtered.length === 0}
  <Loading />
{:else if fetchStatus === PostStatus.Errored}
  <p>{$t('blog.error')}</p>
{/if}

<ul>
  {#each $filtered as post}
    <AnimateOnScroll
      once={true}
      animation={'fade-in 1s cubic-bezier(0.4, 0.6, 0.5, 1.000) both'}
      style={post.thumbnail ? 'grid-row-start: span 2' : ''}
    >
      <li
        on:click={() => postClicked(post.title)}
        on:keydown={() => postClicked(post.title)}
        title={makeHoverText(post)}
      >
        {#if post.thumbnail}
          <div
            class="thumbnail"
            style={`background-image: url(${post.thumbnail})`}
          />
        {/if}
        <a href={makeHref(post.title)} rel="noreferrer">
          {post.title}
        </a>
        <time datetime={post.pubDate}>
          {formatDate(post.pubDate)}
        </time>
      </li>
    </AnimateOnScroll>
  {/each}
</ul>

<svelte:window on:keydown={handleKeydown} />

<style lang="scss">
  @import '$src/styles/color-palette.scss';
  @import '$src/styles/dimensions.scss';

  .heading {
    margin: 0 calc(5vw + 1rem);
  }

  ul {
    --dimmed-primary: #ffffff29;
  }
  ul {
    display: grid;
    grid-auto-flow: dense;
    grid-template-columns: repeat(
      auto-fit,
      minmax(var(--grid-item-width), 1fr)
    );
    gap: var(--grid-item-spacing);
    padding: var(--grid-item-spacing);
    margin: var(--grid-item-spacing) 5vw;
    max-width: var(--grid-max-width);
    list-style: none;
    li {
      display: flex;
      flex-direction: column;
      min-height: var(--grid-item-min-height);
      // max-height: var(--grid-item-max-height);
      max-width: 40rem;
      font-size: 1.2rem;
      line-height: 1.5;
      overflow: hidden;
      padding: 0.25rem 0.5rem;
      text-overflow: ellipsis;
      background: var(--card-background);
      font-family: RedHatText;
      border: var(--card-border);
      border-radius: var(--curve-factor);
      cursor: pointer;
      transition: all ease-in-out 0.25s, transform ease-in-out 0.3s;
      height: 100%;
      &:hover {
        box-shadow: 1px 1px 3px var(--accent), 6px 6px 6px #ff00990d,
          36px 36px 50px #ff009903;
        transform: scale(1.025);
        time {
          color: var(--foreground);
        }
        .thumbnail {
          background-size: 110%;
        }
      }
      a {
        color: var(--foreground);
        text-decoration: none;
        font-weight: 500;
        font-family: RedHatText;
      }
      time {
        font-size: 0.8rem;
        letter-spacing: 0.1rem;
        text-transform: uppercase;
        color: var(--dimmed-text);
        font-family: RedHatText;
        transition: color 0.75s ease-in-out;
      }
      .thumbnail {
        width: 100%;
        height: 120px;
        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;
        transition: all 0.35s ease-in-out;
        border-radius: var(--curve-factor);
      }
    }
  }

  .post-filter-options {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    max-width: var(--grid-max-width);
    margin: 0 5vw;
    padding: 0 var(--grid-item-spacing);
    .filter-controls {
      display: flex;
      gap: 1rem;
    }
  }

  .results-info {
    display: flex;
    align-items: center;
    flex-direction: row;
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
</style>
