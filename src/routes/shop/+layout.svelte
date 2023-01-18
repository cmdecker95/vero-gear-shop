<script>
  import Navbar from "$lib/components/Navbar.svelte";
  let products = [];
</script>

<Navbar {products} />
<div class="container" style="padding-top:5rem">
  <slot />
</div>
