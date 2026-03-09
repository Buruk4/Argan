import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cloudinaryConfig from "./config/cloudinary.js";
import authRoute from "./routers/authRoute.js";
import { businessRoute } from "./routers/businessRoute.js";
import { userRoutes } from "./routers/userRoute.js";
import { reviewRouter } from "./routers/review.js";

dotenv.config();

//creating jwt secret

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
cloudinaryConfig();

const port = process.env.PORT;
app.get("/", (req, res) => {
  res.send(`Server is running on port ${port}`);
});

app.use("/api/v1/auth", authRoute);

// user route
app.use("/api/v1/user", userRoutes);

app.use("/api/v1/bus", businessRoute);

app.use("/api/v1/review", reviewRouter);

app.listen(port, (req, res) => {
  console.log(`listening at ${port}`);
});
