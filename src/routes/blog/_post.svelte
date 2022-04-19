<!-- _post.svelte is a layout for our markdown posts -->
<script lang="ts">
  import "./styles/prism-one-dark.css";

  export let title;
  export let date;
  export let author;
</script>

<style lang="postcss">
  h1 {
    @apply text-2xl text-gray-900 font-bold;
  }
</style>

<section class="my-10">
  <h1>{title}</h1>
  <p>Published: {date}</p>
  <p>By: {author}</p>
</section>

<article class="prose prose-slate lg:prose-xl">
  <slot/>
</article>
