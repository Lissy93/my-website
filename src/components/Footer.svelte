<script lang="ts">
  import Icon from '$src/components/Icon.svelte';
  import { config } from '$src/store/BlogStore';
  const { footerInfo, source } = config;
  export let color: string;
</script>

<footer style={`--accent: ${color};`}>
  <p>
    © <a href={footerInfo.authorSite} target="_blank" rel="noreferrer">{footerInfo.author}</a>
    {new Date().getFullYear()} - Licensed under
    <a href={footerInfo.licenseLink} target="_blank" rel="noreferrer">{footerInfo.license}</a> -
    View on <a href={source} target="_blank" rel="noreferrer">
      GitHub <Icon name="github" color="var(--accent)" /></a>
  </p>
</footer>

<style lang="scss">
  footer {
    bottom: 0;
    padding: 0.5rem 1rem;
    width: calc(100vw - 2rem);
    background: var(--card-background);
    p {
      margin: 0;
      text-align: center;
      a {
        color: var(--accent);
        border-radius: 4px;
        padding: 0.1rem 0.25rem;
        text-decoration: none;
        display: inline-flex;
        flex-direction: revert;
        gap: 0.25rem;
        align-items: center;
        &:hover {
          background: var(--accent);
          color: var(--background);
          :global(svg) {
            fill: var(--background);
          }
        }
      }
    }
  }
</style>
