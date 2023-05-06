import express from "express";
import { roles } from "../constants/index.js";

import validation from "../middleware/validation/index.js";
import authorize from "../middleware/authorize/index.js";
import permissions from "../middleware/permissions/index.js";

import postSchema from "../schemas/posts/index.js";
import userSchema from "../schemas/user/index.js";
import loginSchema from "../schemas/login/index.js";

import registration from "../controllers/registration/index.js";
import login from "../controllers/login/index.js";
import { valid } from "joi";

const router = express.Router();
const { moderator, admin, user } = roles;

router.put("/posts/:id/like", authorize, permissions([user]), () => {});
router
  .route("/posts/:id")
  .put(
    authorize,
    permissions([moderator, admin]),
    validation(postSchema.updateSchema, "body"),
    validation(postSchema.paramsSchema, "params"),
    () => {}
  )
  .delete(
    authorize,
    permissions([moderator, admin]),
    validation(postSchema.paramsSchema, "params"),
    () => {}
  );
router
  .route("/posts")
  .get(authorize, permissions([moderator, admin, user]), () => {})
  .post(
    authorize,
    permissions([moderator, admin]),
    validation(postSchema.createSchema, "body"),
    () => {}
  );

// --------------------------------------------------------------------------------------------------

router.post(
  "/users/registration",
  validation(userSchema.createSchema, "body"),
  registration
);
router.post("/users/login", validation(loginSchema, "body"), login);

router
  .route("/users/:id")
  .put(
    authorize,
    permissions([admin]),
    validation(userSchema.updateSchema, "body"),
    valid(userSchema.paramsSchema, "params"),
    () => {}
  )
  .delete(
    authorize,
    permissions([admin]),
    validation(userSchema.paramsSchema, "params"),
    () => {}
  );
router
  .route("/users")
  .get(authorize, permissions([admin]), () => {})
  .post(
    authorize,
    permissions([admin]),
    validation(userSchema.createSchema, "body"),
    registration
  );

export default router;
