<script>
  import { Link } from "svelte-navigator";
  import LogoIcon from "../icons/LogoIcon.svelte";
  import PlusIcon from "../icons/PlusIcon.svelte";
  import LogInIcon from "../icons/LogInIcon.svelte";
  import { logIn, user } from "../lib/firebase";

</script>

<div class="md:flex md:flex-row md:items-center md:mx-24 lg:mx-32 mx-10 calcsth">

  <div class="mt-16 text-3xl md:text-4xl text-primary text-center">    
    <LogoIcon class="w-[160px] h-[160px] md:w-[200px] md:h-[200px] mx-auto" />
    <div class="font-bold md:mb-5">your place to share</div>
  </div>
    
  <div class="flex-1"/>
  {#if $user}
    <Link to="/create" class="mt-10 paper mx-auto md:mx-0 max-w-[300px] md:w-[200px] text-center p-8 text-primary text-xl block">
      <PlusIcon class="w-12 h-12 mx-auto mb-3" />
      create new
    </Link>
  {:else}
    <button on:click={logIn} class="mt-10 paper mx-auto md:mx-0 max-w-[300px] md:w-[200px] w-full text-center p-8 text-primary text-xl block">
      <LogInIcon class="w-12 h-12 mx-auto mb-3" />
      log in
    </button>
  {/if}
  <div class="flex-1"/>

</div>

<style>
  .calcsth {
    height: calc(100vh - 200px);
  }
</style>