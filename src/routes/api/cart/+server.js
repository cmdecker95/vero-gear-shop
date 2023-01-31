import { json } from "@sveltejs/kit";

const setCartCookie = (cart, cookies) => {
  cookies.set("cart", JSON.stringify(cart), {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  const newCart = cookies.get("cart");
  console.log(`🛒 new cart (${JSON.parse(newCart).length}): ${newCart}`);
};

export const GET = async ({ cookies }) => {
  const cartString = cookies.get("cart") ?? "[]";
  const cartParsed = JSON.parse(cartString);

  return json(cartParsed);
};

export const POST = async ({ request, cookies }) => {
  const data = await request.json();
  const item = { ...data, cartId: crypto.randomUUID() };

  const cartString = cookies.get("cart") ?? "[]";
  const cartParsed = JSON.parse(cartString);

  let duplicateItem = false;
  for (let cartItem of cartParsed) {
    if (
      cartItem.id === item.id &&
      cartItem.color === item.color &&
      cartItem.size === item.size
    ) {
      duplicateItem = true;
      cartItem.qty += item.qty;
    }
  }

  const cart = duplicateItem ? cartParsed : [...cartParsed, item];

  setCartCookie(cart, cookies);
  return json(cart);
};

export const PUT = async ({ request, cookies }) => {
  const item = await request.json();

  const cartString = cookies.get("cart") ?? "[]";
  const cartParsed = JSON.parse(cartString);
  const cartBefore = cartParsed.filter(
    (cartItem) => cartItem.cartId !== item.cartId
  );

  let duplicateItem = false;
  for (let cartItem of cartParsed) {
    if (
      cartItem.id === item.id &&
      cartItem.color === item.color &&
      cartItem.size === item.size
    ) {
      duplicateItem = true;
      cartItem.qty = item.qty;
    }
  }

  const cart = duplicateItem ? cartBefore : [...cartBefore, item];

  setCartCookie(cart, cookies);
  return json(cart);
};

export const DELETE = async ({ request, cookies }) => {
  const { cartId } = await request.json();

  const cartString = cookies.get("cart") ?? "[]";
  const cartParsed = JSON.parse(cartString);
  const cart = cartParsed.filter((cartItem) => cartItem.cartId !== cartId);

  setCartCookie(cart, cookies);
  return json(cart);
};
