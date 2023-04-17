import { dev } from "$app/environment";
import { env } from "$env/dynamic/public";

/* Format a price from float to dollars: 5.4 -> $5.40 */
export function formatPrice(price) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

/* Get the image URL for a "CloudFlare Images" image ID & variant */
export function formatImage(imageId, variant = "public") {
  return `https://imagedelivery.net/${env.PUBLIC_ACCOUNT_HASH}/${imageId}/${variant}`;
}

/* Retrieve the cart Object from browser cookies */
export function getCart(cookies) {
  return JSON.parse(cookies.get("cart") ?? "[]");
}

/* Save the cart Object in browser cookies */
export function setCart(cart, cookies, maxAge = 60 * 60 * 24 * 7) {
  cookies.set("cart", JSON.stringify(cart), {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: !dev,
    maxAge, // 1 week by default
  });
}
