<script lang="ts">
  import { page } from '$app/stores';
  export let color: string;

  export const navLinks = [
    { title: 'Home', destination: '/' },
    { title: 'Blog', destination: '/blog' },
    { title: 'Projects', destination: '/projects' },
    { title: 'About', destination: '/about' },
    { title: 'Contact', destination: '/contact' },
  ];
</script>

<nav style={`--accent: ${color};`}>
  <a class="homepage-link" href="/">
    <h1>Website {color}</h1>
  </a>
  <div class="nav-links">
    {#each navLinks as navLink }
    <a
      href={navLink.destination}
      data-sveltekit-preload-data="hover"
      class:active={$page.url.pathname === navLink.destination}>{navLink.title}</a>
    {/each}
  </div>
</nav>

<style lang="scss">
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
    .nav-links a {
      font-weight: 700;
      font-size: 1.2rem;
      color: var(--foreground);
      text-decoration: none;
      border-radius: 4px;
      padding: 0.25rem 0.5rem;
      margin: 0.25rem;
      text-align: center;
      &.active, &:hover {
        background: var(--accent);
        color: var(--background);
      }
    }
  }
</style>