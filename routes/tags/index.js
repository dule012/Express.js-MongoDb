import express from "express";
import { roles } from "../../constants/index.js";
import validation from "../../middleware/validation/index.js";
import authorize from "../../middleware/authorize/index.js";
import permissions from "../../middleware/permissions/index.js";
import tagsSchema from "../../schemas/tags/index.js";
import getTags from "../../controllers/tags/get/index.js";
import createTag from "../../controllers/tags/create/index.js";
import updateTag from "../../controllers/tags/update/index.js";
import deleteTag from "../../controllers/tags/delete/index.js";

const router = express.Router();
const { admin } = roles;

router
  .route("/:id")
  .put(
    authorize,
    permissions([admin]),
    validation(tagsSchema.paramsSchema, "params"),
    validation(tagsSchema.updateSchema, "body"),
    updateTag
  )
  .delete(
    authorize,
    permissions([admin]),
    validation(tagsSchema.paramsSchema, "params"),
    deleteTag
  );

router
  .route("/")
  .get(
    authorize,
    permissions([admin]),
    validation(tagsSchema.querySchema, "query"),
    getTags
  )
  .post(
    authorize,
    permissions([admin]),
    validation(tagsSchema.createSchema, "body"),
    createTag
  );

export default router;
