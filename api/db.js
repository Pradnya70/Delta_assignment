import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);

export async function connectDB() {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error(
        "MONGODB_URI environment variable is not set. Check Vercel environment variables.",
      );
    }

    // Only connect if not already connected
    if (mongoose.connection.readyState === 1) {
      return;
    }

    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    };

    await mongoose.connect(mongoUri, options);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
}
