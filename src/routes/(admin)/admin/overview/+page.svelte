<script>
  import { formatPrice } from "$lib/utils";
  import { Bar, Doughnut } from "svelte-chartjs";

  export let data;
  const {
    orderCount,
    fulfilledCount,
    productCount,
    productCounts,
    grandTotal,
  } = data;

  const orderChartData = {
    labels: ["📦 Processing", "✅ Fulfilled"],
    datasets: [
      {
        backgroundColor: ["#FDB45C", "rgb(54, 162, 235)"],
        data: [orderCount - fulfilledCount, fulfilledCount],
        hoverOffset: 4,
        label: "Orders",
      },
    ],
  };

  const productChartData = {
    labels: Object.keys(productCounts)
      .slice(0, 5)
      .map((label) =>
        label.length < 25 ? label : label.substring(0, 22) + "..."
      ),
    datasets: [
      {
        backgroundColor: "rgba(113, 205, 205,0.4)",
        borderColor: "rgba(113, 205, 205, 1)",
        borderWidth: 2,
        data: Object.values(productCounts).slice(0, 5),
        indexAxis: "y",
        label: "Sold",
      },
    ],
  };
</script>

<header>
  <h1><a href="/admin/portal">Admin</a> / Overview</h1>
</header>

<!-- Order Summary -->
<article>
  <header><h3>Order Summary</h3></header>
  <main class="grid">
    <section class="kpis">
      <h4 id="grandtotal">
        {formatPrice(grandTotal)}<br />
        <span>Total Sales</span>
      </h4>
      <h4 id="ordertotal">
        {orderCount}<br />
        <span>Total Orders</span>
      </h4>
      <h4 id="fulfilled">
        {fulfilledCount}<br />
        <span>Orders Fulfilled</span>
      </h4>
      <h4 id="processing">
        {orderCount - fulfilledCount}<br />
        <span>Orders Processing</span>
      </h4>
    </section>
    <section class="chart">
      <Doughnut
        data={orderChartData}
        options={{
          scales: {
            x: {
              display: false,
            },
            y: {
              display: false,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              font: {
                size: 20,
              },
              padding: {
                top: 10,
                bottom: 30,
              },
              text: `${Math.round(
                (100 * fulfilledCount) / orderCount
              )}% Fulfilled`,
            },
          },
        }}
      />
    </section>
  </main>
</article>

<!-- Product Summary -->
<article>
  <header><h3>Product Summary</h3></header>
  <!-- Shown on screens larger than 425px -->
  <section id="productchart" class="chart">
    <Bar
      data={productChartData}
      options={{
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            font: {
              size: 20,
            },
            padding: {
              top: 10,
              bottom: 30,
            },
            text: `Top 5 Products`,
          },
        },
      }}
    />
  </section>

  <main class="grid">
    <section class="kpis">
      <h4 id="grandtotal">
        {productCount}<br />
        <span>Products Sold</span>
      </h4>
      <h4 id="ordertotal">
        {Object.entries(productCounts).length}<br />
        <span>Products Available</span>
      </h4>
    </section>
    <section class="kpis">
      <h4 id="fulfilled">
        {Object.entries(productCounts).reduce(
          (count, product) => (product[1] > 0 ? count + 1 : count),
          0
        )}<br />
        <span>Unique Products Sold</span>
      </h4>
      <h4 id="processing">
        {Object.entries(productCounts).reduce(
          (count, product) => (product[1] == 0 ? count + 1 : count),
          0
        )}<br />
        <span>Products Not Sold</span>
      </h4>
    </section>
  </main>

  <!-- Shown on screens smaller than 425px -->
  <section id="producttable" class="chart">
    <h5>Top 5 Products</h5>
    <ul>
      {#each Object.keys(productCounts).slice(0, 5) as topProduct}
        <li>
          {topProduct.length < 30
            ? topProduct
            : topProduct.substring(0, 25) + "..."}<br />
          <strong style="color:rgba(113, 205, 205, 1)"
            >{productCounts[topProduct]} Sold</strong
          >
        </li>
      {/each}
    </ul>
  </section>
</article>

<style>
  main > * {
    margin: 1rem;
  }
  h3 {
    margin-bottom: 0;
  }
  .kpis {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  #grandtotal {
    --kpi-color: limegreen;
  }
  #ordertotal {
    --kpi-color: #4d5360;
  }
  #processing {
    --kpi-color: #fdb45c;
  }
  #fulfilled {
    --kpi-color: rgb(54, 162, 235);
  }
  h4 {
    border-left: 3px solid var(--kpi-color);
    border-radius: 3px;
    padding-left: 0.5rem;
  }
  h4 > span {
    color: var(--kpi-color);
    font-weight: 300;
    letter-spacing: 1px;
  }
  .chart {
    display: grid;
    place-items: center;
  }
  #producttable {
    display: block;
  }
  #producttable > ul > li {
    letter-spacing: 0.8px;
    margin-bottom: 1rem;
  }
  @media (max-width: 425px) {
    #productchart {
      display: none;
    }
  }
  @media (min-width: 425px) {
    #producttable {
      display: none;
    }
  }
</style>
