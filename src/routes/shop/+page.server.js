import db from "$lib/server/db";

export const load = async () => {

  const products = await db.collection("products").find().toArray();

  return { products };
};

export const actions = {

  addToOrder: () => console.log("Added to order");

};