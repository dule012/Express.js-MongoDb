import express from "express";
import { roles } from "../../constants";
import validation from "../../middleware/validation/index.js";
import authorize from "../../middleware/authorize/index.js";
import permissions from "../../middleware/permissions/index.js";
import getTags from "../../controllers/tags/get/index.js";
import createTag from "../../controllers/tags/create/index.js";
import updateTag from "../../controllers/tags/update/index.js";
import deleteTag from "../../controllers/tags/delete/index.js";

const router = express.Router();
const { admin } = roles;

router
  .route("/:id")
  .put(authorize, permissions([admin]), updateTag)
  .delete(authorize, permissions([admin]), deleteTag);

router
  .route("/")
  .get(authorize, permissions([admin]), getTags)
  .post(authorize, permissions([admin]), createTag);

export default router;
