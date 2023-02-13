<script>
  import { enhance } from "$app/forms";
  import Error from "$lib/components/Error.svelte";
  import StatePicker from "$lib/components/StatePicker.svelte";
  import { formatImage, formatPrice } from "$lib/utils";

  export let form;
  export let data;
  const { cart, subtotal } = data;

  let first, last, phone, address1, address2, city, state, zip;

  let donating = false;
  let shipping = false;

  $: total = subtotal * 1.1 + (donating ? 10 : 0) + (shipping ? 5 : 0);
</script>

<header>
  <h1>Checkout</h1>
</header>

<article>
  <section id="order-confirmation">
    <h3>Confirm Your Order</h3>
    <fieldset id="options">
      <h5>Quick questions for you!</h5>
      <label>
        <input
          type="checkbox"
          role="switch"
          name="donating"
          bind:checked={donating}
        />
        🕊️ I would like to donate to the current VERO students
      </label>
      <label>
        <input
          type="checkbox"
          role="switch"
          name="shipping"
          bind:checked={shipping}
        />
        🚚 I would like my order shipped
      </label>
    </fieldset>
    <figure>
      <table role="grid">
        <colgroup>
          <col width="20%" />
          <col width="70%" />
          <col width="10%" />
        </colgroup>
        <tbody>
          {#each cart as cartItem (cartItem.cartId)}
            <tr>
              <td>
                <img
                  src={formatImage(cartItem.image, "thumbnail")}
                  alt={cartItem.name}
                />
              </td>
              <td colspan="2">
                <strong>{cartItem.name}</strong><br />
                <strong>
                  {formatPrice(cartItem.price * cartItem.qty)}
                </strong><br />
                Color: {cartItem.color}<br />
                Size: {cartItem.size}<br />
              </td>
            </tr>
          {/each}
        </tbody>
        <tfoot>
          <tr>
            <td />
            <td class="pricing">
              Subtotal<br />
              Tax<br />
              {#if donating}
                🕊️ Donation<br />
              {/if}
              {#if shipping}
                🚚 Shipping<br />
              {/if}
              <strong>Total</strong>
            </td>
            <td class="pricing">
              {formatPrice(subtotal)}<br />
              {formatPrice(subtotal * 0.1)}<br />
              {#if donating}
                {formatPrice(10)}
              {/if}
              {#if shipping}
                {formatPrice(5)}
              {/if}
              <strong>{formatPrice(total)}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </figure>
  </section>
  {#if shipping}
    <section id="shipping-address">
      <h3>Shipping Address</h3>
      {#if form?.error}
        <Error message={form.error} />
      {/if}
      <div class="grid">
        <fieldset id="recipient">
          <label>
            First name
            <input bind:value={first} type="text" name="first" required />
          </label>
          <label>
            Last name
            <input bind:value={last} type="text" name="last" required />
          </label>
          <label>
            Phone number (optional)
            <input bind:value={phone} type="number" name="phone" />
          </label>
        </fieldset>
        <fieldset id="address">
          <label>
            Address line 1
            <input bind:value={address1} type="text" name="address1" required />
          </label>
          <label>
            Address line 2 (optional)
            <input bind:value={address2} type="text" name="address2" />
          </label>
          <label>
            City
            <input bind:value={city} type="text" name="city" required />
          </label>
          <div class="form-row">
            <label style="flex:1" for="state">
              State
              <StatePicker bind:state />
            </label>
            <label
              >ZIP<input
                bind:value={zip}
                type="number"
                name="zip"
                required
              /></label
            >
          </div>
        </fieldset>
      </div>
    </section>
  {/if}
  <footer>
    <form method="POST" use:enhance>
      <input type="hidden" name="first" bind:value={first} />
      <input type="hidden" name="last" bind:value={last} />
      <input type="hidden" name="phone" bind:value={phone} />
      <input type="hidden" name="address1" bind:value={address1} />
      <input type="hidden" name="address2" bind:value={address2} />
      <input type="hidden" name="city" bind:value={city} />
      <input type="hidden" name="state" bind:value={state} />
      <input type="hidden" name="zip" bind:value={zip} />
      <input type="hidden" name="donating" bind:value={donating} />
      <input type="hidden" name="shipping" bind:value={shipping} />
      <input type="hidden" name="total" bind:value={total} />
      <input class="contrast" type="submit" />
    </form>
  </footer>
</article>

<style>
  #options {
    border: 1px dashed var(--secondary);
    border-radius: 5px;
    margin-bottom: 2rem;
    padding: 1rem;
  }
  table {
    width: 100%;
  }
  td {
    padding-inline: 1rem;
  }
  img {
    max-width: 100px;
    min-width: 75px;
  }
  .form-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100%;
  }
  .pricing {
    text-align: right;
  }
  form,
  form > input {
    margin-bottom: 0;
  }
</style>
