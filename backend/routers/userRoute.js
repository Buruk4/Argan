import express from "express";
import {
  addToFavorite,
  getUser,
  uploadProfilePic,
} from "../Controllers/userControllers.js";
import { authUser } from "../MiddleWare/authUser.js";
import upload from "../MiddleWare/multer.js";

const userRoutes = express.Router();
userRoutes.get("/:id", getUser);
userRoutes.post(
  "/upload-picture",
  authUser,
  upload.single("profileImg"),
  uploadProfilePic
);
userRoutes.put("/favorite/:businessId", authUser, addToFavorite);

export { userRoutes };
