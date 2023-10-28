<script lang="ts">
import config from '$src/helpers/config';
import Heading from '$src/components/Heading.svelte';
import LinkButton from '$src/components/LinkButton.svelte';

export let accent = 'var(--accent)';
</script>

<section class="about-section" style="--accent:{accent};">
  <Heading level="h2" color="var(--accent)">About</Heading>
  <div class="buttons">
    <LinkButton to="/about" icon="more-arrow">Keep Reading</LinkButton>
    <LinkButton
      to="https://linkedin.com/in/aliciasykes"
      icon="linkedin"
      priority="outline"
      textColor="var(--accent)"
      target="_blank"
    >View LinkedIn</LinkButton>
  </div>
  <br>
  <i>{config.about.intro}</i>
  <img width="150" src={config.about.picture} alt="Users profile" class="profile-pic" />
  {#each config.about.bio as bioLine}
    <p class="bio">{@html bioLine}</p>
  {/each}
</section>

<style lang="scss">
@import '$src/styles/media-queries.scss';
.about-section {
  @include tablet-down {
    width: 100vw;
    margin: 0;
  }
  .buttons {
    display: flex;
    gap: 1rem;
  }
  img.profile-pic {
    margin: 0.5rem;
    float: right;
    border-radius: var(--curve-factor);
    border: var(--card-border);
  }
  i {
    color: var(--dimmed-text);
  }
  p.bio {
    :global(p) {
      margin: 1rem 0;
      font-size: 1.25rem;
      line-height: 1.8rem;
      font-family: RedHatText;
    }
    :global(a) {
      color: var(--accent);
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
