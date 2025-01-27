import dotenv from "dotenv";
import { MongoClient, Db } from "mongodb";

dotenv.config();
const db_cluster = process.env.DB_CLUSTER;
const db_name = process.env.DB_NAME;
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${db_username}:${db_password}@cluster0.c010z.mongodb.net/?retryWrites=true&w=majority&appName=${db_cluster}`; // Replace with your MongoDB URI

let client: MongoClient | null = null;
let db: Db | null = null;

let connectionPromise: Promise<Db> | null = null;

export const connectToDatabase = async (): Promise<Db> => {
  if (db) {
    console.log("Reusing existing database connection.");
    return db;
  }

  if (connectionPromise) {
    console.log("Connection in progress, waiting...");
    return connectionPromise;
  }

  try {
    console.log("Establishing new database connection...");
    connectionPromise = (async () => {
      client = new MongoClient(uri);
      await client.connect();
      db = client.db(db_name);
      console.log(`Connected to database: ${db_name}`);
      return db;
    })();
    return await connectionPromise;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    connectionPromise = null;
    throw error;
  }
};

export const closeConnection = async (): Promise<void> => {
  if (client) {
    await client.close();
    client = null;
    db = null;
    connectionPromise = null;
    console.log("MongoDB connection closed.");
  }
};