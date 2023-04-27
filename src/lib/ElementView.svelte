<script>
  export let data;
</script>


{#if data.type === "text"}
  <div class="px-4 py-2">{data.value}</div>
{:else if data.type === "image"}
  <img src={data.value} alt="image" class="mx-auto" />
{:else if data.type === "kvpair"}
  <div>
    {#each data.value as entry, i}
      {#if i !== 0}
        <div class="divider my-0 h-0"/>
      {/if}
      <div class="flex my-2 items-center">
        <div class="grid w-24 sm:w-36 text-center">{entry[0]}</div>
        <div class="divider divider-horizontal mx-0 sm:mx-2"></div>
        <div class="grid w-0 flex-grow">{entry[1]}</div>
      </div>
    {/each}
  </div>
{:else}
  <div>unknown</div>
{/if}

<style>
  img {
    max-height: 300px;
  }
</style>