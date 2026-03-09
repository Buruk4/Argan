import mongoose, { Types } from "mongoose";

const BusinessSchema = new mongoose.Schema({
  ownerID: { type: Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    neighborhood: { type: String },
    city: { type: String },
    country: { type: String },
  },

  address: { type: String, required: true },

  contact: {
    phone: { type: String, required: true },
    email: { type: String },
    website: { type: String },
  },

  openingHours: [
    {
      day: {
        type: String,
        enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
      },
      opens: { type: String },
      closes: { type: String },
      closed: { type: Boolean, default: false },
    },
  ],

  rating: { type: Number, min: 1, max: 5 },
  photos: [{ type: String }],
  amenities: [{ type: String }],
});

// 2dsphere index for geospatial queries
BusinessSchema.index({ location: "2dsphere" });

const Business = mongoose.model("Business", BusinessSchema);
export { Business };
