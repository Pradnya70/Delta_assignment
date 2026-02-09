import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
});

export const User = mongoose.model("User", userSchema);

export async function connectDB() {
  if (mongoose.connection.readyState !== 0) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
