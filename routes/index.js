import express from "express";
import postsRouter from "./posts/index.js";
import usersRouter from "./users/index.js";
import networksRouter from "./networks/index.js";
import tagsRouter from "./tags/index.js";

const router = express.Router();

router.use("/posts", postsRouter);
router.use("/users", usersRouter);
router.use("/networks", networksRouter);
router.use("/tags", tagsRouter);

export default router;
