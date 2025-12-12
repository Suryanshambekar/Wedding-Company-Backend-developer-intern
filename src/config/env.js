import dotenv from "dotenv";

dotenv.config();

export const env = {
  mongoUri: process.env.MONGO_URI,
  masterDb: process.env.MASTER_DB || "master_db",
  jwtSecret: process.env.JWT_SECRET || "devsecret",
  port: process.env.PORT || 3000,
};

