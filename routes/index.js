import express from "express";
import validation from "../middleware/validation/index.js";
import userSchema from "../schemas/user/index.js";
import registration from "../controllers/registration/index.js";

const router = express.Router();

router.put("/posts/:id/like", () => {});
router
  .route("/posts/:id")
  .put(() => {})
  .delete(() => {});
router
  .route("/posts")
  .get((req, res) => res.json({ name: "Ok" }))
  .post();

// --------------------------------------------------------------------------------------------------

router.post(
  "/users/registration",
  validation(userSchema.createSchema, "body"),
  registration
);
router
  .route("/users/:id")
  .put(() => {})
  .delete(() => {});
router
  .route("/users")
  .get(() => {})
  .post(() => {});

export default router;
