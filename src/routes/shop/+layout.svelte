<script>
  import Navbar from "$lib/components/Navbar.svelte";
  let cart = [
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKr5wT7rfkjkGvNeqgXjBmarC5ZNoZs-H2uMpML8O7Q4F9W-IlUQibBT6IPqyvX45NOgw&usqp=CAU",
      name: "Product Name",
      price: 9.99,
      colors: ["red", "black"],
      sizes: ["s", "m", "l"],
    },
  ];
</script>

<Navbar {cart} />
<div class="container" style="padding-top:5rem">
  <slot />
</div>
