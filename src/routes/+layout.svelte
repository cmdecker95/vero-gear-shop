<script>
  import { page } from "$app/stores";
  import Navbar from "$lib/components/Navbar.svelte";
</script>

<svelte:head>
  <title>{$page.data.title} | VERO Shop</title>
</svelte:head>

<Navbar />
<main class="container">
  <slot />
</main>

<style>
  :root {
    --maroon: #4a0905;
    --darkgrey: #322c2c;
    --lightgrey: #717373;
    --cream: #d6d3c5;
  }

  :global(footer) {
    display: flex;
    justify-content: right;
    gap: 1rem;
  }
</style>
