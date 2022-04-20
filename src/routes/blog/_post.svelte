<!-- _post.svelte is a layout for our markdown posts -->
<script lang="ts">
  import "./styles/prism-one-dark.css";

  export let title;
  export let date;
  export let author;
  export let preamble;
  export let category;
</script>

<style lang="postcss">
  h1 {
    @apply text-2xl text-gray-900 font-bold;
  }
</style>

<div class="mx-auto w-4/6">
  <p>{title}</p>
  <p>{date}</p>
  <p>{author}</p>
  <p>{preamble}</p>
  <p>{category}</p>

  <article class="prose prose-slate lg:prose-xl">
    <slot/>
  </article>
</div>