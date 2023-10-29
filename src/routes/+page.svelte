<script lang="ts">
  
  import { onMount } from 'svelte';
  import { config } from '$src/store/BlogStore';
  import Loading from '$src/components/Loading.svelte';
  import Heading from '$src/components/Heading.svelte';
  import { socialNetworks } from '$src/helpers/constants';
  import Icon from '$src/components/Icon.svelte';
  import D3Voronoi from '$src/helpers/voronoi';
  import IndexComponent from '$src/routes/index/IndexComponent.svelte';

  export let data: any;

  const { routeLinks } = config;
  const homePageLinks = routeLinks.filter((rl) => rl.route !== '/');

  let showLoader = false;

  onMount(() => {
    try { new D3Voronoi(); }
    catch (e) { console.warn('D3Voronoi failed to load', e); }
  });

  const userSocials = Object.keys(config.contact.socials);
  const limit = config.contact.socialButtonLimit;

  const socialLinks = userSocials.slice(0, limit).map((social) => {
    const socialProps = socialNetworks.find((sn) => sn.name === social);
    if (!socialProps) return null;
    const user = config.contact.socials[social];
    return {
      ...socialProps,
      user,
      href: socialProps.link + user,
      title: `${socialProps.noAt ? '' : '@'}${user} on ${socialProps.name}`,
    };
  });

  const findRouteColor = (route: string) => {
    return routeLinks?.find((r) => r.route === route)?.color || 'var(--accent)';
  };
</script>

<main class="homepage">
  <div id="vonoroi"></div>
  <div class="hero">
    <Heading
      level="h1"
      commandStyle={false}
      blinkCursor={true}
      size="4rem"
      color="var(--home-accent-background)">Alicia Sykes</Heading
    >
    <div class="socials">
      {#each socialLinks as social}
        {#if social}
          <a
            href={social.href}
            class="social-link"
            title={social.title}
            target="_blank"
            rel="noreferrer"
          >
            <Icon
              name={social.icon}
              color="var(--home-accent-background)"
              width="1.8rem"
              height="1.8rem"
              hoverColor={social.tone}
            />
          </a>
        {/if}
      {/each}
    </div>
  </div>

  {#if showLoader}
    <Loading message="Pre-fetching Posts" />
  {/if}

  {#if !showLoader}
    <div class="tiles">
      {#each homePageLinks as navLink}
        <a
          class="tile"
          href={navLink.route}
          style={`--accent: ${findRouteColor(navLink.route)};`}
          on:click={() => {
            showLoader = true;
          }}
        >
          <Heading level="h3" size="2rem" color="var(--home-accent-foreground)"
            >{navLink.label}</Heading
          >
          <p class="subtitle">{navLink.description}</p>
        </a>
      {/each}
    </div>
  {/if}
</main>

<IndexComponent data={data} />

<style lang="scss">
  @import '$src/styles/media-queries.scss';
  @import '$src/styles/voronoi.scss';

  :global(html) {
    scroll-behavior: smooth;
  }

  *:not(canvas) {
    z-index: 1;
  }

  main.homepage {
    min-height: 99vh;
    position: relative;
  }

  .hero {
    text-align: center;
    pointer-events: none;
    // background: var(--card-background);
    // border-bottom: var(--card-border);
    min-height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .socials {
      opacity: 0.85;
      pointer-events: all;
      .social-link {
        text-decoration: none;
        color: var(--home-accent-background);
      }
      &:hover {
        opacity: 1;
      }
    }
  }

  .tiles {
    display: grid;
    grid-auto-flow: dense;
    max-width: 70rem;
    margin: auto;
    padding: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 1rem;
    width: 80vw;
    @include tablet-down {
      display: flex;
      flex-direction: column;
    }
    a.tile {
      color: var(--foreground);
      border: var(--card-border);
      background: var(--home-tile-background); // var(--card-background);
      border-radius: 4px;
      text-decoration: none;
      padding: 1rem;
      border-left: 4px solid var(--accent);
      transition: all ease-in-out 0.25s, transform ease-in-out 0.3s;
      overflow: hidden;
      pointer-events: all;

      p.subtitle {
        position: absolute;
        color: var(--dimmed-text);
        margin: 0;
        transform: translateX(-20rem) translateY(2rem) scale(0.5) rotate(5deg);
        transition: all ease-in-out 0.2s;
        opacity: 0;
      }

      &:hover {
        :global(h3) {
          color: var(--accent);
          transform: translateY(-1rem);
        }
        border-left-width: 8px;
        transform: scale(1.02);
        p.subtitle {
          transform: translateX(0) translateY(-1.5rem) scale(1) rotate(0);
          opacity: 1;
        }
      }
    }
  }
</style>
