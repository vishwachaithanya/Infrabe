import express, { type Express } from "express";
import cors from "cors";
import router from "./routes"; // This will point to routes/index.ts

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// All routes are prefixed with /api
app.use("/api", router);

export default app;