import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js";
dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .catch(() => console.log("Error connecting to db"));

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONT_URL],
  })
);
app.options("*", cors());
app.use(helmet());

app.use("/api", router);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ error: true, message: "Something went wrong." });
});

app.listen(process.env.PORT, () =>
  console.log(`Server listening at localhost:${process.env.PORT}`)
);
