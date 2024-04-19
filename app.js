import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { bookRouter } from "./routes/book.route.js";
import { userRouter } from "./routes/user.route.js";
import multer from "multer";
import cors from "cors";
import { sequelize } from "./database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const corsOptions = "http://localhost:3000";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Table created successfully.");
  } catch (error) {
    console.error("Error syncing table:", error);
  }
}
syncDatabase();
app.use(cors(corsOptions));
app.use(express.json());
app.use(multer({ storage: storage }).single("image"));
app.use(express.static(path.join(__dirname, "images")));
app.use(bookRouter);
app.use(userRouter);

app.listen(3000);
