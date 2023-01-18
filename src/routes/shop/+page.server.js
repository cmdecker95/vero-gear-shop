import db from "$lib/server/db";

const collection = db.collection(process.env.COLLECTION);

export const load = async () => {
  const documents = await collection.find().toArray();
  console.log(documents);
  return {
    products: documents.map((document) => ({
      id: document._id.str,
      name: document.name,
      src: document.src,
    })),
  };
};

export const actions = {
  addToOrder: () => console.log("Added to order"),
};
