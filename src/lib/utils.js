export function formatPrice(price) {
  const options = {
    style: "currency",
    currency: "USD",
  };

  return Intl.NumberFormat("en-US", options).format(price);
}

export function getCart(cookies) {
  console.log("🍪 Getting cart cookie...");

  const cart = JSON.parse(cookies.get("cart") ?? "[]");

  return cart;
}

export function setCart(cart, cookies) {
  console.log("🍪 Setting cart cookie...");

  cookies.set("cart", JSON.stringify(cart), {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

export function generateToken(user) {
  console.log("🔒 Generating token...");

  const userInfo = {
    id: user.id,
    name: user.firstname,
    email: user.email,
    role: user.role,
  };

  const jwtUser = jwt.sign(userInfo, JWT_ACCESS_SECRET, {
    expiresIn: 60 * 60 * 24 * 7, // 1 week
  });

  console.log(`🔒 Token generated for ${userInfo.name}`);

  return jwtUser;
}
