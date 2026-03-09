import express from "express";
import { getReview, postReview } from "../Controllers/review.js";
import upload from "../MiddleWare/multer.js";
import { authUser } from "../MiddleWare/authUser.js";

const reviewRouter = express.Router();

reviewRouter.get("/:businessId", getReview);
reviewRouter.post(
  "/postreview/:businessId",
  authUser,
  upload.array("images", 3),
  postReview
);

export { reviewRouter };
