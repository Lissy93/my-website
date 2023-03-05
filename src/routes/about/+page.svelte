<script lang="ts">
  import Heading from '$src/components/Heading.svelte';
  import { t } from '$src/store/Language';

  import config from '$src/helpers/config';

  const { intro, bio, picture } = config.about;

  const morePages = config.routeLinks.filter(
    (link) => !['/about', '/'].includes(link.route)
  );
</script>

<div class="heading">
  <Heading level="h2" size="2.5rem">{$t('pages.about')}</Heading>
</div>

<div class="content">
  <section class="intro">
    <i>{intro}</i>
    {#each bio as bioLine}
      <p class="bio-line">{@html bioLine}</p>
    {/each}
  </section>

  <div class="sec-wrap">
    <section class="ugly-picture">
      <img src={picture} alt="Users profile" />
    </section>

    <section class="pages">
      {#each morePages as page}
        <a href={page.route} style={`--page-color: ${page.color}`}
          >{page.label}</a
        >
      {/each}
    </section>
  </div>
</div>

<style lang="scss">
  @import '$src/styles/media-queries.scss';

  .heading {
    margin: 1rem calc(5vw + 1rem) 0;
  }

  .content {
    display: flex;
    gap: 1rem;
    margin: 1rem auto;
    max-width: calc(90% - 1rem);
    @include tablet-down {
      flex-wrap: wrap;
      .ugly-picture img {
        max-width: 250px;
      }
    }
  }

  section {
    padding: 1rem;
    border-radius: var(--curve-factor);
    background: var(--card-background);
    &.intro {
      grid-column-start: span 3;
      grid-row-start: span 2;
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
    &.ugly-picture {
      max-width: 300px;
      height: 100%;
      text-align: center;
      img {
        width: 100%;
        margin: 0 auto;
        border-radius: var(--curve-factor);
      }
    }

    &.pages {
      opacity: 0.7;
      &:hover {
        opacity: 1;
      }
      a {
        color: var(--page-color, var(--accent));
        border-radius: var(--curve-factor);
        padding: 0.1rem 0.25rem;
        margin: 0.5rem;
        font-weight: bold;
        text-decoration: none;
        transition: all ease-in-out 0.2s;
        &:hover {
          color: var(--background);
          background: var(--page-color, var(--accent));
        }
      }
    }
  }

  .sec-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
  }
</style>
