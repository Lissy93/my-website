<script lang="ts">
import TitleSection from './parts/TitleSection.svelte';
import PostsSection from './parts/Posts.svelte';
import ProjectsSection from './parts/Projects.svelte';
import AboutSection from './parts/About.svelte';
import ContactSection from './parts/Contact.svelte';
import TechStackSection from './parts/TechStackSection.svelte';

export let data: any;

</script>

<TitleSection />

<div class="index-page">
  <PostsSection posts={data.posts} />
  <ProjectsSection projects={data.repos} />
  <ContactSection returnedSocials={data.socials} />
  <AboutSection />
  <TechStackSection />
</div>

<style lang="scss">
  .index-page {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    grid-column-gap: 2rem;
    grid-row-gap: 0.5rem;
    padding: 1rem;
    width: 95vw;
    margin: 0 auto;
  }
</style>