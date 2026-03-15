import express from "express";
import { Product } from "../models/Product.js";

export const productRouter = express.Router();

// GET /api/products
productRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ data: products });
  } catch {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// GET /api/products/:id
productRouter.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ data: product });
  } catch {
    res.status(400).json({ error: "Invalid product id" });
  }
});

