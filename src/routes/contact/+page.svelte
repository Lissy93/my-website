<script lang="ts">
import SocialLink from '$src/components/SocialLink.svelte';
import type { SupportedSocials, UserSocial, Usernames } from '$src/types/Socials';
import { socialNetworks } from '$src/helpers/constants';
import config from '$src/helpers/config';

// Static config for contact page
const { contact } = config;

// Dynamically fetched data (social metrics)
export let data;

// Append usernames to available socials
let socials: UserSocial[] = socialNetworks.map((social, index) => {
  const network: typeof SupportedSocials[number] = social.name;
  return { ...social, user: contact.socials[network] };
});

// Append metrics to socials
const metrics = data.props;
socials.map((social) => {
  if (social.name === 'Twitter' && metrics.twitter) social.metrics = metrics.twitter;
  if (social.name === 'Reddit' && metrics.reddit) social.metrics = metrics.reddit;
  if (social.name === 'GitHub' && metrics.github) social.metrics = metrics.github;
  if (social.name === 'StackOverflow' && metrics.stackoverflow) social.metrics = metrics.stackoverflow;
  if (social.name === 'Dev.to' && metrics.devto) social.metrics = metrics.devto;
  if (social.name === 'CodersRank' && metrics.codersrank) social.metrics = metrics.codersrank;
  if (social.name === 'Mastodon' && metrics.mastodon) social.metrics = metrics.mastodon;
  if (social.name === 'KeyBase' && metrics.keybase) social.metrics = metrics.keybase;
  if (social.name === 'Instagram' && metrics.instagram) social.metrics = metrics.instagram;
});

// Limit number of socials to display
let numSocialsToDisplay = contact.socialButtonLimit || 6;

// Show / hide more socials
const toggleSocialLimit = () => {
  const defLimit = contact.socialButtonLimit;
  numSocialsToDisplay = numSocialsToDisplay === defLimit ? socials.length : defLimit;
};

</script>

<section class="main">
  <div class="social-wrapper">
    <h2>Connect</h2>
    <!-- Links to social media profiles -->
    <div class="social-buttons">
    {#each socials.slice(0, numSocialsToDisplay) as social}
      <SocialLink {...social} />
    {/each}
    </div>
    <!-- Show more/ less button -->
    {#if socials.length > contact.socialButtonLimit}
      <button class="toggle-limit" on:click={toggleSocialLimit}>
        {numSocialsToDisplay > contact.socialButtonLimit ? 'Show Less' : 'Show More'}
      </button>
    {/if}

  </div>
  <form class="contact-form">
    <h2>Message</h2>
    <div class="user-deets">
      <div class="input-group">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" />
      </div>
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" />
      </div>
    </div>
    <label for="message">Message</label>
    <textarea name="message" id="message" rows="5"></textarea>
    <button type="submit">Send</button>
  </form>
</section>

<style lang="scss">
  h1 {
      font-size: 4rem;
      color: var(--accent);
      font-family: RedHatText;
      margin: 0.25rem 5vw;
      color: var(--accent);
    }
  section.main {
    width: 90vw;
    margin: 2rem auto 1rem auto;
    text-align: left;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    h2 {
      font-size: 2rem;
      margin: 1rem 0;
      color: var(--accent);
    }
    .social-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      min-width: 500px;
    }
    form {
      display: flex;
      flex: 1;
      flex-direction: column;
      min-width: 500px;
      .user-deets {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 1rem;
        .input-group {
          flex: 1;
          width: 200px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          input {
            width: 100%;
          }
        }
      }
      input, textarea, button {
        background: var(--card-background);
        border: var(--card-border);
        color: var(--foreground);
        border-radius: 4px;
        font-size: 1.25rem;
        padding: 0.25rem 0.5rem;
        margin: 0.5rem 0;
        font-family: FiraCode, monospace;
        transition: all ease-in-out 0.25s;
        &:focus {
          outline: none;
          box-shadow: 1px 1px 8px #ff00994a;
        }
      }
      textarea {
        resize: vertical;
        min-height: 5rem;
        max-height: 15rem;
      }
      label {
        margin-right: 0.5rem;
      }
      button {
        cursor: pointer;
        &:hover {
          background: var(--accent);
          color: var(--card-background);
        }
      }
    }
    .social-buttons {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      transition: all ease-in-out 0.25s;
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
