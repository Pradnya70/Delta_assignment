export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  const mongoUri = process.env.MONGODB_URI;
  const hasMongoUri = !!mongoUri;

  // Return full details for debugging
  res.json({
    status: "API is running",
    timestamp: new Date().toISOString(),
    environment: {
      mongodbConfigured: hasMongoUri,
      mongodbUriPreview: hasMongoUri
        ? mongoUri.substring(0, 50) + "..."
        : "NOT SET",
      nodeEnv: process.env.NODE_ENV,
    },
    nextSteps: !hasMongoUri
      ? [
          "1. Go to https://vercel.com",
          "2. Select your project 'delta-assignment'",
          "3. Click Settings → Environment Variables",
          "4. Click 'Add New'",
          "5. Name: MONGODB_URI",
          "6. Value: mongodb+srv://pradnyawaghmare9495:Pradnya%40123@cluster0.qikytbl.mongodb.net/crud_app?retryWrites=true&w=majority&appName=Cluster0",
          "7. Select environments: Production, Preview, Development",
          "8. Click 'Add'",
          "9. Click 'Redeploy' from Deployments tab",
        ]
      : [],
  });
}
