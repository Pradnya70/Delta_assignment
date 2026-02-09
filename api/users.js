import usersData from "./data-store.js";

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === "GET") {
      res.json(usersData);
    } else if (req.method === "POST") {
      const user = {
        _id: Date.now().toString(),
        ...req.body,
        createdAt: new Date().toISOString(),
      };
      usersData.push(user);
      res.status(201).json(user);
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
}
}
