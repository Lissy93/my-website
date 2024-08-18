<script lang="ts">
  import type { SupportedSocials, UserSocial } from '$src/types/Socials';
  import { socialNetworks } from '$src/helpers/constants';
  import config from '$src/helpers/config';

</script>

<section class="main">
  <h2>Thanks 🙌</h2>
  <p>
    It's thanks to the following <a href="https://github.com/sponsors/lissy93">sponsors</a>
    that my projects have been possible.<br>
    I'm truly grateful for the support I've received from the community ❤️
  </p>
</section>

<style lang="scss">
  @import '$src/styles/typography.scss';
  section.main {
    width: 90vw;
    margin: 2rem auto 1rem auto;
    text-align: left;
    // display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    font-family: Poppins, sans-serif;
    font-size: 1.2rem;
    h2 {
      font-size: 3.5rem;
      margin: 1rem 0;
      font-family: Poppins, sans-serif; 

      
      // color: var(--accent);
    }
    a {
      color: var(--accent);
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }

  }
</style>
