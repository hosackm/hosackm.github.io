<!-- _post.svelte is a layout for our markdown posts -->
<script lang="ts">
  export let title;
  export let date;
</script>

<h1>{title}</h1>
<p>Published: {date}</p>
