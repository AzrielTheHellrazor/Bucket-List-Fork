export default async function handler(req, res) {
  const manifest = {
    "frame": {
      "name": "Bucket List",
      "version": "1",
      "iconUrl": "https://bucket-list-base.vercel.app/icon.png",
      "homeUrl": "https://bucket-list-base.vercel.app",
      "imageUrl": "https://bucket-list-base.vercel.app/image.png",
      "splashImageUrl": "https://bucket-list-base.vercel.app/splash.png",
      "splashBackgroundColor": "#1e293b",
      "webhookUrl": "https://bucket-list-base.vercel.app/api/webhook",
      "subtitle": "Your bucket list. On-chain. Forever.",
      "primaryCategory": "entertainment",
      "description": "Store your bucket list items permanently on-chain. Add your dreams to the blockchain, and explore community bucket lists on Base.",
      "tags": ["base", "bucketlist", "social", "onchain", "lifestyle"]
    }
  };
  
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(manifest);
}



