import { MongoClient } from "mongodb";

const client = MongoClient(process.env.MONGO_URL);

await client.connect();

export default client.db("veroshop");