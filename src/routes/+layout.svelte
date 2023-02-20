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
  /* Texas A&M color palette */
  :root {
    --cream: #d6d3c5;
    --darkgrey: #322c2c;
    --lightgrey: #717373;
    --maroon: #4a0905;
  }
  /* Customizing Pico CSS */
  :global(*) {
    --color: var(--darkgrey);
    --contrast: var(--darkgrey);
    --contrast-hover: var(--lightgrey);
    --form-element-active-border-color: var(--maroon);
    --primary: var(--maroon);
    --primary-hover: #800000;
    --primary-focus: rgba(216, 27, 96, 0.25);
    --primary-inverse: #fff;
  }
  :global(body) {
    background: #fdfdfd;
    background-image: radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 0);
    background-size: 20px 20px;
    background-position: -19px -19px;
  }
  :global(h1, h3, h5, p, label) {
    color: var(--darkgrey);
  }
  :global([type="checkbox"][role="switch"]:checked) {
    --background-color: var(--maroon);
    --border-color: var(--maroon);
  }
  :global(footer) {
    display: flex;
    gap: 1rem;
    justify-content: right;
  }
</style>
