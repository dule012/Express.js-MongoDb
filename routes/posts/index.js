import express from "express";
import { roles } from "../../constants/index.js";
import validation from "../../middleware/validation/index.js";
import authorize from "../../middleware/authorize/index.js";
import permissions from "../../middleware/permissions/index.js";
import postsSchema from "../../schemas/posts/index.js";
import likeSchema from "../../schemas/posts/like/index.js";
import createPost from "../../controllers/posts/create/index.js";
import updatePost from "../../controllers/posts/update/index.js";
import deletePost from "../../controllers/posts/delete/index.js";
import likePost from "../../controllers/posts/like/index.js";
import getPosts from "../../controllers/posts/get/index.js";

const router = express.Router();
const { admin, user } = roles;

router.post(
  "/like/:postId",
  authorize,
  permissions([user]),
  validation(likeSchema.paramsSchema, "params"),
  likePost
);

router
  .route("/:postId")
  .put(
    authorize,
    permissions([admin]),
    validation(postsSchema.paramsSchema, "params"),
    validation(postsSchema.updateSchema, "body"),
    updatePost
  )
  .delete(
    authorize,
    permissions([admin]),
    validation(postsSchema.paramsSchema, "params"),
    deletePost
  );

router
  .route("/")
  .get(
    authorize,
    permissions([admin, user]),
    validation(postsSchema.querySchema, "query"),
    getPosts
  )
  .post(
    authorize,
    permissions([user, admin]),
    validation(postsSchema.createSchema, "body"),
    createPost
  );

export default router;
