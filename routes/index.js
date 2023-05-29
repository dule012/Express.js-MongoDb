import express from "express";
import postsRouter from "./posts/index.js";
import usersRouter from "./users/index.js";
import networkRouter from "./networks/index.js";

const router = express.Router();

router.use("/posts", postsRouter);
router.use("/users", usersRouter);
router.use("/networks", networkRouter);

export default router;
