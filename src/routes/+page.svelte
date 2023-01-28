<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { config } from '$src/store/BlogStore';
  import Loading from '$src/components/Loading.svelte';

  export const { routeLinks } = config;

  export let showLoader = false;

  const homePageLinks = routeLinks.filter(rl => rl.route !== '/');

  onMount(async () => {
    document.querySelector('#funky-background-script')?.remove();
    var script = document.createElement('script');
    script.src = '/wobble.js';
    script.id = 'funky-background-script';
    document.head.appendChild(script);
	});

  // onDestroy(async () => {
  //   document.querySelector('#funky-background-script')?.remove();
  // });

  const findRouteColor = (route: string) => {
    return routeLinks?.find((r) => r.route === route)?.color || 'var(--accent)';
  };
</script>

<canvas id="canvas"></canvas>

<div class="hero">
  <h1>Alicia Sykes</h1>
</div>

{#if showLoader}
  <Loading message="Pre-fetching Posts" />
{/if}

{#if !showLoader}
  <div class="tiles">
    {#each homePageLinks as navLink }
    <a
      class="tile"
      href={navLink.route}
      style={`--accent: ${findRouteColor(navLink.route)};`}
      on:click={() => { showLoader = true; }}
    >
      <h3>{navLink.label}</h3>
    </a>
    {/each}
  </div>
{/if}

<style lang="scss">

:global(html) {
  scroll-behavior: smooth;
}

canvas {
  position: absolute;
  width: 100vw;
  height: 100vh;
}

*:not(canvas){
  z-index: 1;
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
    border-left: 4px solid var(--accent);
    transition: all ease-in-out 0.25s, transform ease-in-out 0.3s;
    h3 {
      font-size: 2rem;
      transition: all .25s ease-in-out;
    }
    &:hover {
      border-left-width: 8px;
      transform: scale(1.02);
      h3 {
        color: var(--accent);
      }
    }
  }
}

</style>
