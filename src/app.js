import express from "express";
import "dotenv/config.js";
import client from "./config/database.js";
import fileUpload from "express-fileupload";
import Routes from "./routes/routes.js";
import AuthMiddleware from "./middleware/auth.middleware.js";
import { uploadFile } from "./controllers/auth.controller.js";

const app = express();
app.use(fileUpload());

app.post("/upload", uploadFile);

app.use(
  fileUpload({
    limits: { filesize: 1 * 1024 * 1024 },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(AuthMiddleware);
app.use("/api", Routes());

const PORT = process.env.PORT || 8080;

const initApp = async () => {
  try {
    await client.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `);
    console.log("Database is connected");
    app.listen(PORT, () => {
      console.log("Server is running on", PORT);
    });
  } catch (error) {
    console.error(error.message);
  }
};

initApp();
