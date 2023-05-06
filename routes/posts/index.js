import express from "express";
import { roles } from "../../constants/index.js";
import validation from "../../middleware/validation/index.js";
import authorize from "../../middleware/authorize/index.js";
import permissions from "../../middleware/permissions/index.js";
import postSchema from "../../schemas/posts/index.js";
import likeSchema from "../../schemas/posts/like/index.js";
import createPost from "../../controllers/posts/create/index.js";
import updatePost from "../../controllers/posts/update/index.js";
import deletePost from "../../controllers/posts/delete/index.js";
import likePost from "../../controllers/posts/like/index.js";
import getPosts from "../../controllers/posts/get/index.js";

const router = express.Router();
const { moderator, admin, user } = roles;

router.put(
  "/:id/like",
  authorize,
  permissions([user]),
  validation(likeSchema.paramsSchema, "params"),
  likePost
);

router
  .route("/:id")
  .put(
    authorize,
    permissions([moderator, admin]),
    validation(postSchema.updateSchema, "body"),
    validation(postSchema.paramsSchema, "params"),
    updatePost
  )
  .delete(
    authorize,
    permissions([moderator, admin]),
    validation(postSchema.paramsSchema, "params"),
    deletePost
  );

router
  .route("/")
  .get(
    authorize,
    permissions([moderator, admin, user]),
    validation(postSchema.getSchema, "query"),
    getPosts
  )
  .post(
    authorize,
    permissions([moderator, admin]),
    validation(postSchema.createSchema, "body"),
    createPost
  );

export default router;
