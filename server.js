import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import usersRouter from "./src/Routes/user.routes.js";
import newsRouter from "./src/Routes/news.routes.js";
import {connectDB} from "./src/Config/db.js";

dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the latest News");
});

app.use('/api/users', usersRouter);
app.use('/api/news', newsRouter);

const server = app.listen(PORT, async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    console.log("Connected to database");
    console.log(`listening on http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
