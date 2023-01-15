<script>
  export let data;
</script>

<ul>
  {#each data.products as product}
    <li>
      <form method="POST" action="?/addToOrder">
        {product.hello}
      </form>
    </li>
  {/each}
</ul>
