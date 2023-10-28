<script lang="ts">
import config from '$src/helpers/config';
import Heading from '$src/components/Heading.svelte';
import LinkButton from '$src/components/LinkButton.svelte';
import SocialLink from '$src/components/SocialLink.svelte';
import { socialNetworks } from '$src/helpers/constants';
import type { SupportedSocials, UserSocial } from '$src/types/Socials';

export let accent = 'var(--accent)';

export let returnedSocials: any;

// Append usernames, and (if available) metrics to available socials
let socials: UserSocial[] = socialNetworks.map((social) => {
  const network: typeof SupportedSocials[number] = social.name;
  const metrics =
  returnedSocials[social.name.toLowerCase().replace(/\W/g, '')] || [];
  return { ...social, user: config.contact.socials[network], metrics };
});

// Limit number of socials to display
let numSocialsToDisplay = config.contact.socialButtonLimit || 6;

// Show / hide more socials
const toggleSocialLimit = () => {
  const defLimit = config.contact.socialButtonLimit;
  numSocialsToDisplay =
    numSocialsToDisplay === defLimit ? socials.length : defLimit;
};
</script>
  
<section class="contact-section" style="--accent:{accent};">
  <Heading level="h2" color="var(--accent)">Contact</Heading>
  <div class="buttons">
    <LinkButton to="/contact" icon="more-arrow">Get in Touch</LinkButton>
    <LinkButton
      to="{config.contact.pgpKeyLink}"
      icon="pgp"
      priority="outline"
      textColor="var(--accent)"
      target="_blank"
    >View GPG Key</LinkButton>
  </div>
  <div class="social-buttons">
    {#each socials.slice(0, numSocialsToDisplay) as social} <SocialLink {...social} isSmall /> {/each}
  </div>
  <!-- Show more/ less button -->
  {#if socials.length > config.contact.socialButtonLimit}
  <button class="toggle-limit" on:click={toggleSocialLimit}>
    {numSocialsToDisplay > config.contact.socialButtonLimit
      ? 'Show Less'
      : 'Expand to Show More'}
  </button>
  {/if}
</section>
    
  <style lang="scss">
  @import '$src/styles/media-queries.scss';

  section {
    margin: 1rem auto;
    width: 100%;
    .buttons {
      display: flex;
      gap: 1rem;
    }
    @include tablet-down {
      width: 100vw;
      margin: 0;
    }
  }
  
  .contact-section {
    .social-buttons {
      display: grid;
      grid-auto-flow: dense;
      grid-template-columns: repeat(
        auto-fit,
        minmax(12.5rem, 1fr)
      );
      gap: 1rem;
      margin: 1rem auto;
    }
    button.toggle-limit {
      background: none;
      border: none;
      border-radius: var(--curve-factor);
      color: var(--foreground);
      font-family: FiraCode, monospace;
      width: fit-content;
      cursor: pointer;
      opacity: 0.5;
      transition: all ease-in-out 0.1s;
      &:hover {
        color: var(--accent);
      }
    }
  }
  </style>
