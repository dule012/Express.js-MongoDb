import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import cluster from "cluster";
import os from "os";
import router from "./routes/index.js";
import "./utils/logger/index.js";
dotenv.config();

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", () => cluster.fork());
} else {
  mongoose
    .connect(process.env.MONGODB_URL)
    .catch(() => logger.error("Error connecting to MongoDB"));

  const app = express();

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
    logger.error(err.message);

    res.status(500).json({
      error: true,
      message: "Something went wrong.",
    });
  });

  app.listen(process.env.PORT, () =>
    logger.info(`Server listening at localhost:${process.env.PORT}`)
  );
}
