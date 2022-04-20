<script lang="ts">
  export let date;
  export let title;
  export let preamble;
  export let path;
  export let category;
  export let author;
</script>

<div class="max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
  <div class="flex items-center justify-between">
      <span class="text-sm font-light text-gray-600 dark:text-gray-400">{date}</span>
      <a href="/" class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">{category}</a>
  </div>

  <div class="mt-2">
      <a href={path} class="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">{title}</a>
      <p class="mt-2 text-gray-600 dark:text-gray-300">{preamble}</p>
  </div>

  <div class="flex items-center justify-between mt-4">
      <a href={path} class="text-blue-600 dark:text-blue-400 hover:underline">Read more</a>

      <div class="flex items-center">
          <img class="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src="https://en.gravatar.com/userimage/51761518/be518abd620ffe99b89bc33a8f7c29c1.jpg" alt="avatar">
          <a href="/" class="font-bold text-gray-700 cursor-pointer dark:text-gray-200">{author}</a>
      </div>
  </div>
</div>