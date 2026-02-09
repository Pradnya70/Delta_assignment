import { usersData } from "../data-store.js";

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
    const mongoUri = process.env.MONGODB_URI;
    const id = req.query.id;

    // If MongoDB is configured, use it
    if (mongoUri) {
      const { connectDB, User } = await import("../db.js");
      await connectDB();

      if (req.method === "GET") {
        const user = await User.findById(id);
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ error: "User not found" });
        }
      } else if (req.method === "PUT") {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ error: "User not found" });
        }
      } else if (req.method === "DELETE") {
        const result = await User.findByIdAndDelete(id);
        if (result) {
          res.json({ success: true });
        } else {
          res.status(404).json({ error: "User not found" });
        }
      } else {
        res.status(405).json({ error: "Method not allowed" });
      }
    } else {
      // Fallback to in-memory storage
      if (req.method === "GET") {
        const user = usersData.find((u) => u._id === id);
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ error: "User not found" });
        }
      } else if (req.method === "PUT") {
        const index = usersData.findIndex((u) => u._id === id);
        if (index > -1) {
          usersData[index] = { ...usersData[index], ...req.body };
          res.json(usersData[index]);
        } else {
          res.status(404).json({ error: "User not found" });
        }
      } else if (req.method === "DELETE") {
        const index = usersData.findIndex((u) => u._id === id);
        if (index > -1) {
          usersData.splice(index, 1);
          res.json({ success: true });
        } else {
          res.status(404).json({ error: "User not found" });
        }
      } else {
        res.status(405).json({ error: "Method not allowed" });
      }
    }
  } catch (error) {
    console.error("API Error:", error.message);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
