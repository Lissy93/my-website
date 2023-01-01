<script lang="ts">
  import BackToTop from '$src/components/BackToTop.svelte';
</script>


<nav>
  <a href="/" data-sveltekit-prefetch>home</a>
  <a href="/blog" data-sveltekit-prefetch>blog</a>
</nav>

<slot />

<BackToTop />

<style lang="scss">
  // Import reused SCSS variables and global styles
  @import "$src/styles/color-palette.scss";
  @import "$src/styles/media-queries.scss";
  @import "$src/styles/typography.scss";


  :global(html) {
    scroll-behavior: smooth;
  }
  :global(body) {
    background: var(--background);
    color: var(--foreground);
    transition: all 0.25s ease-in-out;
    font-family: FiraCode;

    /* Fancy scrollbar */
    &::-webkit-scrollbar {
      width: var(--scroll-bar-width);
      height: var(--scroll-bar-width);
    }
    &::-webkit-scrollbar-track {
      border-radius: var(--curve-factor);
      background-color: var(--scroll-bar-background);
    }
    &::-webkit-scrollbar-thumb {
      background: var(--scroll-bar-color);
      border-radius: var(--curve-factor);
    }
  }

  :global(::selection) {
    background-color: var(--accent-1);
    color: var(--background);
  }
</style>