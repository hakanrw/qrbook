<script>
  import { tick } from "svelte";
  import { element } from "svelte/internal";
  import EditIcon from "../icons/EditIcon.svelte";
  import PlusIcon from "../icons/PlusIcon.svelte";
  import TextIcon from "../icons/TextIcon.svelte";
  import ImageIcon from "../icons/ImageIcon.svelte";
  import HeadingIcon from "../icons/HeadingIcon.svelte";
  import Element from "../lib/Element.svelte";
  import CloseIcon from "../icons/CloseIcon.svelte";
  import UpIcon from "../icons/UpIcon.svelte";
  import DownIcon from "../icons/DownIcon.svelte";
  import { auth, functions } from "../lib/firebase";
  import { httpsCallable } from "firebase/functions";
  import { useNavigate } from "svelte-navigator";
  import { getStorage, ref, uploadBytes } from "firebase/storage";

  const navigate = useNavigate();

  let elements = [];
  let counter = 0;

  let pageName = "new qrpage";
  let tempName = pageName;
  let nameToggle;
  let nameInput;
  function updateName() {
    pageName = tempName.substring(0, 40);
  }

  let elementToggle;
  function addElement(type) {
    counter++;
    elementToggle.checked = false;
    elements = elements.concat([
      {
        id: counter,
        value: type === "kvpair" ? [["", ""]] : "",
        type
      }
    ]);
  }

  let addText = () => addElement("text");
  let addImage = () => addElement("image");
  let addKVPair = () => addElement("kvpair");

  function updateElement(idx) {
    return (value) => {elements[idx].value = value; console.log(elements)};
  }

  let message = null;

  const createPageCallable = httpsCallable(functions, "createPage");

  async function createPage() {
    message = ["info", "creating page..."];

    let images = elements.filter(element => element.type === "image");
    if (images.length > 0) { 
      let error = await uploadImages(images);
      if (error) { 
        message = ["error", error];
        return;
      }
    }
    elements = elements;

    
    createPageCallable({ data: elements, title: pageName }).then((data) => {
      data = data.data;
      console.log(data);

      if (data.status !== "success") {
        message = [data.status, data.message]; 
      } else {
        navigate("/" + data.url);
      }
    })
  }

  const storage = getStorage();

  const getFileBlob = function (url) {
    return new Promise((resolve, reject) => {

      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.addEventListener('load', function() {
        resolve(xhr.response);
      });
      xhr.send();
    })
  };

  async function uploadImages(images) {
    message = ["info", "uploading images..."];

    for (const image of images) { 
      if (!image.value.startsWith("blob")) return;
      const imageRef = ref(storage, `images/${image.value.slice(image.value.lastIndexOf('/') + 1)}.jpg`);
      try {
        const result = await uploadBytes(imageRef, await getFileBlob(image.value), {customMetadata: { 'uid': auth.currentUser.uid }});
        console.log(result);
        image.uploadedURL = result.ref.fullPath;
        console.log(image);
      } catch (error) {
        return error;
      }
    }

  }
</script>

<div class="px-5 mt-16">
  <div class="paper mx-auto max-w-[650px] p-4 text-center text-stone-500">
    <label for="edit-toggle-create" class="normal-case text-primary btn btn-ghost mx-auto text-2xl font-bold justify-center items-center inline-flex flex-row space-x-2">
      <div class="mb-[3px]">{pageName}</div>
      <EditIcon class="w-6 h-6" />
    </label>
    {#each elements as element, i (element.id)}
      <div class="divider my-1"/>
      <div class="sm:px-2 flex flex-row items-center gap-2 text-stone-500">
        <Element data={element} onUpdate={updateElement(i)} />
        <div class="flex flex-col items-center text-stone-400">
          {#if i !== 0}
          <button on:click={() => elements.splice(i - 1, 0, elements.splice(i, 1)[0]) && (elements = elements) }>
            <UpIcon class="w-6 h-6"/>
          </button>
          {/if}
          <button on:click={() => elements = elements.filter((el) => el.id != element.id)}>
            <CloseIcon class="w-8 h-8"/>
          </button>
          {#if i !== elements.length - 1}
          <button on:click={() => elements.splice(i + 1, 0, elements.splice(i, 1)[0]) && (elements = elements) }>
            <DownIcon class="w-6 h-6"/>
          </button>
          {/if}
        </div>
      </div>
    {/each}
    <div class="divider my-1"/>
    <label for="element-toggle-create" class="normal-case btn btn-ghost w-full flex flex-row space-x-3 items-center justify-start px-2">
      <PlusIcon class="w-6 h-6" />
      <div>add element</div>
    </label>
  </div>
  {#if message && message[0] === "info"}
  <div class="alert alert-info shadow-lg mt-5 mx-auto max-w-[650px]">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <span>{message[1]}</span>
    </div>
  </div>
{/if}
  {#if message && message[0] === "error"}
    <div class="alert alert-error shadow-lg mt-5 mx-auto max-w-[650px]">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{message[1]}</span>
      </div>
    </div>
  {/if}
  <div class="mx-auto max-w-[650px] flex flex-row justify-end my-5">
    <button class="elevate btn btn-primary" on:click={createPage}>
      create
    </button>
  </div>
</div>

<!-- Put this part before </body> tag -->

<!-- BEGIN MONSTROSITY -->
<!-- SET NAME DIALOG -->
<input type="checkbox" id="edit-toggle-create" class="modal-toggle" bind:this={nameToggle} on:change={ e => e.target.checked && setTimeout(() => nameInput.focus(), 100) } />
<label for="edit-toggle-create" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <h3 class="text-lg font-bold">qrpage name</h3>
    <input type="text" placeholder="Type here" class="input input-bordered w-full block my-4" bind:value={tempName} bind:this={nameInput} on:keypress={(e) => {if (e.key === "Enter") {updateName();  nameToggle.checked = false}}} />
    <div class="modal-action">
      <button on:click={updateName} >
        <label for="edit-toggle-create" class="btn btn-primary">update</label>
      </button>
    </div>
  </label>
</label>

<!-- ADD ELEMENT DIALOG -->
<input bind:this={elementToggle} type="checkbox" id="element-toggle-create" class="modal-toggle" />
<label for="element-toggle-create" class="modal cursor-pointer">
  <label class="modal-box relative md:max-w-[45rem]" for="">
    <h3 class="text-lg font-bold">add element</h3>
    <div class="flex flex-col w-full sm:flex-row mt-4">
      <button class="grid sm:w-[33%] h-32 card bg-base-300 rounded-box place-items-center text-center" on:click={addText}>
        <div>
          <TextIcon class="w-12 h-12 mx-auto"/>
          <div>text</div>
        </div>
      </button>
      <div class="divider sm:divider-horizontal" />
      <button class="grid sm:w-[33%] h-32 card bg-base-300 rounded-box place-items-center text-center" on:click={addImage}>
        <div>
          <ImageIcon class="w-12 h-12 mx-auto"/>
          <div>image</div>
        </div>
      </button> 
      <div class="divider sm:divider-horizontal" />
      <button class="grid sm:w-[33%] h-32 card bg-base-300 rounded-box place-items-center text-center" on:click={addKVPair}>
        <div class="text-center">
          <HeadingIcon class="w-12 h-12 mx-auto"/>
          <div>key value pair</div>
        </div>
      </button>
    </div>
  </label>
</label>

<style>
</style>