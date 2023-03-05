<script lang="ts">
  export let content: string;
</script>

<main class="article-content">
  {@html content}
</main>

<style lang="scss">
  @import '$src/styles/color-palette.scss';

  .article-content {
    overflow-x: auto;

    :global(p),
    :global(a),
    :global(li),
    :global(div),
    :global(span) {
      font-size: 1.2rem;
    }

    :global(sup),
    :global(sub),
    :global(small) {
      font-size: 0.8rem;
    }

    :global(h1),
    :global(h2),
    :global(h3),
    :global(h4),
    :global(h5),
    :global(h6) {
      font-weight: 600;
      margin: 1rem 0;
    }

    :global(h2) {
      font-size: 1.8rem;
    }
    :global(h3) {
      font-size: 1.6rem;
    }
    :global(h4) {
      font-size: 1.4rem;
    }
    :global(h5) {
      font-size: 1.2rem;
    }
    :global(h6) {
      font-size: 1rem;
    }

    :global(a) {
      color: var(--accent);
      transition: all ease-in-out 0.15s;
      font-size: inherit;
      &:hover {
        color: var(--accent);
      }
    }

    :global(blockquote) {
      border-left: 3px solid var(--dimmed-text);
      margin: 1rem;
      padding-left: 1rem;
    }

    :global(img) {
      max-width: 80%;
      border-radius: 4px;
      margin: 0 auto;
      display: flex;
    }
    :global(hr) {
      border-width: 0 0 1px 0;
      border-style: dashed;
      border-color: var(--dimmed-text);
    }

    :global(p code),
    :global(li code) {
      background: var(--code-background);
      border-radius: 4px;
      font-family: FiraCode, monospace;
      padding: 0 0.25rem;
    }

    :global(div.highlight pre),
    :global(pre) {
      background: var(--code-background);
      border-radius: 4px;
      font-size: 1rem;
      padding: 0.25rem 0.5rem;
      font-family: FiraCode, monospace;
      overflow: auto;
    }
  }
</style>
