import express from "express";
import { Cart } from "../models/Cart.js";
import { Order } from "../models/order.js";
import { Product } from "../models/Product.js";

export const orderRouter = express.Router();

// POST /api/checkout
orderRouter.post("/checkout", async (req, res) => {
  const { userId, customer, paymentMethod } = req.body;
  if (!userId || !customer) {
    return res
      .status(400)
      .json({ error: "userId and customer info are required for checkout" });
  }
  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Check stock and build order items
    const items = [];
    for (const item of cart.items) {
      const product = await Product.findById(item.productId._id);
      if (!product || product.stockQty < item.quantity) {
        return res.status(400).json({
          error: `Insufficient stock for ${product?.name || "a product"}`,
        });
      }
      product.stockQty -= item.quantity;
      await product.save();
      items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });
    }

    const totalAmount = items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    const order = await Order.create({
      userId,
      items,
      totalAmount,
      paymentMethod: paymentMethod || "demo",
      paymentStatus: "paid",
      orderStatus: "new",
      shippingAddress: customer.address,
    });

    // Clear cart after successful order
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      data: {
        orderId: order._id,
        totalAmount: order.totalAmount,
        paymentStatus: order.paymentStatus,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Checkout failed" });
  }
});

// GET /api/orders (admin) - list orders
orderRouter.get("/", async (_req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ data: orders });
  } catch {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

