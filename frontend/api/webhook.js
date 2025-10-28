export default async function handler(req, res) {
  // Simple webhook for Farcaster Frame
  if (req.method === 'GET') {
    return res.status(200).json({ status: 'ok' });
  }
  
  // Handle POST requests for interactive frames (future)
  if (req.method === 'POST') {
    return res.status(200).json({ status: 'ok' });
  }
  
  res.status(405).json({ error: 'Method not allowed' });
}



