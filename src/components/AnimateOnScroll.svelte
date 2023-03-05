<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  export let animation = 'none';
  export let animation_out = 'none; opacity: 0';
  export let once = false;
  export let top = 0;
  export let bottom = 0;
  export let css_observer = '';
  export let css_animation = '';
  export let style = '';

  const dispatch = createEventDispatcher();
  $: dispatch('update', { observing: observing });

  let observing = true;

  const countainer = `__saos-${Math.random()}__`;

  function intersection_verify(box) {
    const rootMargin = `${-bottom}px 0px ${-top}px 0px`;

    const observer = new IntersectionObserver(
      (entries) => {
        observing = entries[0].isIntersecting;
        if (observing && once) {
          observer.unobserve(box);
        }
      },
      {
        rootMargin,
      }
    );

    observer.observe(box);
    return () => observer.unobserve(box);
  }

  /// Fallback in case the browser not have the IntersectionObserver
  function bounding_verify(box) {
    const c = box.getBoundingClientRect();
    observing = c.top + top < window.innerHeight && c.bottom - bottom > 0;

    if (observing && once) {
      window.removeEventListener('scroll', bounding_verify);
    }

    window.addEventListener('scroll', bounding_verify);
    return () => window.removeEventListener('scroll', bounding_verify);
  }

  onMount(() => {
    const box = document.getElementById(countainer);
    if (IntersectionObserver) {
      return intersection_verify(box);
    } else {
      return bounding_verify(box);
    }
  });
</script>

<div id={countainer} style={css_observer + style}>
  {#if observing}
    <div style="animation: {animation}; {css_animation}">
      <slot />
    </div>
  {:else}
    <div style="animation: {animation_out}; {css_animation}">
      <slot />
    </div>
  {/if}
</div>

<style>
  div {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
