import express from "express";
import { register, login } from "../Controllers/authentication.js";

const authRoute = express.Router();
// user routes

authRoute.post("/register", register);
authRoute.post("/login", login);

export default authRoute;
