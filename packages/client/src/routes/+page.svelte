<script lang="ts">
  import Editor from './Editor.svelte'

  import '../tailwind.css'
</script>

<section class="my-16 flex flex-col items-center">
  <h1 class="mt-12 text-3xl hover:underline">
    <a href="https://teemukoivisto.github.io/prosemirror-node-view-gutters/">
      prosemirror-node-view-gutters
    </a>
  </h1>
  <p class="my-8 hover:underline">
    <a href="https://github.com/TeemuKoivisto/prosemirror-node-view-gutters">GitHub repo</a>
  </p>
  <Editor />
</section>

<style lang="scss">
</style>
