<script>
  import { tick } from "svelte";
  import EditIcon from "../icons/EditIcon.svelte";
  import PlusIcon from "../icons/PlusIcon.svelte";

  let pageName = "new qrpage";
  let tempName = pageName;
  let checkboxInput;
  let nameInput;
  function updateName() {
    pageName = tempName.substring(0, 40);
  }


</script>

<div class="px-5 mt-16">
  <div class="paper mx-auto max-w-[650px] text-primary p-4 text-center">
    <label for="edit-toggle-create" class="normal-case btn btn-ghost mx-auto text-2xl font-bold justify-center items-center inline-flex flex-row space-x-2">
      <div class="mb-[3px]">{pageName}</div>
      <EditIcon class="w-6 h-6" />
    </label>
    <div class="divider my-1"/>
    <label for="element-toggle-create" class="normal-case btn btn-ghost w-full flex flex-row space-x-3 items-center justify-start text-stone-500 px-2">
      <PlusIcon class="w-6 h-6" />
      <div>add element</div>
    </label>
  </div>
  <div class="mx-auto max-w-[650px] flex flex-row justify-end mt-5">
    <button class="elevate btn btn-primary">
      create
    </button>
  </div>
</div>

<!-- Put this part before </body> tag -->

<!-- BEGIN MONSTROSITY -->
<!-- SET NAME DIALOG -->
<input type="checkbox" id="edit-toggle-create" class="modal-toggle" bind:this={checkboxInput} on:change={ e => e.target.checked && setTimeout(() => nameInput.focus(), 100) } />
<label for="edit-toggle-create" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <h3 class="text-lg font-bold">qrpage name</h3>
    <input type="text" placeholder="Type here" class="input input-bordered w-full block my-4" bind:value={tempName} bind:this={nameInput} on:keypress={(e) => {if (e.key === "Enter") {updateName();  checkboxInput.checked = false}}} />
    <div class="modal-action">
      <button on:click={updateName} >
        <label for="edit-toggle-create" class="btn btn-primary">update</label>
      </button>
    </div>
  </label>
</label>

<!-- ADD ELEMENT DIALOG -->
<input type="checkbox" id="element-toggle-create" class="modal-toggle" />
<label for="element-toggle-create" class="modal cursor-pointer">
  <label class="modal-box relative md:max-w-[45rem]" for="">
    <h3 class="text-lg font-bold">add element</h3>
    <div class="flex flex-col w-full md:flex-row mt-4">
      <div class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">text</div> 
      <div class="divider md:divider-horizontal" />
      <div class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">image</div>
      <div class="divider md:divider-horizontal" />
      <div class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">heading</div>
    </div>
  </label>
</label>