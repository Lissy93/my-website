<script lang="ts">
  import BackToTop from '$src/components/BackToTop.svelte';
  import NavBar from '$src/components/NavBar.svelte';
  import Footer from '$src/components/Footer.svelte';
  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';
  import { config } from '$src/store/BlogStore';

  const routeBasedAccent = (pathname?: string) => {
    const path = pathname || $page.url.pathname;
    return config.routeLinks?.find((rc) => rc.route === path)?.color || '#ff0099';
  };

  const makeTitle = (pathname: string) => {
    const route = config.routeLinks.find((rl) => rl.route === pathname);
    return route ? `${route.label} | ${config.title}` : config.title;
  };
</script>

<svelte:head>
    <title>{makeTitle($page.url.pathname)}</title> 
</svelte:head>

{#if $page.url.pathname !== '/'}
  <NavBar color={routeBasedAccent($page.url.pathname)} />
{/if}

{#key $page.url.pathname}
<main style={`--accent: ${routeBasedAccent()}`}>
  <div class="website" in:fade>
    <slot />
  </div>  
</main>
{/key}

<BackToTop color={routeBasedAccent($page.url.pathname)} />

{#if $page.url.pathname !== '/'}
  <Footer color={routeBasedAccent($page.url.pathname)} />
{/if}


<style lang="scss">
  
  // Import reused SCSS variables and global styles
  @import "$src/styles/color-palette.scss";
  @import "$src/styles/media-queries.scss";
  @import "$src/styles/typography.scss";
  @import "$src/styles/dimensions.scss";

  main {
    min-height: 100%;
    min-height: 91vh;
  }

  .website {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  :global(html) {
    scroll-behavior: smooth;
  }
  :global(body) {
    background: var(--background);
    color: var(--foreground);
    transition: all 0.25s ease-in-out;
    font-family: FiraCode;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;

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
    background-color: var(--accent);
    color: var(--background);
  }
</style>