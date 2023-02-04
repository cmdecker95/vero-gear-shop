export async function load({ locals }) {
  const title = "Orders";
  const user = locals.user;

  return { title, user };
}
