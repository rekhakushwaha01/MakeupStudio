import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: String },
    serviceId: { type: String, required: true }, // simple string id from frontend
    date: { type: String, required: true }, // ISO date string (YYYY-MM-DD)
    timeSlot: { type: String, required: true }, // e.g. "10:00 AM"
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

bookingSchema.index({ serviceId: 1, date: 1, timeSlot: 1 }, { unique: true });

export const Booking = mongoose.model("Booking", bookingSchema);

