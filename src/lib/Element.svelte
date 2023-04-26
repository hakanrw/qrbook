<script>
  export let data;
</script>

{#if data.type === "text"}
  <textarea class="textarea textarea-bordered flex-grow" placeholder="text"></textarea>
{:else if data.type === "image"}
  <input type="text" placeholder="image address" class="input input-bordered flex-grow" />
{:else if data.type === "kvpair"}
  <div class="flex flex-grow">
    <input type="text" placeholder="key" class="grid w-24 sm:w-48 input input-bordered" />
    <div class="divider divider-horizontal mx-0 sm:mx-2"></div>
    <input type="text" placeholder="value" class="grid w-0 flex-grow input input-bordered" />
  </div>
{:else}
  <div>unknown</div>
{/if}


<style>
  .textarea {
    font-size: 1rem;
  }
</style>