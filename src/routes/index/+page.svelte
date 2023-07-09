<script lang="ts">
import TitleSection from './parts/TitleSection.svelte';
import PostsSection from './parts/Posts.svelte';
import ProjectsSection from './parts/Projects.svelte';
import AboutSection from './parts/About.svelte';
import ContactSection from './parts/Contact.svelte';
import TechStackSection from './parts/TechStackSection.svelte';

import IndexComponent from './IndexComponent.svelte';

export let data: any;

</script>

<TitleSection />

<IndexComponent data={data} />
