import db from "$lib/server/db";

const collection = db.collection(process.env.COLLECTION);

export const load = async () => {
  const products = await collection.find().toArray();

  return {
    products: products.map((product) => ({
      _id: product._id.str,
      hello: product.hello,
    })),
  };
};

export const actions = {
  addToOrder: () => console.log("Added to order"),
};
