import { json } from "@sveltejs/kit";
import { getCart, setCart } from "$lib/utils";

export async function GET({ cookies }) {
  console.log("🛒 Getting cart items...");

  const cart = getCart(cookies);

  console.log(`🛒 Cart (${cart.length} items)`);
  cart.forEach((cartItem, i) => console.log(`🛒 Item ${i + 1}`, cartItem));

  return json(cart);
}

export async function POST({ request, cookies }) {
  const { id, price, color, size, qty } = await request
    .json()
    .catch((e) => console.log(e));
  const cartId = encodeURIComponent(`${id}:${color}:${size}`);
  console.log(cartId);
  const newItem = {
    id,
    price,
    color,
    size,
    qty,
    cartId,
  };

  console.log("🛒 Adding new cart item:", newItem);

  let cart = getCart(cookies);
  let duplicateItem = false;

  // If the item is already in the cart, just add to the quantity
  for (let cartItem of cart) {
    if (cartItem.cartId === newItem.cartId) {
      cartItem.qty += newItem.qty;
      duplicateItem = true;
    }
  }

  // Else, add the item normally
  cart = duplicateItem ? cart : [...cart, newItem];

  setCart(cart, cookies);
  return json(cart);
}

export async function PUT({ request, cookies }) {
  const { id, price, color, size, qty, oldCartId } = await request
    .json()
    .catch((e) => console.log(e));
  const cartId = encodeURIComponent(`${id}:${color}:${size}`);
  const changedItem = {
    id,
    price,
    color,
    size,
    qty,
    cartId,
  };

  console.log("🛒 Changing a cart item:", changedItem);

  let cart = getCart(cookies);

  // If the cartId changed, delete the old item and handle the new one
  if (cartId !== oldCartId) {
    cart = cart.filter((cartItem) => cartItem.cartId !== oldCartId);

    let duplicateItem = false;

    // If the item is already in the cart, just add to the quantity
    for (let cartItem of cart) {
      if (cartItem.cartId === cartId) {
        cartItem.qty += qty;
        duplicateItem = true;
      }
    }

    // Else, add the item normally
    cart = duplicateItem ? cart : [...cart, changedItem];
  }

  // If cartId stayed the same, overwrite the quantity
  else {
    for (let cartItem of cart) {
      if (cartItem.cartId === cartId) {
        cartItem.qty = qty;
      }
    }
  }

  setCart(cart, cookies);
  return json(cart);
}

export async function DELETE({ request, cookies }) {
  const { cartId } = await request.json();

  console.log("🛒 Deleting a cart item:", cartId);

  let cart = getCart(cookies);
  cart = cart.filter((cartItem) => cartItem.cartId !== cartId);

  setCart(cart, cookies);
  return json(cart);
}
