import mongoose, { Types } from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  BusinessID: { type: Types.ObjectId, ref: "Business", required: true },
  subscription: {
    subscriptionType: {
      type: String,
      enum: ["Free", "Premium", "Pro"],
      default: "Free",
    },
    duration: {
      type: Number,
      enum: [30, 180, 365, 730],
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["active", "expired"],
      default: "active",
    },
    paymentReference: {
      type: String,
    },
  },
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);
export { Subscription };
