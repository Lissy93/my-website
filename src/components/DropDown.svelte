<script lang="ts">
  import { get } from 'svelte/store';
  import { slide } from 'svelte/transition';
  import { rssFeedUrls, extraFeeds } from '$src/store/BlogStore';
  import type { RssUrlItem } from '$src/types/RssXml';

  // Controls if dropdown open / closed
  export let visible = false;

  // Opens or closes the dropdown
  const toggle = () => visible = !visible;

  /**
   * A directive for handling any click outside that of the element
   * Used for closing the dropdown, when the user clicks away
   */
  const clickOutside = (node: HTMLElement) => {
    const handleClick = (event: any) => {
      if (node && !node.contains(event.target) && !event.defaultPrevented) {
        node.dispatchEvent(new CustomEvent('click_outside'));
      }
    }
    document.addEventListener('click', handleClick, true);
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    }
  }

  /**
   * For a given feed object, either remove or add it to the store
   * depending if already selected, to update the RSS posts list
   */
  const toggleFeed = (feed: RssUrlItem): void => {
    const isFound = get(rssFeedUrls).find((cFeed) => cFeed.url === feed.url);
    if (isFound) { // Remove specified feed from store
      rssFeedUrls.set(get(rssFeedUrls).filter((cFeed) => cFeed.url !== feed.url ));
    } else { // Append specified feed to store
      rssFeedUrls.set([...get(rssFeedUrls), feed]);
    }
  };

  const clearAll = () => {
    rssFeedUrls.set([]);
  };

  const selectAll = () => {
    rssFeedUrls.set(extraFeeds);
  };

</script>

<div class="dropdown-outer" use:clickOutside on:click_outside={() => { visible = false }}>
  <div class="chevron" on:click={toggle} on:keyup={toggle}>
    Feeds { visible ? '▲' : '▼'}
  </div>
  {#if visible}
    <div class="dropdown-inner">
      <ul>
      {#each extraFeeds as feed (feed.url)}
        <li
          transition:slide
          title={feed.url}
          on:click={() => toggleFeed(feed)}
          on:keyup={() => toggleFeed(feed)}
        >
          <div class="checkbox">
            {#if $rssFeedUrls.find((f) => f.url === feed.url)}
            ✔
            {/if}
          </div>
          {feed.label}
        </li>
      {/each}
      </ul>
      <div class="quick-all">
        <ul>
          <li on:click={clearAll} on:keydown={clearAll}>Clear Checked</li>
          <li on:click={selectAll} on:keydown={selectAll}>Select All</li>
        </ul>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  @import "$src/styles/color-palette.scss";

  .dropdown-outer {
    display: flex;
    position: relative;
    .dropdown-inner {
      position: absolute;
      top: 2rem;
      right: 0;
      padding: 0.5rem;
      background: var(--card-background);
      border: var(--card-border);
      border-radius: 0 4px 4px;
      box-shadow: 8px 2px 2px #000;
      min-width: 12rem;
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
          padding: 0.1rem 0.25rem;
          margin: 0.25rem 0;
          cursor: pointer;
          border-radius: 4px;
          display: flex;
          gap: 0.25rem;
          &:hover {
            background: var(--accent);
            color: var(--background);
            font-weight: bold;
          }
          .checkbox {
            width: 1rem;
            height: 1rem;
            border-radius: 4px;
            margin-right: 0.25rem;
            padding: -0.25rem 0 0.25rem 0;
            border: var(--card-border);
            color: var(--dimmed-text);
            background: var(--background);
            opacity: 0.5;
          }
        }
      }
      .quick-all ul {
        display: flex;
        font-size: 0.75rem;
        opacity: 0.7;
        align-items: center;
        justify-content: space-between;
        &:hover { opacity: 1 }
      }
    }
    .chevron {
      cursor: pointer;
      height: 1.5rem;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      background: var(--card-background);
      border: var(--card-border);
      transition: all ease-in-out 0.25s;
      &:hover {
        color: var(--accent);
      }
    }
  }

</style>