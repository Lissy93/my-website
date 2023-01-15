<script lang="ts">
  import { config } from '$src/store/BlogStore';
  const { footerInfo, source } = config;
  export let color: string;
</script>

<footer style={`--accent: ${color};`}>
  <p>
  © <a href={footerInfo.authorSite}>{footerInfo.author}</a> {new Date().getFullYear()}
  Licensed under <a href={footerInfo.licenseLink}>{footerInfo.license}</a> -
  View on <a href={source}>GitHub</a>
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
        &:hover {
          background: var(--accent);
          color: var(--background);
        }
      }
    }
  }
</style>