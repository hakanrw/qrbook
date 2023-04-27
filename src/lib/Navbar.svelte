<script>
    import { Link } from "svelte-navigator";
    import LogoIcon from "../icons/LogoIcon.svelte";
    import LogInIcon from "../icons/LogInIcon.svelte";
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
    <div class="flex-none">
      <button class="btn btn-square btn-ghost">
        <LogInIcon class="w-6 h-6" />       
      </button>
    </div>
  </div>
</nav>
