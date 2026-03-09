import mongoose, { Types } from "mongoose";

const ReviewSchema = new mongoose.Schema({
  userID: { type: Types.ObjectId, ref: "User", required: true },
  BusinessID: { type: Types.ObjectId, ref: "Business", required: true },
  rating: { type: Number, min: 1, max: 5 },
  comment: [{ type: String }],
  photos: [{ type: String }],
});

const Review = mongoose.model("Reveiw", ReviewSchema);
export { Review };
