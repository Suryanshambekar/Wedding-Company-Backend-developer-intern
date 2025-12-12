import { MongoClient } from "mongodb";
import { env } from "../config/env.js";

const client = new MongoClient(env.mongoUri);

export async function connectMongo() {
  if (!client.topology?.isConnected()) {
    await client.connect();
  }
  return { client, master: client.db(env.masterDb) };
}

