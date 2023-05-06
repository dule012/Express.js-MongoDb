import express from "express";
import postsRouter from "./posts/index.js";
import usersRouter from "./users/index.js";

const router = express.Router();

router.use("/posts", postsRouter);
router.use("/users", usersRouter);

export default router;
