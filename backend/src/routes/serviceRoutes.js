import express from "express";
import { Service } from "../models/Service.js";

export const serviceRouter = express.Router();

// GET /api/services
serviceRouter.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json({ data: services });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

// GET /api/services/:id
serviceRouter.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.json({ data: service });
  } catch {
    res.status(400).json({ error: "Invalid service id" });
  }
});

