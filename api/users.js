const { users } = require("./data");

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

  if (req.method === "GET") {
    res.json(users);
  } else if (req.method === "POST") {
    const user = { id: Date.now(), ...req.body };
    users.push(user);
    res.status(201).json(user);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
