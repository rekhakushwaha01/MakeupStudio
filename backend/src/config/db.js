import mongoose from "mongoose";

export const connectDb = async () => {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/beauty_parlor";
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error", err.message);
    process.exit(1);
  }
};

