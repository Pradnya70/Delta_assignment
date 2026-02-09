export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const mongoUri = process.env.MONGODB_URI;

  res.json({
    status: "API is running",
    mongodbConfigured: !!mongoUri,
    nodeEnv: process.env.NODE_ENV,
  });
}
