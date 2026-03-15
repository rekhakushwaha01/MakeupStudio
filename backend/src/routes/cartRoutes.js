import express from "express";
import { Cart } from "../models/Cart.js";

export const cartRouter = express.Router();

// Helper to get or create a cart for a user
async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }
  return cart;
}

// GET /api/cart/:userId
cartRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await getOrCreateCart(userId);
    const subtotal = cart.items.reduce(
      (sum, item) => sum + (item.price || 0) * item.quantity,
      0
    );
    res.json({ data: { userId, items: cart.items, subtotal } });
  } catch (err) {
    console.error("Error loading cart", err);
    res.status(500).json({ error: "Failed to load cart" });
  }
});

// POST /api/cart/:userId/items  { productId, name, price, quantity }
cartRouter.post("/:userId/items", async (req, res) => {
  const { userId } = req.params;
  const { productId, name, price, quantity } = req.body;
  if (!productId || !quantity) {
    return res.status(400).json({ error: "productId and quantity are required" });
  }
  try {
    const cart = await getOrCreateCart(userId);
    const existing = cart.items.find((i) => i.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ productId, name, price, quantity });
    }
    await cart.save();
    console.log(`[Cart] User ${userId} added ${quantity} x ${name || productId}`);
    res.status(201).json({ message: "Item added to cart" });
  } catch (err) {
    console.error("Error adding to cart", err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

// PATCH /api/cart/:userId/items/:productId  { quantity }
cartRouter.patch("/:userId/items/:productId", async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await getOrCreateCart(userId);
    const item = cart.items.find((i) => i.productId === productId);
    if (!item) return res.status(404).json({ error: "Item not in cart" });
    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.productId !== productId);
    } else {
      item.quantity = quantity;
    }
    await cart.save();
    console.log(`[Cart] User ${userId} updated ${productId} to qty ${quantity}`);
    res.json({ message: "Cart updated" });
  } catch (err) {
    console.error("Error updating cart", err);
    res.status(500).json({ error: "Failed to update cart" });
  }
});

// DELETE /api/cart/:userId/items/:productId
cartRouter.delete("/:userId/items/:productId", async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const cart = await getOrCreateCart(userId);
    cart.items = cart.items.filter((i) => i.productId !== productId);
    await cart.save();
    console.log(`[Cart] User ${userId} removed ${productId}`);
    res.json({ message: "Item removed" });
  } catch (err) {
    console.error("Error removing from cart", err);
    res.status(500).json({ error: "Failed to remove item" });
  }
});

