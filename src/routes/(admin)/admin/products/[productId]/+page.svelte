<script>
  import { enhance } from "$app/forms";
  import { formatImage } from "$lib/utils";

  export let data;
  let { id, image, name, price, colors, sizes } = data.product;

  let newColor;
  let newSize;

  function addColor() {
    if (colors.findIndex((color) => color === newColor.toUpperCase()) === -1)
      colors = [...colors, newColor.toUpperCase()];
    newColor = undefined;
  }

  function addSize() {
    if (sizes.findIndex((size) => size === newSize.toUpperCase()) === -1)
      sizes = [...sizes, newSize.toUpperCase()];
    newSize = undefined;
  }

  function deleteColor(oldColor) {
    colors = colors.filter((value) => value !== oldColor);
  }

  function deleteSize(oldSize) {
    sizes = sizes.filter((value) => value !== oldSize);
  }
</script>

<a class="secondary" href="/admin/products">
  <div class="go-back">
    <i class="fa-solid fa-circle-left" /><span>Products</span>
  </div>
</a>

{#if data.product}
  <article>
    <header>
      <h3>Edit Product</h3>
      <form action="?/delete" method="post">
        <input type="hidden" name="id" bind:value={id} />
        <button class="submit outline contrast"> Delete </button>
      </form>
    </header>

    <form class="grid" method="POST" action="?/save" use:enhance>
      <input type="hidden" name="id" bind:value={id} />
      <!-- Product image -->
      <section class="upload">
        <img src={formatImage(image)} alt={name} />
      </section>
      <!-- Product name -->
      <section>
        <fieldset>
          <input
            type="text"
            name="name"
            placeholder="Product name"
            bind:value={name}
            required
          />
        </fieldset>
        <!-- Product price -->
        <fieldset>
          <input
            type="number"
            name="price"
            step="0.01"
            placeholder="Product price"
            bind:value={price}
            required
          />
        </fieldset>
        <!-- Product colors -->
        <form on:submit|preventDefault={addColor}>
          <fieldset class="form-group">
            <input
              type="text"
              name="color"
              bind:value={newColor}
              placeholder="Add a color..."
            />
            <button class="contrast add">+</button>
          </fieldset>
        </form>
        <!-- Colors added -->
        <div class="badges">
          {#each colors as color}
            <form on:submit|preventDefault={() => deleteColor(color)}>
              <button class="outline contrast">{color}</button>
            </form>
          {/each}
        </div>
        <input type="hidden" name="colors" value={colors} />
        <!-- Product sizes -->
        <form on:submit|preventDefault={addSize}>
          <fieldset class="form-group">
            <input
              type="text"
              name="size"
              bind:value={newSize}
              placeholder="Add a size..."
            />
            <button class="contrast add">+</button>
          </fieldset>
        </form>
        <!-- Sizes added -->
        <div class="badges">
          {#each sizes as size}
            <form on:submit|preventDefault={() => deleteSize(size)}>
              <button class="outline contrast">{size}</button>
            </form>
          {/each}
        </div>
        <input type="hidden" name="sizes" value={sizes} />
        <!-- SUBMIT -->
        <button class="submit contrast">Save</button>
      </section>
    </form>
  </article>
{/if}

<style>
  header {
    display: flex;
    justify-content: space-between;
  }

  h3 {
    margin-bottom: 0;
  }

  a {
    text-decoration: none;
  }

  a:hover > .go-back {
    color: var(--secondary-hover);
  }

  .go-back {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  section {
    margin-bottom: 0;
  }

  fieldset {
    margin-bottom: 1rem;
  }

  .upload {
    margin-bottom: 0;
    display: grid;
    place-items: center;
    border: 1px dashed var(--muted-color);
    border-radius: 5px;
    color: var(--muted-color);
  }

  .upload > img {
    object-fit: contain;
  }

  .submit,
  form {
    margin-bottom: 0;
  }

  .form-group {
    display: flex;
    gap: 1rem;
  }

  .add {
    padding: 10px;
    width: 100px;
  }

  .badges {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
  }
</style>
