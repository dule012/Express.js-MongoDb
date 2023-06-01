import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import cluster from "cluster";
import os from "os";
import fs from "fs";
import { execSync } from "child_process";
import spdy from "spdy";
import router from "./routes/index.js";
import "./utils/logger/index.js";
import { response } from "./utils/common/index.js";
dotenv.config();

const key = "./certs/server.key";
const certificate = "./certs/server.cert";

if (cluster.isMaster) {
  if (!fs.existsSync("./certs")) fs.mkdirSync("./certs");

  if (!fs.existsSync(key) || !fs.existsSync(certificate)) {
    execSync(
      'openssl req  -nodes -new -x509  \
    -keyout ./certs/server.key \
    -out ./certs/server.cert \
    -subj "/C=US/ST=State/L=City/O=company/OU=Com/CN=www.testserver.local"'
    );
  }

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

    response(res, { status: 500, message: "Something went wrong." });
  });

  const server =
    process.env.SCHEMA === "https" && process.env.HOST
      ? spdy.createServer(
          {
            key: fs.readFileSync(key),
            cert: fs.readFileSync(certificate),
          },
          app
        )
      : app;

  server.listen(
    { port: process.env.PORT, host: process.env.HOST || "localhost" },
    () =>
      logger.info(
        `Server listening at ${process.env.SCHEMA || "http"}://${
          process.env.HOST || "localhost"
        }:${process.env.PORT}`
      )
  );
}
