<script>
  import CloseIcon from "../icons/CloseIcon.svelte";
  import PlusIcon from "../icons/PlusIcon.svelte";

  export let data;
  export let onUpdate;

  // let first = data;
  // $: console.log(data, first);
</script>

{#if data.type === "text"}
  <textarea class="textarea textarea-bordered flex-grow" placeholder="text" on:change={(e) => onUpdate(e.target.value)}>{data.value}</textarea>
{:else if data.type === "image"}
  <input type="text" autocomplete="new-password" placeholder="image address" class="input input-bordered flex-grow" on:change={(e) => onUpdate(e.target.value)} value={data.value} />
{:else if data.type === "kvpair"}
  <div class="flex-grow">
    {#each data.value as entry, i}
      <div class="flex my-2">
        <input type="text" autocomplete="new-password" placeholder="key" class="grid w-24 sm:w-48 input input-bordered" on:change={(e) => onUpdate( data.value.map((kv, index) => index === i ? [e.target.value, entry[1]] : kv) ) } value={entry[0]}  />
        <div class="divider divider-horizontal mx-0 sm:mx-2"></div>
        <input type="text" autocomplete="new-password" placeholder="value" class="grid w-0 flex-grow input input-bordered" on:change={(e) => onUpdate( data.value.map((kv, index) => index === i ? [entry[0], e.target.value] : kv) ) } value={entry[1]} />
        {#if data.value.length > 1}
          <button on:click={() => onUpdate(data.value.filter((el, index) => index !== i)) }>
            <CloseIcon class="w-5 h-5 ml-2"/>
          </button>
        {/if}
      </div>
    {/each}
    <button class="normal-case btn btn-ghost w-full flex flex-row space-x-3 items-center justify-start px-2 text-sm" on:click={() => onUpdate([...data.value, ["", ""]])}>
      <PlusIcon class="w-5 h-5" />
      <div>add pair</div>
    </button>
  </div>
{:else}
  <div>unknown</div>
{/if}

<style>
  .textarea {
    font-size: 1rem;
  }
</style>