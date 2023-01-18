import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL);
await client.connect();

console.log("Connected to MongoDB 🎉");

export default client.db(process.env.DATABASE);
