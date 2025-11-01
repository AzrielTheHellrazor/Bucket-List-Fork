
export const minikitConfig = {
  accountAssociation: {
    header: "eyJmaWQiOjMyMjE5MywidHlwZSI6ImF1dGgiLCJrZXkiOiIweDUzNTFBYmZhOTAyMkQxRTgxMTdiMTFjYTM1NTZkZTQxNjRBZDM0ZmQifQ",
    payload: "eyJkb21haW4iOiJidWNrZXQtbGlzdC1mb3JrLnZlcmNlbC5hcHAifQ",
    signature: "vB0l7LjIJUmo9s/+WCyqYmQY5x7V3dZI/zcHk2VMkzdXe22vDH4AS6HOjaHaqvHtWdkPiSIeCShKvLSoGoJlFBs=",
  },
  baseBuilder: {
    ownerAddress: "",
  },
  miniapp: {
    version: "1",
    name: "Bucket List",
    subtitle: "Your dreams, on-chain",
    description: "Store your bucket list items on-chain on Base. Pay 0.0001 ETH per item and explore community lists.",
    screenshotUrls: [],
    iconUrl: `https://bucket-list-fork.vercel.app/icon.png`,
    splashImageUrl: `https://bucket-list-fork.vercel.app/splash.png`,
    splashBackgroundColor: "#1e293b",
    homeUrl: `https://bucket-list-fork.vercel.app`,
    webhookUrl: `https://bucket-list-fork.vercel.app/api/webhook`,
    primaryCategory: "entertainment",
    tags: ["base", "bucketlist", "social", "onchain", "lifestyle"],
    heroImageUrl: `https://bucket-list-fork.vercel.app/image.png`,
    tagline: "Your dreams, forever on-chain.",
    ogTitle: "Bucket List",
    ogDescription: "Store your bucket list items on-chain on Base. Pay 0.0001 ETH per item and explore community lists.",
    ogImageUrl: `https://bucket-list-fork.vercel.app/image.png`,
  },
} as const;
