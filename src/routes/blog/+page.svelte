<script lang="ts">
  import { goto } from '$app/navigation';
  import { blogStore, filtered, searchTerm } from '$src/store/BlogStore';
  import { slugify, formatDate } from '$src/helpers/post-utils';
  import type { RssPost, RssPosts } from '$src/types/RssXml';
  import SearchBar from '$src/components/SearchBar.svelte';

  const makeHref = (postTitle: string) => {
    return `/blog/${slugify(postTitle)}`;
  };
  const postClicked = (postTitle: string) => {
    goto(makeHref(postTitle), {});
    return null;
  };
  const cancelSearch = () => {
    searchTerm.set('');
  };
</script>

<h1>Blog</h1>

<div class="post-filter-options">
  <div>
    {#if $searchTerm }
      <div class="results-info">
        <p>Showing {$filtered.length} results for '<i>{$searchTerm}</i>'</p>
        <button class="clear-search" on:click={cancelSearch}>✗ Clear</button>
      </div>
    {/if}
  </div>
  <SearchBar />
</div>

{#if $searchTerm && $filtered.length === 0}
  <p>No Results for your search term</p>
{:else if $filtered.length === 0}
  <p>No posts written yet</p>
{/if}

<ul>
  {#each $filtered as post}
    <li on:click={postClicked(post.title)} on:keydown={postClicked(post.title)}>
      <a href={makeHref(post.title)} rel="noreferrer">
        {post.title}
      </a>
      <time datetime={post.pubDate}>{formatDate(post.pubDate)}</time>
    </li>
  {/each}
</ul>

<style lang="scss">
  @import "$src/styles/color-palette.scss";
  ul { // Configuration for the blog post grid dimensions
    --grid-item-width: 18rem;
    --grid-item-min-height: 3.5rem;
    --grid-item-max-height: 5rem;
    --grid-item-spacing: 1rem;
    --grid-max-width: 100rem;

    --dimmed-primary: #ffffff29;
    --curve-factor: 3px;
  }
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--grid-item-width), 1fr));
    gap: var(--grid-item-spacing);
    padding: var(--grid-item-spacing);
    margin: var(--grid-item-spacing) 5vw;
    max-width: var(--grid-max-width);
    list-style: none;
    li {
      display: flex;
      flex-direction: column;
      min-height: var(--grid-item-min-height);
      max-height: var(--grid-item-max-height);
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
      &:hover {
        box-shadow: 1px 1px 3px #f093, 6px 6px 6px #ff00990d, 36px 36px 50px #ff009903;
        transform: scale(1.05);
        // border: var(--card-border);
        time {
          color: var(--foreground);
          // color: var(--accent-1);
          // opacity: 0.6;
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
    }
  }

  .post-filter-options {
    display: flex;
    justify-content: space-between;
  }

  .results-info {
    margin-left: calc(5vw + 1rem);
    display: flex;
    flex-direction: row;
    p {
      margin: 0;
    }
    button {
      background: var(--accent-1);
      border: none;
      outline: none;
      color: var(--foreground);
      border-radius: 4px;
      margin: 0 0.5rem;
      cursor: pointer;
    }
  }


</style>