import express from "express";
import { roles } from "../../constants/index.js";
import validation from "../../middleware/validation/index.js";
import authorize from "../../middleware/authorize/index.js";
import permissions from "../../middleware/permissions/index.js";
import networksSchema from "../../schemas/networks/index.js";
import getNetworks from "../../controllers/networks/get/index.js";
import createNetwork from "../../controllers/networks/create/index.js";
import updateNetwork from "../../controllers/networks/update/index.js";
import deleteNetwork from "../../controllers/networks/delete/index.js";

const router = express.Router();
const { admin } = roles;

router
  .route("/:id")
  .put(
    authorize,
    permissions([admin]),
    validation(networksSchema.paramsSchema, "params"),
    validation(networksSchema.updateSchema, "body"),
    updateNetwork
  )
  .delete(
    authorize,
    permissions([admin]),
    validation(networksSchema.paramsSchema, "params"),
    deleteNetwork
  );

router
  .route("/")
  .get(
    authorize,
    permissions([admin]),
    validation(networksSchema.querySchema, "query"),
    getNetworks
  )
  .post(
    authorize,
    permissions([admin]),
    validation(networksSchema.createSchema, "body"),
    createNetwork
  );

export default router;
