import { dev } from "$app/environment";
import { PUBLIC_CF_IMAGES_URL } from "$env/static/public";

export function formatPrice(price) {
  const options = {
    style: "currency",
    currency: "USD",
  };

  const formattedPrice = Intl.NumberFormat("en-US", options).format(price);

  return formattedPrice;
}

export function formatImage(imageId, variant = "public") {
  const formattedImage = `${PUBLIC_CF_IMAGES_URL}/${imageId}/${variant}`;

  return formattedImage;
}

export function getCart(cookies) {
  console.log("🍪 Getting cart cookie...");

  const cart = JSON.parse(cookies.get("cart") ?? "[]");

  return cart;
}

export function setCart(cart, cookies, maxAge = 60 * 60 * 24 * 7) {
  console.log("🍪 Setting cart cookie...");

  cookies.set("cart", JSON.stringify(cart), {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: !dev,
    maxAge, // 1 week by default
  });
}
