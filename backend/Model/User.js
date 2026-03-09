import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    profileImg: { type: String },
    favoriteBussiness: [{ type: Types.ObjectId, ref: "Bussiness" }],
    reviewedBusinesses: [{ type: Types.ObjectId, ref: "Bussiness" }],
    verified: { type: Boolean, default: false },
    userType: {
      type: String,
      enum: ["user", "business"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export { User };
