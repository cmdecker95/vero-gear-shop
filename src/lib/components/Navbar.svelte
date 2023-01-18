<script>
  export let products;

  $: emptyCart = products.length === 0;
</script>

<nav class="navbar bg-dark fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand text-white bold" href="/">VERO Shop</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasNavbar"
      aria-controls="offcanvasNavbar"
    >
      <div
        class="btn btn-light text-dark"
        style="display: flex; align-items: center; gap: 0.5rem;"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-bag"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
          />
        </svg>
        Cart ({products.length})
      </div>
    </button>
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Your Cart</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div
        class="offcanvas-body"
        style="display:flex;flex-direction:column;gap:1rem"
      >
        {#each products as product}
          <li>product</li>
        {/each}
        <button class="btn btn-dark">Review Order</button>
      </div>
    </div>
  </div>
</nav>
