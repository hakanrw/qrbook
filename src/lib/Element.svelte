<script>
  export let data;
</script>

{#if data.type === "text"}
  <textarea class="textarea textarea-bordered w-full" placeholder="text"></textarea>
{:else if data.type === "image"}
  <input type="text" placeholder="image address" class="input input-bordered w-full" />
{:else if data.type === "kvpair"}
  <div class="flex w-full">
    <input type="text" placeholder="key" class="grid flex-grow input input-bordered w-full" />
    <div class="divider divider-horizontal"></div>
    <input type="text" placeholder="value" class="grid flex-grow input input-bordered w-full" />
  </div>
{:else}
  <div>unknown</div>
{/if}


<style>
  .textarea {
    font-size: 1rem;
  }
</style>