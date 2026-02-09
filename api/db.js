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

let connectionPromise = null;

export async function connectDB() {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error(
        "MONGODB_URI not configured. Add it to Vercel Environment Variables: Settings → Environment Variables → Add MONGODB_URI",
      );
    }

    // Prevent multiple simultaneous connection attempts
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB");
      return;
    }

    if (mongoose.connection.readyState === 2) {
      console.log("MongoDB connection in progress");
      return;
    }

    // Reuse connection promise if already connecting
    if (connectionPromise) {
      return await connectionPromise;
    }

    const options = {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 5,
      minPoolSize: 1,
      retryWrites: true,
    };

    connectionPromise = mongoose.connect(mongoUri, options);
    await connectionPromise;

    console.log("MongoDB connected successfully");
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    return;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    connectionPromise = null;
    throw error;
  }
}
