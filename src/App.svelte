<script>
  	import { Router, Link, Route } from "svelte-navigator";
    import Navbar from "./lib/Navbar.svelte";
    import Home from "./pages/Home.svelte";
    import Create from "./pages/Create.svelte";
</script>

<Router>
  <Navbar />

  <Route path="/create" component={Create} />
  <Route path="*" component={Home} />
</Router>