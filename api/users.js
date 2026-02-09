import { connectDB, User } from "./db.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    // Debug: Check if MONGODB_URI is available
    const mongoUri = process.env.MONGODB_URI;
    console.log("MONGODB_URI configured:", !!mongoUri);
    console.log("Request method:", req.method);

    await connectDB();

    if (req.method === "GET") {
      const users = await User.find({});
      console.log("Found users:", users.length);
      res.json(users);
    } else if (req.method === "POST") {
      console.log("Creating user with data:", req.body);
      const user = new User(req.body);
      await user.save();
      res.status(201).json(user);
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      error: error.message || "Internal Server Error",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
}
