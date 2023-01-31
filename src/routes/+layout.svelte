<script>
  import Navbar from "$lib/components/Navbar.svelte";
  import { page } from "$app/stores";
</script>

<svelte:head>
  <title>{$page.data.title} | VERO Shop</title>
</svelte:head>

<main class="container">
  <Navbar />
  <slot />
</main>

<style>
  :global(footer) {
    display: flex;
    justify-content: right;
    gap: 1rem;
  }
</style>
