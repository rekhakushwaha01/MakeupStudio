import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["Skincare", "Haircare", "Makeup", "Beauty tools"],
      required: true,
    },
    description: String,
    price: { type: Number, required: true },
    imageUrl: String,
    stockQty: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);

