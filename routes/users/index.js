import express from "express";
import { roles } from "../../constants/index.js";
import validation from "../../middleware/validation/index.js";
import authorize from "../../middleware/authorize/index.js";
import permissions from "../../middleware/permissions/index.js";
import userSchema from "../../schemas/user/index.js";
import loginSchema from "../../schemas/login/index.js";
import registration from "../../controllers/registration/index.js";
import login from "../../controllers/login/index.js";
import createUser from "../../controllers/users/create/index.js";

const router = express.Router();
const { admin } = roles;

router.post(
  "/registration",
  validation(userSchema.createSchema, "body"),
  registration
);

router.post("/login", validation(loginSchema, "body"), login);

router
  .route("/:id")
  .put(
    authorize,
    permissions([admin]),
    validation(userSchema.updateSchema, "body"),
    validation(userSchema.paramsSchema, "params"),
    () => {}
  )
  .delete(
    authorize,
    permissions([admin]),
    validation(userSchema.paramsSchema, "params"),
    () => {}
  );

router
  .route("/")
  .get(authorize, permissions([admin]), () => {})
  .post(
    authorize,
    permissions([admin]),
    validation(userSchema.createSchema, "body"),
    createUser
  );

export default router;
