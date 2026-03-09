import express from "express";
import {
  deleteBusiness,
  getAllBusiness,
  getBusiness,
  registerBusinness,
  updateBusiness,
} from "../Controllers/businnessControrollers.js";
import { authUser } from "../MiddleWare/authUser.js";
import upload from "../MiddleWare/multer.js";

const businessRoute = express.Router();

// ROUTES

businessRoute.post(
  "/register",
  authUser,
  upload.array("photos", 4),
  registerBusinness
);
businessRoute.get("/businesses", getAllBusiness);
businessRoute.get("/business/:id", getBusiness);
businessRoute.delete("/delete/:id", authUser, deleteBusiness); // not final
businessRoute.put("/update/:id", authUser, updateBusiness); // not final

export { businessRoute };
