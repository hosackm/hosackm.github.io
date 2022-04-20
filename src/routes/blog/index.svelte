<script lang="ts" context="module">
  import BlogCard from "$lib/components/BlogCard.svelte";

  export const load = async ({ fetch }) => {
    const req = await fetch("/api/posts.json");
    const posts = await req.json();
    return { props: { posts } };
  };
</script>

<script lang="ts">
  export let posts: Post[];
  // flatten the post and it's metadata into a single level object
  $: flatPosts = posts.map((p) => {
    return {
      title: p.meta.title,
      date: p.meta.date,
      author: p.meta.author,
      category: p.meta.category,
      preamble: p.meta.preamble,
      path: p.path
    };
  });
</script>

<h1 class="py-10 text-2xl w-1/2 mx-auto">Blog Entries</h1>
<ul>
  {#each flatPosts as post}
    <BlogCard {...post}/>
  {/each}
</ul>
