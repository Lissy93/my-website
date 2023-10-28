<script lang="ts">
  // Parameters
  export let level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1'; // The semantic heading level
  export let color: string | undefined = undefined; // An optional override color (defaults to accent)
  export let size: string | undefined = undefined; // An optional override size (default depends on level)
  export let font: string | undefined = undefined; // An optional override font (defaults to FiraCode)
  export let commandStyle = true; // Whether to show chevron before heading
  export let blinkCursor = false; // Whether to show blinking cursor after heading

  // Computed values, for reactivity
  $: computedColor = color ? `--heading-color: ${color};` : '';
  $: computedSize = size ? `--headingSize: ${size};` : '';
  $: computedFont = font ? `--headingFont: ${font};` : '';
  $: computedStyles = `${computedColor} ${computedSize} ${computedFont}`;
  $: computedClasses =
    (blinkCursor ? 'blink-cursor ' : '') +
    (commandStyle ? 'command-style ' : '');
</script>

<svelte:element this={level} class={computedClasses} style={computedStyles}>
  <slot />
</svelte:element>

<style lang="scss">
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    cursor: default;
    transition: all 0.25s ease-in-out;
    font-family: var(--headingFont, FiraCode);
    color: var(--heading-color, var(--accent));
    z-index: 1;
    &.command-style:before {
      content: '>';
      margin-right: 6px;
      opacity: 0.75;
    }
    &.blink-cursor:after {
      content: '';
      width: calc(var(--headingSize, 2rem) / 3);
      height: 0.25rem;
      margin-left: 0.1rem;
      display: inline-block;
      background: var(--heading-color, var(--accent));
      animation: cursor-blink 1.25s steps(2) infinite;
    }
  }

  h1,
  h2,
  h3 {
    margin: 1rem 0;
  }
  h4,
  h5,
  h6 {
    margin: 0.5rem 0;
  }

  h1 {
    font-size: var(--headingSize, 2.8rem);
  }
  h2 {
    font-size: var(--headingSize, 2rem);
  }
  h3 {
    font-size: var(--headingSize, 1.75rem);
  }
  h4 {
    font-size: var(--headingSize, 1.5rem);
  }
  h5 {
    font-size: var(--headingSize, 1.25rem);
  }
  h6 {
    font-size: var(--headingSize, 1rem);
  }

  @keyframes cursor-blink {
    0% {
      opacity: 0;
    }
  }
</style>
