import db from "$lib/server/db";

const collection = db.collection(process.env.COLLECTION);

export const load = async () => {
  const documents = await collection.find().toArray();
  return {
    products: documents.map((document) => ({
      id: document._id.str,
      name: document.name,
      src: document.src,
    })),
  };
};

export const actions = {
  addproduct: async ({ request }) => {
    const data = await request.formData();
    const name = data.get("name");
    const file = data.get("file");

    // Convert file to Data URL
    const str = Buffer.from(await file.arrayBuffer()).toString("base64");
    const src = `data:${file.type};base64,${str}`;

    await collection.insertOne({ name, src });

    return { success: true };
  },
};
