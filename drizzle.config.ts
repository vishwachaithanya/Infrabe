import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

  

export default defineConfig({
  schema: "./models/index.ts",
  out: "./drizzle",
  dialect: "mysql",
    dbCredentials: {
        // Instead of 'url', we use the explicit fields
        host: String(process.env.DB_HOST),
        port: Number(process.env.DB_PORT),
        user: String(process.env.DB_USER),
        password: String(process.env.DB_PASSWORD),
        database: String(process.env.DB_NAME),
        ssl: {
    rejectUnauthorized: false,
  },
  },
});