<script>
  import Product from "$lib/components/Product.svelte";
  import { enhance } from "$app/forms";
  import { writable } from "svelte/store";

  export let data;
  export let form;

  let newColor;
  let newSize;
  let files;

  const colors = writable([]);
  const sizes = writable([]);

  function addColor() {
    if ($colors.findIndex((color) => color === newColor.toUpperCase()) === -1)
      $colors = [...$colors, newColor.toUpperCase()];
    newColor = undefined;
  }

  function addSize() {
    if ($sizes.findIndex((size) => size === newSize.toUpperCase()) === -1)
      $sizes = [...$sizes, newSize.toUpperCase()];
    newSize = undefined;
  }

  function deleteColor(oldColor) {
    $colors = $colors.filter((value) => value !== oldColor);
  }

  function deleteSize(oldSize) {
    $sizes = $sizes.filter((value) => value !== oldSize);
  }

  $: if (form?.success) {
    $colors = [];
    $sizes = [];
    files = null;
  }
</script>

<h1>Admin</h1>

<article>
  <form method="POST" action="?/addProduct" use:enhance>
    <h1>Add Product</h1>
    <!-- Product image -->
    <section class="upload">
      {#if files}
        <img
          style="max-width:50%"
          src={URL.createObjectURL(files[0])}
          alt="product"
        />
      {:else}
        <label for="file">
          <i class="fa-solid fa-file-arrow-up" />
          Product image
        </label>
      {/if}
    </section>

    <input
      id="file"
      type="file"
      name="file"
      bind:files
      accept=".jpg, .jpeg, .png"
      style="display:none"
      required
    />

    <!-- Product name -->
    <fieldset>
      <input type="text" name="name" placeholder="Product name" required />
    </fieldset>

    <!-- Product price -->
    <fieldset>
      <input
        type="number"
        name="price"
        step="0.01"
        placeholder="Product price"
        required
      />
    </fieldset>

    <!-- Product colors -->
    <form on:submit|preventDefault={addColor}>
      <fieldset style="display:flex;gap:1rem">
        <input
          type="text"
          name="color"
          bind:value={newColor}
          placeholder="Add a color..."
        />
        <button class="contrast" style="padding:10px;width:100px">+</button>
      </fieldset>
    </form>

    <!-- Colors added -->
    <div style="display:flex;flex-direction:row;gap:1rem">
      {#each $colors as color}
        <form on:submit|preventDefault={() => deleteColor(color)}>
          <button class="outline contrast">{color}</button>
        </form>
      {/each}
    </div>
    <input type="hidden" name="colors" value={$colors} />

    <!-- Product sizes -->
    <form on:submit|preventDefault={addSize}>
      <fieldset style="display:flex;gap:1rem">
        <input
          type="text"
          name="size"
          bind:value={newSize}
          placeholder="Add a size..."
        />
        <button class="contrast" style="width:100px">+</button>
      </fieldset>
    </form>

    <!-- Sizes added -->
    <div style="display:flex;flex-direction:row;gap:1rem">
      {#each $sizes as size}
        <form on:submit|preventDefault={() => deleteSize(size)}>
          <button class="outline contrast">{size}</button>
        </form>
      {/each}
    </div>
    <input type="hidden" name="sizes" value={$sizes} />
    <!-- SUBMIT -->
    <button class="contrast">Add product</button>
  </form>
</article>

<div class="products">
  {#each data.products as product}
    <Product {product} />
  {/each}
</div>

<style>
  fieldset {
    margin-bottom: 1rem;
  }

  .upload {
    margin-bottom: 2rem;
    text-align: center;
    border: 1px dashed gray;
    border-radius: 5px;
    padding: 2rem;
    color: gray;
  }

  .products {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    row-gap: 1rem;
    column-gap: 1rem;
    justify-content: center;
  }
</style>
