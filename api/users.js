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
    await connectDB();

    if (req.method === "GET") {
      const users = await User.find();
      res.json(users);
    } else if (req.method === "POST") {
      const user = new User({
        _id: new Date().getTime(),
        ...req.body,
      });
      await user.save();
      res.status(201).json(user);
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
}
