<script lang="ts">
  import Heading from '$src/components/Heading.svelte';
  import TechStack from '$src/components/TechStack.svelte';
  import WorkExperience from '$src/components/WorkExperience.svelte';
  import { t } from '$src/store/Language';

  import config from '$src/helpers/config';

  const { intro, bio, picture } = config.about;

  const morePages = config.routeLinks.filter(
    (link) => !['/about', '/'].includes(link.route)
  );
</script>

<!-- Page title -->
<div class="heading">
  <Heading level="h2" size="2.5rem">{$t('pages.about')}</Heading>
</div>

<!-- Bio paragraphs -->
<div class="content">
  <section class="intro">
    <i>{intro}</i>
    {#each bio as bioLine}
      <p class="bio-line">{@html bioLine}</p>
    {/each}
  </section>

  <!-- Profile picture (and links to other pages) -->
  <section class="ugly-picture">
    <img src={picture} alt="Users profile" />
    <div class="pages">
      {#each morePages as page}
        <a href={page.route} style={`--page-color: ${page.color};`}>{page.label}</a>
      {/each}
    </div>
  </section>

  <!-- Work Experience -->
  <section class="experience">
    <WorkExperience />
  </section>

  <!-- Technology Stack -->
  <section class="stack">
    <TechStack/>
  </section>

  <!-- Social links -->
  <section class="soclials"></section>
</div>

<style lang="scss">
  @import '$src/styles/media-queries.scss';

  .heading {
    margin: 1rem calc(5vw + 1rem) 0;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
  }

  .content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
    max-width: 1200px;
    @include laptop-up {
      // There's probably a better way to scale this grid, bit idk how
      grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
    }
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    padding: 1rem;
    width: 95vw;
    margin: 0 auto;
  }

  section {
    padding: 1rem;
    border-radius: var(--curve-factor);
    background: var(--card-background);
    // Intro / bio Section
    &.intro {
      grid-column-start: span 2;
      i {
        opacity: 0.8;
      }
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
    // Profile pic + link list section
    &.ugly-picture {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      img {
        width: 100%;
        max-width: 300px;
        margin: 0 auto;
        border-radius: var(--curve-factor);
      }
      .pages {
        opacity: 0.9;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        &:hover {
          opacity: 1;
        }
        a {
          color: var(--page-color, var(--accent));
          border-radius: var(--curve-factor);
          padding: 0.25rem 0.5rem;
          margin: 0.5rem;
          font-weight: bold;
          text-decoration: none;
          transition: all ease-in-out 0.2s;
          min-width: 5rem;
          text-align: center;
          border: 1px solid var(--page-color, var(--accent));
          &:hover {
            color: var(--background);
            background: var(--page-color, var(--accent));
          }
        }
      }
    }
    // Work experience section
    &.experience {
      grid-column-start: span 2;
    }
    // Tech stack section
    &.stack {
      grid-row-start: span 3;
    }

    // Social links section
    &.soclials {
      grid-column-start: span 2;
    }
  }

</style>
