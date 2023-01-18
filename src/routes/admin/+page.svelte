<script>
  import { enhance } from "$app/forms";
  export let data;
</script>

<h1>Add Product</h1>
<form method="POST" action="?/addproduct" use:enhance>
  <input type="text" name="name" placeholder="Enter product name" />
  <input type="file" name="file" accept=".jpg, .jpeg, .png" />
  <input type="submit" value="Add Product" />
</form>

<h1>Products</h1>
{#each data.products as product}
  <h4>{product.name}</h4>
  <img src={product.src} alt={product.name} />
{/each}
