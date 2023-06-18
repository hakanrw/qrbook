<script>
  import { collection, getDocs, limit, query, where } from "firebase/firestore";
  import { onMount } from "svelte";
  import { auth, firestore, user } from "../lib/firebase";
  import { Link } from "svelte-navigator";
  import Qr from "../lib/QR.svelte";
    import TrashIcon from "../icons/TrashIcon.svelte";

  let pages = [];
 
  async function load() {
    const q = query(collection(firestore, "pages"), where("author", "==", $user.uid), limit(20));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => { 
      pages.push({ ...doc.data(), id: doc.id });
    });
    pages = pages;
    console.log(pages);
  }

  $: load($user); 
</script>


<div class="px-5 mt-16">
  {#each pages as page (page.id)}
    <div class="mx-auto max-w-[650px] flex items-center gap-5">
      <Link to={"/" + page.id} class="flex-1">
        <div class="paper  p-4 text-stone-500">
          <div class="flex items-center">
            <div class="flex-1 text-center text-primary text-xl font-bold">{page.title}</div>
            <Qr address={window.location.hostname + "/" + page.id} height="100" width="100"/>
          </div>
        </div>
      </Link>
      <button><TrashIcon class="w-8 h-8"/></button>
    </div>
  {/each}
</div>