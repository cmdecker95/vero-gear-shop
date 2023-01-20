<script>
  import Product from "$lib/components/Product.svelte";
  import { enhance } from "$app/forms";
  import { writable } from "svelte/store";

  export let data;
  export let form;

  let newColor;
  let newSize;
  let invalidColor = false;
  let invalidSize = false;

  let files;
  let preview;

  const colors = writable([]);
  const sizes = writable([]);

  const addColor = () => {
    invalidColor = $colors.find((color) => color == newColor.toUpperCase());
    if (!invalidColor) {
      $colors = [...$colors, newColor.toUpperCase()];
      newColor = undefined;
    }
  };

  const addSize = () => {
    invalidSize = $sizes.find((size) => size == newSize.toUpperCase());
    if (!invalidSize) {
      $sizes = [...$sizes, newSize.toUpperCase()];
      newSize = undefined;
    }
  };

  const deleteColor = (oldColor) => {
    $colors = $colors.filter((value) => value !== oldColor);
  };

  const deleteSize = (oldSize) => {
    $sizes = $sizes.filter((value) => value !== oldSize);
  };

  const showPreview = () => {
    const reader = new FileReader();

    reader.onloadend = () => (preview.src = reader.result);

    if (files[0]) {
      reader.readAsDataURL(files[0]);
    } else {
      preview.src = "";
    }
  };

  $: if (form?.success) {
    $colors = [];
    $sizes = [];
    files = null;
  }

  $: ({ products } = data);
</script>

<div class="container mt-5 card p-5">
  <h1 class="card-title mb-3">Add Product</h1>
  <div class="mb-3" style="border-bottom:solid 1px black;width:4rem" />
  <form method="POST" action="?/addProduct" use:enhance>
    <!-- Product image -->
    <div class="mb-3">
      <img
        style={files ? "" : "display:none"}
        src=""
        alt="Product"
        bind:this={preview}
      />
      <input
        class="form-control"
        id="file"
        type="file"
        name="file"
        bind:files
        on:change={showPreview}
        accept=".jpg, .jpeg, .png"
        required
      />
      <p class="form-text">Product image (JPG, PNG)</p>
    </div>
    <!-- Product name -->
    <div class="form-floating mb-3">
      <input
        class="form-control"
        id="name"
        type="text"
        name="name"
        placeholder="#"
        required
      />
      <label for="name">Product name</label>
    </div>
    <!-- Product price -->
    <div class="form-floating mb-3">
      <input
        class="form-control"
        id="type"
        type="number"
        name="price"
        placeholder="#"
        required
      />
      <label for="price">Price</label>
    </div>
    <!-- Product colors -->
    <form on:submit|preventDefault={addColor}>
      <div class="form-floating mb-3" style="display:flex;gap:1rem">
        <input
          class="form-control"
          id="color"
          type="text"
          name="color"
          bind:value={newColor}
          placeholder="#"
        />
        <label for="color">Add a color</label>
        <button class="btn btn-outline-primary" type="submit">Add</button>
      </div>
      {#if invalidColor}
        <p class="form-text text-danger">Already added</p>
      {/if}
    </form>
    <div class="container mb-3" style="display:flex;flex-direction:row">
      {#each $colors as color}
        <form on:submit|preventDefault={() => deleteColor(color)}>
          <button class="btn p-0 m-0">
            <span class="badge rounded-pill bg-dark mr-1 p-1">{color}</span>
          </button>
        </form>
      {/each}
    </div>
    <input type="hidden" name="colors" value={$colors} />
    <!-- Product sizes -->
    <form on:submit|preventDefault={addSize}>
      <div class="form-floating mb-3" style="display:flex;gap:1rem">
        <input
          class="form-control"
          id="size"
          type="text"
          name="size"
          bind:value={newSize}
          placeholder="#"
        />
        <label for="size">Add a size</label>
        <button class="btn btn-outline-primary" type="submit">Add</button>
      </div>
      {#if invalidSize}
        <p class="form-text text-danger">Already added</p>
      {/if}
    </form>
    <div class="container mb-3" style="display:flex;flex-direction:row">
      {#each $sizes as size}
        <form on:submit|preventDefault={() => deleteSize(size)}>
          <button class="btn p-0 m-0">
            <span class="badge rounded-pill bg-dark mr-1">{size}</span>
          </button>
        </form>
      {/each}
    </div>
    <input type="hidden" name="sizes" value={$sizes} />
    <!-- SUBMIT -->
    <button class="btn btn-primary" type="submit">Add Product</button>
  </form>
</div>

<div class="container mt-5 card p-5">
  <h1>Products</h1>
  <div class="mb-3" style="border-bottom:solid 1px black;width:4rem" />
  {#each products as product}
    <Product {...product} />
  {/each}
</div>
