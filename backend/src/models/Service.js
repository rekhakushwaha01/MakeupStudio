import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    url: String,
    type: { type: String, enum: ["image", "video"], default: "image" },
  },
  { _id: false }
);

const reviewSchema = new mongoose.Schema(
  {
    userName: String,
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
  },
  { _id: false }
);

const serviceSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["Hair", "Skin", "Makeup", "Nail", "Spa"],
      required: true,
    },
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    durationMinutes: { type: Number, required: true },
    demoImages: [mediaSchema],
    demoVideos: [mediaSchema],
    beforeAfterImages: [mediaSchema],
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

export const Service = mongoose.model("Service", serviceSchema);

