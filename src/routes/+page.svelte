<script>
  import { get } from 'svelte/store';
  import { blogStore } from '$src/store/BlogStore';
  import Loading from '$src/components/Loading.svelte';

  export const tiles = [
    { title: 'Blog', link: '/blog' },
  ];

  export let showLoader = false;

  export const checkIfLoadNeeded = () => {
    if (get(blogStore).length === 0) {
      showLoader = true;
    }
  };

</script>

<div class="hero">
  <h1>Alicia Sykes</h1>
</div>

{#if showLoader}
  <Loading message="Pre-fetching Posts" />
{/if}

{#if !showLoader}
  <div class="tiles">
    <a class="tile" href="/blog" on:click={checkIfLoadNeeded}>
      <h3>Blog</h3>
    </a>
    <a class="tile" href="/projects">
      <h3>Projects</h3>
    </a>
    <a class="tile" href="/about">
      <h3>About</h3>
    </a>
    <a class="tile" href="/contact">
      <h3>Contact</h3>
    </a>
  </div>
{/if}

<style lang="scss">

:global(html) {
  scroll-behavior: smooth;
}

.hero {
  text-align: center;
  h1 {
    font-size: 4rem;
    cursor: default;
  }
}

.tiles {
  display: grid;
  max-width: 70rem;
  margin: auto;
  padding: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 1rem;
  a.tile {
    color: var(--foreground);
    border: var(--card-border);
    background: var(--card-background);
    border-radius: 4px;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-left: 4px solid var(--accent-2);
    transition: all ease-in-out 0.25s, transform ease-in-out 0.3s;
    h3 {
      font-size: 2rem;
      transition: all .25s ease-in-out;
    }
    &:hover {
      border-left-width: 8px;
      transform: scale(1.02);
      h3 {
        color: var(--accent-2);
      }
    }
  }
}

</style>
