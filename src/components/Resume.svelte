<script lang="ts">
  import config from '$src/helpers/config';
  import Heading from '$src/components/Heading.svelte';
  import Icon from '$src/components/Icon.svelte';
  import Button from '$src/components/Button.svelte';

  const { workExperience } = config; 

  </script>

<Heading level="h2" color="var(--foreground)">Resume</Heading>

<p>
  My curriculum vitae can be viewed at
  <a href="https://cv.aliciasykes.com" target="_blank">cv.aliciasykes.com</a>
</p>

<p>A shortened PDF version can be downloaded below ↓</p>
<Button click={() => window.location.href = "https://cv.aliciasykes.com/download" }>
  <Icon name="download" />
  Download CV
</Button>

<small>Source code for CV is hosted at <a href="https://github.com/lissy93/cv">github.com/lissy93/cv</a></small>

<style lang="scss">
  a {
    color: var(--accent);
  }
  small {
    display: block;
    margin-top: 1rem; 
    opacity: 0.6;
  }
</style>
