<script>
    import { Link } from "svelte-navigator";
    import LogoIcon from "../icons/LogoIcon.svelte";
    import LogInIcon from "../icons/LogInIcon.svelte";
    import { logIn, logOut, user } from "./firebase";
    import ProfileIcon from "../icons/ProfileIcon.svelte";
    import PaperIcon from "../icons/PaperIcon.svelte";
    import LogOutIcon from "../icons/LogOutIcon.svelte";

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
    {:else}
      <div class="flex-none">
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost"><ProfileIcon class="w-6 h-6"/></label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-neutral">
            <li><Link to="/mine"><PaperIcon />my qrpages</Link></li>
            <li><button on:click={logOut}><LogOutIcon />log out</button></li>
          </ul>
        </div>
      </div>
    {/if}
  </div>
</nav>
