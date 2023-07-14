<script>
  import { slide } from 'svelte/transition';
  import Heading from '$src/components/Heading.svelte';

  import config from '$src/helpers/config';

  const pgpPublicKey = config.contact.pgpPublicKey;

  let showPubKey = false;
  const toggleKeyVisibility = () => {
    showPubKey = !showPubKey;
  };

  const keys = [
    {
      label: 'PGP',
      value: 'FEDB 68F5 5C02 83A7',
      link: 'https://keybase.io/aliciasykes/pgp_keys.asc?fingerprint=0688f8d34587d954e9e51fb8fedb68f55c0283a7',
    },
    {
      label: 'Email',
      value: 'alicia at omg dot lol',
      link: 'mailto:alicia@omg.lol',
    },
    {
      label: 'Matrix',
      value: '@lissy93:matrix.org',
      link: 'https://matrix.to/#/@lissy93:matrix.org',
    },
    {
      label: 'XMPP',
      value: 'alicia@xmpp.is',
      link: 'xmpp:alicia@xmpp.is?join',
    },
    { label: 'Signal', value: 'trusted contacts only', link: '' },
  ];
</script>

<div class="pgp-container">
  <Heading level="h2" color="var(--accent)">keys</Heading>

  {#each keys as key}
    <div class="key-row">
      <span class="key-label">{key.label}</span>
      {#if key.link}
        <a class="key-link" href={key.link}><code>{key.value}</code></a>
      {:else}
        <code class="key-no-link">{key.value}</code>
      {/if}
    </div>
  {/each}

  <button class="toggle-key" on:click={toggleKeyVisibility}
    >{showPubKey ? 'Hide' : 'Show'} Armoured Public Key</button
  >

  {#if showPubKey}
    <div class="pgp-key" transition:slide>
      <code>{pgpPublicKey.replaceAll('  ', '')}</code>
    </div>
  {/if}
</div>

<style lang="scss">
  .pgp-container {
    min-width: 500px;
    h2 {
      font-size: 2rem;
      margin: 1rem 0;
      color: var(--accent);
      &:before {
        content: '>';
        margin-right: 6px;
      }
    }
    .pgp-key {
      margin: 1rem 0;
      white-space: pre;
      font-size: 0.75rem;
      padding: 0.5rem 1rem;
      color: var(--dimmed-text);
      background: var(--card-background);
      border-radius: var(--curve-factor);
    }
    .key-row {
      display: flex;
      align-items: center;
      margin: 0.5rem 0;
    }
    span.key-label {
      font-weight: bold;
      min-width: 4rem;
    }
    a.key-link,
    .key-no-link {
      color: var(--accent);
      text-decoration: none;
      padding: 0.1rem 0.5rem;
      border-radius: var(--curve-factor);
      background: var(--card-background);
      min-width: 10rem;
      &:hover {
        text-decoration: underline;
      }
      &.key-no-link {
        color: var(--foreground);
        &:hover {
          text-decoration: none;
        }
      }
    }
    .toggle-key {
      background: none;
      border: none;
      font-size: 0.75rem;
      margin: 0;
      padding: 0;
      color: var(--dimmed-text);
      opacity: 0.75;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
