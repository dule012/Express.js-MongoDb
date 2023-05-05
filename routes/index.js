import express from "express";

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

router
  .route("/users/:id")
  .put(() => {})
  .delete(() => {});
router
  .route("/users")
  .get(() => {})
  .post(() => {});

export default router;
