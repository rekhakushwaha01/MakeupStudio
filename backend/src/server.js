import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import { serviceRouter } from "./routes/serviceRoutes.js";
import { productRouter } from "./routes/productRoutes.js";
import { bookingRouter } from "./routes/bookingRoutes.js";
import { cartRouter } from "./routes/cartRoutes.js";
import { orderRouter } from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/services", serviceRouter);
app.use("/api/products", productRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/cart", cartRouter);
app.use("/api", orderRouter); // /api/checkout, /api/orders

const PORT = process.env.PORT || 4000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Beauty Parlor API running on port ${PORT}`);
  });
});

