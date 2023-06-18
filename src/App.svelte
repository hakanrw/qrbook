<script>
  import { Router, Link, Route } from "svelte-navigator";
  import Navbar from "./lib/Navbar.svelte";
  import Home from "./pages/Home.svelte";
  import Create from "./pages/Create.svelte";
  import Page from "./pages/Page.svelte";
  import Mine from "./pages/Mine.svelte";
</script>

<Router>
  <Navbar />

  <Route path="/:page" component={Page} />
  <Route path="/create" component={Create} />
  <Route path="/mine" component={Mine} />
  <Route path="/" component={Home} />
</Router>