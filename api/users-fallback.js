import { usersData } from "./data-store.js";

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

    if (!mongoUri) {
      console.warn(
        "MONGODB_URI not set - using in-memory storage (data will be lost on redeploy)",
      );

      if (req.method === "GET") {
        res.json(usersData);
      } else if (req.method === "POST") {
        const user = {
          _id: new Date().getTime().toString(),
          ...req.body,
          createdAt: new Date(),
        };
        usersData.push(user);
        res.status(201).json(user);
      } else {
        res.status(405).json({ error: "Method not allowed" });
      }
      return;
    }

    // Try to use MongoDB
    const { connectDB, User } = await import("./db.js");
    await connectDB();

    if (req.method === "GET") {
      const users = await User.find({});
      res.json(users);
    } else if (req.method === "POST") {
      const user = new User(req.body);
      const savedUser = await user.save();
      res.status(201).json(savedUser);
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error.message);
    res.status(500).json({
      error: error.message,
      warning:
        "If using in-memory storage, data will be lost on redeployment. Add MONGODB_URI to Vercel environment variables.",
    });
  }
}
