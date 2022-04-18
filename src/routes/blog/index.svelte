<script lang="ts" context="module">
  export const load = async ({ fetch }) => {
    const req = await fetch("/api/posts.json");
    const posts = await req.json();

    return { props: { posts } };
  };
</script>

<script lang="ts">
  export let posts;
</script>

<h1>My Blog</h1>
<ul>
  {#each posts as post}
    <li>
      <h2>
        <a href={post.path}>{post.meta.title}</a>
      </h2>
      Published: {post.meta.date}
    </li>
  {/each}
</ul>
