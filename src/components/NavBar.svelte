<script lang="ts">
  import { page } from '$app/stores';
  import { config } from '$src/store/BlogStore';
  import ThemeSwitcher from '$src/components/ThemeSwitcher.svelte';
  import LanguageSwitcher from '$src/components/LanguageSwitcher.svelte';

  export let color: string;
  export const { routeLinks } = config;

  const findRouteColor = (route: string) => {
    return routeLinks?.find((r) => r.route === route)?.color || color;
  };
</script>

<nav style={`--accent: ${color};`}>
  <a class="homepage-link" href="/">
    <h1>{config.title}</h1>
  </a>
  <div class="nav-links">
    {#each routeLinks as navLink}
      <a
        href={navLink.route}
        title={navLink.description || navLink.label}
        data-sveltekit-preload-data="hover"
        style={`--accent: ${findRouteColor(navLink.route)};`}
        class:active={$page.url.pathname === navLink.route}>{navLink.label}</a
      >
    {/each}
    <ThemeSwitcher />
    <LanguageSwitcher />
  </div>
</nav>

<style lang="scss">
  @import '$src/styles/media-queries.scss';
  nav {
    display: flex;
    justify-content: space-between;
    background: var(--card-background);
    border-bottom: var(--card-border);
    color: var(--foreground);
    padding: 0.5rem;
    a.homepage-link {
      text-decoration: none;
      text-align: center;
      h1 {
        margin: 0;
        color: var(--foreground);
      }
    }
    .nav-links {
      display: flex;
      flex-wrap: wrap;
      a {
        font-weight: 700;
        font-size: 1.2rem;
        color: var(--foreground);
        text-decoration: none;
        border-radius: 4px;
        padding: 0.25rem 0.5rem;
        margin: 0.25rem;
        text-align: center;
        &.active,
        &:hover {
          background: var(--accent);
          color: var(--background);
        }
      }
    }
    @include tablet-down {
      flex-direction: column;
    }
  }
</style>
