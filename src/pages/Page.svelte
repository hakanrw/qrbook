<script>
  import ElementView from "../lib/ElementView.svelte";
  import { useNavigate, useParams } from "svelte-navigator";
  import Qr from "../lib/QR.svelte";
  import DownloadIcon from "../icons/DownloadIcon.svelte";
  import PrintIcon from "../icons/PrintIcon.svelte";
  import { onMount } from "svelte";
  import { firestore } from "../lib/firebase";
  import { collection, doc, getDoc } from "firebase/firestore";
  import LoadIcon from "../icons/LoadIcon.svelte";
	
  const params = useParams();
  const navigate = useNavigate();

  $: console.log($params);

  let pageName = null;

  let elements = null;

  onMount(async () => {
    const docRef = await getDoc(doc(firestore, "pages", $params.page));
    if (!docRef.exists()) navigate("/");
    
    let data = docRef.data().pageData;
    let title = docRef.data().title;
    console.log(data);
    for (const oneData of data) {
      if (oneData.type === "kvpair") oneData.value = Object.entries(oneData.value);
    }

    elements = data;
    pageName = title;
  })
</script>

{#if elements}
  <div class="px-5 my-16">
    <div class="paper mx-auto max-w-[650px] p-4 text-stone-500">
      <div class="text-primary text-2xl font-bold text-center">
        <div>{pageName}</div>
      </div>
      {#each elements as element, i}
        <div class="divider my-1"/>
        <div class="sm:px-2">
          <ElementView data={element} />
        </div>
      {/each}
    </div>
  </div>
    
  <div class="p-5 paper mt-16 w-[250px] mx-auto">
    <Qr address={window.location.href}/>
    <button class="btn btn-ghost flex flex-row space-x-3 items-center justify-start px-2 mt-3 mx-auto font-bold hidden-print">
      <DownloadIcon class="w-6 h-6"/>
      <div>download qr</div>
    </button>
    <div class="divider my-1 h-0"/>
    <button on:click={() => window.print()} class="btn btn-ghost flex flex-row space-x-3 items-center justify-start px-2 mx-auto font-bold hidden-print">
      <PrintIcon class="w-6 h-6"/>
      <div>print page</div>
    </button>
  </div>

  <div class="text-center my-4 only-on-print">{window.location.href}</div>
  <div class="hidden-print my-16" />
{:else}
  <LoadIcon class="w-24 text-primary mx-auto animate-spin h-[calc(100vh-100px)]"/>
{/if}
