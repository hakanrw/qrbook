<script>
  import { collection, getDocs, limit, query, where } from "firebase/firestore";
  import { onMount } from "svelte";
  import { auth, firestore, functions, user } from "../lib/firebase";
  import { Link } from "svelte-navigator";
  import Qr from "../lib/QR.svelte";
  import TrashIcon from "../icons/TrashIcon.svelte";
  import PrintIcon from "../icons/PrintIcon.svelte";
  import { httpsCallable } from "firebase/functions";
    import LoadIcon from "../icons/LoadIcon.svelte";
    import PlusIcon from "../icons/PlusIcon.svelte";

  let pages = null;
 
  async function load() {
    pages = null;

    const q = query(collection(firestore, "pages"), where("author", "==", $user.uid), limit(20));
    const querySnapshot = await getDocs(q);
    pages = [];
    querySnapshot.forEach((doc) => { 
      pages.push({ ...doc.data(), id: doc.id });
    });
    pages = pages; 
  }

  const deletePageCallable = httpsCallable(functions, "deletePage");

  async function deletePage(pageId) {
    pages = null;
    let res = await deletePageCallable({ page: pageId });
    load();
  }

  $: load($user); 
</script>

{#if pages}
  {#if pages.length != 0}
    <div class="px-5 mt-16">
      {#each pages as page (page.id)}
      <div class="mx-auto max-w-[650px] flex items-center gap-5 mt-5">
          <Link to={"/" + page.id} class="flex-1">
            <div class="paper  p-4 text-stone-500">
              <div class="flex items-center">
                <div class="only-on-print h-[100px] w-[100px]"></div>
                <div class="flex-1 text-center text-primary text-xl font-bold">{page.title}</div>
                <Qr address={"https://" + window.location.origin + "/" + page.id} height="100" width="100"/>
              </div>
            </div>
          </Link>
          <button on:click={() => deletePage(page.id)} class="hidden-print"><TrashIcon class="w-8 h-8"/></button>
        </div>
      <div class="text-center my-4 only-on-print">{window.location.origin + "/" + page.id}</div>
      {/each}
    </div>
    
    <button on:click={() => window.print()} class="paper mt-16 w-[200px] mx-auto hidden-print block">
      <div class="btn btn-ghost flex flex-row space-x-3 items-center justify-center px-2 font-bold hidden-print">
        <PrintIcon class="w-6 h-6"/>
        <div>print page</div>
      </div>
    </button>
  {:else}
    <div class="flex flex-col gap-5 mt-10 mx-10 items-center">

    <div class="paper w-full max-w-[400px] p-3 font-bold text-center text-primary text-xl">you currently have no qrpages</div>

    <Link to="/create" class="paper w-full max-w-[400px] p-4 flex items-center gap-5 text-primary text-xl block">
      <PlusIcon class="w-10 h-10" />
      create new qrpage
    </Link> 

    </div>

  {/if}
{:else}
  <LoadIcon class="w-24 text-primary mx-auto animate-spin h-[calc(100vh-100px)]"/>
{/if}