<script>
    import { Link } from "svelte-navigator";
    import LogoIcon from "../icons/LogoIcon.svelte";
    import LogInIcon from "../icons/LogInIcon.svelte";
    import { logIn, user } from "./firebase";

</script>

<div class="text-4xl text-primary font-bold text-center only-on-print">qrbook</div>

<nav>
  <div class="navbar elevate bg-primary text-primary-content hidden-print">
    <div class="flex-1">
      <Link to="/" class="btn btn-ghost normal-case text-xl">
        <LogoIcon class="w-8 h-8" />
        <span class="ml-1 mb-[3px]">qrbook</span>        
      </Link>
    </div>
    {#if $user === null }
      <div class="flex-none">
        <button class="btn btn-square btn-ghost" on:click={logIn}>
          <LogInIcon class="w-6 h-6" />       
        </button>
      </div>
    {/if}
  </div>
</nav>
