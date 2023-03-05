<script lang="ts">
  import { onDestroy } from 'svelte';
  import LinkButton from '$src/components/LinkButton.svelte';

  export let title: string = ''; // An optional custom title to show
  export let message: string = ''; // An optional custom loading message to show
  export let onlyShowLoading = false; // If set to true, won't show warning if taking too long
  export let hideHomeButton = false; // If set to true, won't show home button if something goes wrong

  const times = [
    'just-now',
    'short-while',
    'bloody-ages',
    'probably-broken',
  ] as const;
  type TimeSpan = typeof times[number];

  let waitingFor: TimeSpan = 'just-now'; // Records how long the user has been waiting

  // Ever second or so, increment how long user has been waiting, to update the UI
  const startWaiting = setInterval(() => {
    const currentIndex = times.indexOf(waitingFor);
    if (currentIndex >= times.length - 1) {
      waitingFor = 'probably-broken';
    } else {
      waitingFor = times[currentIndex + 1];
    }
  }, 2000);

  // Clear interval when component finished with
  onDestroy(() => {
    clearInterval(startWaiting);
  });
</script>

<div class="gotta-be-patient">
  <h1>{title || 'Loading'}</h1>
  {#if waitingFor === 'just-now' || onlyShowLoading}
    <h2>{message || "This shouldn't take a sec..."}</h2>
  {:else if waitingFor === 'short-while'}
    <h2>Almost finished</h2>
  {:else if waitingFor === 'bloody-ages'}
    <h2 class="warning">Taking longer than expected</h2>
  {:else if waitingFor === 'probably-broken'}
    <h2 class="error">Looks like somethings gone wrong :(</h2>
  {/if}

  {#if waitingFor !== 'probably-broken'}
    <span class="loader" />
  {:else if !hideHomeButton}
    <LinkButton to="/">Go back Home</LinkButton>
  {/if}
</div>

<style lang="scss">
  @import '$src/styles/color-palette.scss';

  .gotta-be-patient {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background: var(--card-background);
    border: var(--card-border);
    border-radius: 4px;
    width: fit-content;
    min-width: 18rem;
    margin: 5vh auto;
    padding: 2rem 5rem;
    cursor: default;
    h1 {
      font-size: 3rem;
      margin: 0.25rem auto;
    }
    h2 {
      font-size: 1rem;
      margin: 0.25rem auto;
      &.warning {
        color: var(--warning);
      }
      &.error {
        color: var(--error);
      }
    }
  }
  .loader {
    width: 70px;
    height: 35px;
    position: relative;
    overflow: hidden;
  }
  .loader:before {
    content: '';
    width: 70px;
    height: 70px;
    position: absolute;
    left: 0;
    top: 0;
    border: 5px solid #0000;
    border-color: var(--foreground) var(--foreground) #0000 #0000;
    border-radius: 50%;
    box-sizing: border-box;
    animation: rotate 3s ease-in-out infinite;
    transform: rotate(-200deg);
  }
  @keyframes rotate {
    0% {
      border-width: 10px;
    }
    25% {
      border-width: 3px;
    }
    50% {
      border-width: 10px;
      transform: rotate(115deg);
    }
    75% {
      border-width: 3px;
    }
    100% {
      border-width: 10px;
    }
  }
</style>
