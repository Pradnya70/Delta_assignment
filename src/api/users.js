let users = [];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    res.json(users);
  } else if (req.method === 'POST') {
    const user = { id: Date.now(), ...req.body };
    users.push(user);
    res.status(201).json(user);
  } else if (req.method === 'PUT') {
    const id = +req.query.id;
    const index = users.findIndex(u => u.id === id);
    if (index > -1) {
      users[index] = { ...users[index], ...req.body };
      res.json(users[index]);
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  } else if (req.method === 'DELETE') {
    const id = +req.query.id;
    users = users.filter(u => u.id !== id);
    res.json({ success: true });
  }
}