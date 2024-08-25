<script lang="ts">
  import { onMount } from 'svelte';
  import { config } from '$src/store/BlogStore';
  import Loading from '$src/components/Loading.svelte';
  import Heading from '$src/components/Heading.svelte';
  import AnimatedHero from '$src/components/AnimatedHero.svelte';
  import { socialNetworks } from '$src/helpers/constants';
  import Icon from '$src/components/Icon.svelte';

  export let data: any;

  const { routeLinks } = config;
  const homePageLinks = routeLinks.filter((rl) => rl.route !== '/');

  let showLoader = false;

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

  onMount(() => {
    const buttons = document.querySelectorAll<HTMLAnchorElement>('.tile');
    buttons.forEach((button) => {
      button.addEventListener('mousemove', (e: MouseEvent) => {
        const { x, y } = button.getBoundingClientRect();
        button.style.setProperty('--x', `${e.clientX - x}`);
        button.style.setProperty('--y', `${e.clientY - y}`);
      });
    });

    const body = document.querySelector('body');
    if (body) {
      let mouseX = 0;
      let mouseY = 0;
      let currentX = 0;
      let currentY = 0;
      const easing = 0.025;

      const updatePosition = () => {
        // Apply easing to create the delay effect
        currentX += (mouseX - currentX) * easing;
        currentY += (mouseY - currentY) * easing;

        // Update CSS variables for positioning
        body.style.setProperty('--x', `${currentX}`);
        body.style.setProperty('--y', `${currentY}`);

        // Continue the animation loop
        requestAnimationFrame(updatePosition);
      };

      // Track mouse movement
      body.addEventListener('mousemove', (e: MouseEvent) => {
        const { x, y } = body.getBoundingClientRect();
        mouseX = e.clientX - x;
        mouseY = e.clientY - y;
      });

      // Start the body animation loop
      requestAnimationFrame(updatePosition);
    }
  });

</script>
<main class="homepage">
  <!-- <Heading
    level="h1"
    commandStyle={false}
    blinkCursor={true}
    size="4rem"
    color="var(--home-accent-background)">Alicia Sykes</Heading
  > -->
  
  <h1>Alicia Sykes</h1>
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
  <AnimatedHero />

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
        <Heading level="h3" size="1.4rem" color="var(--home-accent-foreground)" weight={600}
          >{navLink.label}</Heading
        >
        <p class="subtitle">{navLink.description}</p>
      </a>
    {/each}
  </div>

</main>


<style lang="scss">
  @import '$src/styles/media-queries.scss';
  @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');


  :global(html) {
    scroll-behavior: smooth;
  }

  h1 {
    font-size: 5rem;
    font-family: 'Permanent Marker', 'Poppins', 'Baloo Paaji', cursive;
    text-align: center;
    margin: 0 auto;
  }

  //if light theme
  :global(html[data-theme='light']) {
    h1 {
      color: #ff4bb9;
      text-shadow: 3px 3px 0px #35e1f385;
    }
  }

  main.homepage {
    position: relative;
    z-index: 2;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    // min-height: 100vh;
    gap: 2rem;
  }

  :global(body) {
    &::after {
      content: "";
      position: fixed;
      top: calc(var(--y, 0) * 1px - 400px);
      left: calc(var(--x, 0) * 1px - 400px);
      width: 800px;
      height: 800px;
      background: radial-gradient(var(--home-animated-gradient-inner), var(--home-animated-gradient-outer) 50%);
      opacity: 0;
      transition: opacity 0.2s;
      pointer-events: none;
      overflow: hidden;
    }
    &:hover::after {
      opacity: 0.4;
    }
  }


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


  .tiles {
    // display: grid;
    // grid-auto-flow: dense;
    // max-width: 70rem;
    // margin: auto;
    // padding: 1rem;
    // grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    max-width: 32rem;
    gap: 1rem;
    width: 80vw;
    display: flex;
    flex-direction: column;
    @include tablet-down {
      display: flex;
      flex-direction: column;
    }
    a.tile {
      color: var(--foreground);
      border: 1px solid transparent;
      // background: var(--home-tile-background);
      border-radius: 4px;
      text-decoration: none;
      padding: 0.5rem 1rem;
      // border-left: 4px solid var(--accent);
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
        // border-left-width: 8px;
        border: var(--card-border);
        // border-right: var(--card-border);
        // border-top: var(--card-border);
        // border-bottom: var(--card-border);
        transform: scale(1.02);
        p.subtitle {
          transform: translateX(0) translateY(-1.5rem) scale(1) rotate(0);
          opacity: 1;
        }
      }

      position: relative;
      overflow: hidden;

      &::after {
        content: "";
        position: absolute;
        top: calc(var(--y, 0) * 1px - 50px);
        left: calc(var(--x, 0) * 1px - 50px);
        width: 100px;
        height: 100px;
        background: radial-gradient(var(--home-animated-gradient-inner), var(--home-animated-gradient-outer) 50%);
        opacity: 0;
        transition: opacity 0.2s;
      }

      &:hover::after {
        opacity: 0.6;
      }
    }
  }
</style>
