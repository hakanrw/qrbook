<script>
  import { Link } from "svelte-navigator";
  import LogoIcon from "../icons/LogoIcon.svelte";
  import PlusIcon from "../icons/PlusIcon.svelte";
  import LogInIcon from "../icons/LogInIcon.svelte";
  import { logIn, user } from "../lib/firebase";
    import PaperIcon from "../icons/PaperIcon.svelte";

</script>

<div class="flex flex-col justify-center items-center mx-10 calcsth gap-3">

  <div class="mt-16 text-3xl md:text-4xl text-primary text-center">    
    <LogoIcon class="w-[160px] h-[160px] md:w-[200px] md:h-[200px] mx-auto" />
    <div class="font-bold md:mb-5">your place to share</div>
  </div>
    
  <div/>
  {#if $user}
    <Link to="/create" class="paper w-[400px] p-4 flex items-center gap-5 text-primary text-xl block">
      <PlusIcon class="w-10 h-10" />
      create new qrpage
    </Link>
    <Link to="/mine" class="paper w-[400px] p-4 flex items-center gap-5 text-primary text-xl block">
      <PaperIcon class="w-10 h-10" />
      see your qrpages
    </Link>
  {:else}
    <button on:click={logIn} class="paper w-[400px] p-4 flex items-center gap-5 text-primary text-xl block">
      <LogInIcon class="w-10 h-10" />
      log in
    </button>
  {/if}

</div>

<style>
  .calcsth {
    height: calc(100vh - 200px);
  }
</style>