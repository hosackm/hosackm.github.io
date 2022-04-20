<script lang="ts">
  import "../app.css";
  import Header from "$lib/components/Header.svelte";
</script>

<Header />

<main class="mx-auto w-4/6 py-10">
  <slot/>
</main>
