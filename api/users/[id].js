import usersData from "../data-store.js";

export default function handler(req, res) {
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
    const id = req.query.id;

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
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
}
