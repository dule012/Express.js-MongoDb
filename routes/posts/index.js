import express from "express";
import { roles } from "../../constants/index.js";
import validation from "../../middleware/validation/index.js";
import authorize from "../../middleware/authorize/index.js";
import permissions from "../../middleware/permissions/index.js";
import postSchema from "../../schemas/post/index.js";
import likeSchema from "../../schemas/post/like/index.js";
import createPost from "../../controllers/posts/create/index.js.js.js";
import updatePost from "../../controllers/posts/update/index.js";
import deletePost from "../../controllers/posts/delete/index.js.js.js";
import likePost from "../../controllers/posts/like/index.js.js.js";
import getPosts from "../../controllers/posts/get/index.js.js.js";

const router = express.Router();
const { admin, user } = roles;

router.put(
  "/like/:id",
  authorize,
  permissions([user]),
  validation(likeSchema.paramsSchema, "params"),
  likePost
);

router
  .route("/:id")
  .put(
    authorize,
    permissions([admin]),
    validation(postSchema.updateSchema, "body"),
    validation(postSchema.paramsSchema, "params"),
    updatePost
  )
  .delete(
    authorize,
    permissions([admin]),
    validation(postSchema.paramsSchema, "params"),
    deletePost
  );

router
  .route("/")
  .get(
    authorize,
    permissions([admin, user]),
    validation(postSchema.querySchema, "query"),
    getPosts
  )
  .post(
    authorize,
    permissions([admin]),
    validation(postSchema.createSchema, "body"),
    createPost
  );

export default router;
