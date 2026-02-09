const { users } = require("../data");

module.exports = function handler(req, res) {
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

  const id = +req.query.id;

  if (req.method === "PUT") {
    const index = users.findIndex((u) => u.id === id);
    if (index > -1) {
      users[index] = { ...users[index], ...req.body };
      res.json(users[index]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } else if (req.method === "DELETE") {
    const index = users.findIndex((u) => u.id === id);
    if (index > -1) {
      users.splice(index, 1);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } else if (req.method === "GET") {
    const user = users.find((u) => u.id === id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
