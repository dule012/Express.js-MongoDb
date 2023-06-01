import express from "express";
import { roles } from "../../constants/index.js";
import validation from "../../middleware/validation/index.js";
import authorize from "../../middleware/authorize/index.js";
import permissions from "../../middleware/permissions/index.js";
import usersSchema from "../../schemas/users/index.js";
import loginSchema from "../../schemas/login/index.js";
import registration from "../../controllers/registration/index.js";
import login from "../../controllers/login/index.js";
import createUser from "../../controllers/users/create/index.js";
import updateUser from "../../controllers/users/update/index.js";
import deleteUser from "../../controllers/users/delete/index.js";
import getUsers from "../../controllers/users/get/index.js";

const router = express.Router();
const { admin } = roles;

router.post(
  "/registration",
  validation(usersSchema.createSchema, "body"),
  registration
);

router.post("/login", validation(loginSchema, "body"), login);

router
  .route("/:id")
  .put(
    authorize,
    permissions([admin]),
    validation(usersSchema.paramsSchema, "params"),
    validation(usersSchema.updateSchema, "body"),
    updateUser
  )
  .delete(
    authorize,
    permissions([admin]),
    validation(usersSchema.paramsSchema, "params"),
    deleteUser
  );

router
  .route("/")
  .get(
    authorize,
    permissions([admin]),
    validation(usersSchema.querySchema, "query"),
    getUsers
  )
  .post(
    authorize,
    permissions([admin]),
    validation(usersSchema.createSchema, "body"),
    createUser
  );

export default router;
