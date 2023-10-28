<script lang="ts">
  import TitleSection from './parts/TitleSection.svelte';
  import PostsSection from './parts/Posts.svelte';
  import ProjectsSection from './parts/Projects.svelte';
  import AboutSection from './parts/About.svelte';
  import ContactSection from './parts/Contact.svelte';
  import TechStackSection from './parts/TechStackSection.svelte';
  
  export let data: any;
  
  </script>

<div class="index-page">
  <PostsSection posts={data.posts}  accent="var(--accent-1)" />
  <ProjectsSection projects={data.repos} accent="var(--accent-2)" />
  <ContactSection returnedSocials={data.socials}  accent="var(--accent-3)" />
  <AboutSection  accent="var(--accent-4)" />
  <TechStackSection  accent="var(--accent-1)" />
</div>

<style lang="scss">
  @import '$src/styles/media-queries.scss';

  .index-page {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    grid-column-gap: 2rem;
    grid-row-gap: 0.5rem;
    padding: 1rem;
    width: 95vw;
    margin: 0 auto;

    @include tablet-down {
      padding: 0;
    }
  }
</style>
