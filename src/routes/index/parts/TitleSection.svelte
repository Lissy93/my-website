<script lang="ts">
  import config from '$src/helpers/config';
  import Heading from '$src/components/Heading.svelte';
</script>

<a href={config.contact.website} class="title-link" title="Go to {config.contact.website}">
  <Heading level="h1"
    color="var(--foreground)" size="4rem"
    commandStyle={false} blinkCursor={true}>
    {config.title}
  </Heading>
</a>

<style lang="scss">
  .title-link {
    text-decoration: none;
    margin: 0.5rem auto 0 auto;
    :global(h1) {
      cursor: pointer;
    }
  }
</style>