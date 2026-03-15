import express from "express";
import { Booking } from "../models/Booking.js";

export const bookingRouter = express.Router();

// GET /api/bookings/availability?serviceId=&date=
bookingRouter.get("/availability", async (req, res) => {
  const { serviceId, date } = req.query;
  if (!serviceId || !date) {
    return res.status(400).json({ error: "serviceId and date are required" });
  }

  const daySlots = ["10:00 AM", "12:30 PM", "3:00 PM", "5:30 PM"];

  try {
    const bookings = await Booking.find({ serviceId, date });
    const bookedSlots = bookings.map((b) => b.timeSlot);
    const availableSlots = daySlots.filter((slot) => !bookedSlots.includes(slot));
    res.json({ data: { date, serviceId, availableSlots, bookedSlots } });
  } catch {
    res.status(500).json({ error: "Failed to check availability" });
  }
});

// POST /api/bookings
bookingRouter.post("/", async (req, res) => {
  const { userId, serviceId, date, timeSlot } = req.body;
  if (!serviceId || !date || !timeSlot) {
    return res
      .status(400)
      .json({ error: "serviceId, date and timeSlot are required" });
  }

  try {
    const booking = await Booking.create({
      userId: userId || null,
      serviceId,
      date,
      timeSlot,
      status: "confirmed",
    });
    console.log(
      `[Booking] User ${userId || "guest"} booked service ${serviceId} on ${date} at ${timeSlot}`
    );
    res.status(201).json({ data: booking });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ error: "This time slot is already booked for the selected service" });
    }
    res.status(500).json({ error: "Failed to create booking" });
  }
});

