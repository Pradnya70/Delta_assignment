import fs from "fs";
import path from "path";

// Use /tmp directory on Vercel (writable storage)
const dataFile = path.join("/tmp", "users.json");

function loadUsers() {
  try {
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error loading users:", error);
  }
  return [];
}

function saveUsers(users) {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(users, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving users:", error);
  }
}

export { loadUsers, saveUsers };
