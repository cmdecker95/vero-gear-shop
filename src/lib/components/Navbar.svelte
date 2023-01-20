<script>
  export let cart;

  import cartSVG from "$lib/assets/cart.svg";
  import Product from "$lib/components/Product.svelte";

  $: emptyCart = cart.length === 0;
</script>

<nav class="navbar bg-dark fixed-top" style="background-color: hsla(0,0,0,0.5)">
  <div class="container-fluid">
    <a class="navbar-brand text-white bold" href="/">VERO Shop</a>
    <div class="navbar-toggler" style="padding: 0">
      <button
        class="btn btn-light text-dark"
        style="display: flex; align-items: center; gap: 0.5rem;"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
      >
        <img src={cartSVG} alt="cart" />
        Cart ({cart.length})
      </button>
    </div>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Your Cart</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" />
      </div>
      <div
        class="offcanvas-body"
        style="display:flex;flex-direction:column;gap:1rem"
      >
        {#each cart as cartItem}
          <Product {...cartItem} />
        {/each}
        <button class="btn btn-dark">Review Order</button>
      </div>
    </div>
  </div>
</nav>
