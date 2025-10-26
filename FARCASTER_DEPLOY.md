# Farcaster Frame Deployment Guide 🚀

## 📋 Özet
Bucket List uygulamasını Farcaster Frame olarak deploy etmek için yapılması gerekenler.

## 🌐 Deployment Adımları

### 1. Deploy Frontend (Vercel/Netlify/Fleek)

**Vercel ile:**
```bash
npm install -g vercel
cd frontend
vercel --prod
```

**Netlify ile:**
```bash
npm install -g netlify-cli
cd frontend
netlify deploy --prod
```

**Fleek ile:**
```bash
npm install -g @fleekhq/fleek-cli
fleek login
fleek sites:create --name bucket-list
```

### 2. Meta Tags'leri Güncelle

Deploy ettikten sonra `index.html`'deki şu satırları güncelle:
```html
<meta property="og:url" content="YOUR_DEPLOY_URL">
<meta property="fc:frame:image" content="YOUR_DEPLOY_URL/assets/Bucket List Logo.png">
<meta name="twitter:image" content="YOUR_DEPLOY_URL/assets/Bucket List Logo.png">
```

### 3. Farcaster Frame Validation

Frame'i test etmek için:
- [Farcaster Frame Validator](https://warpcast.com/~/developers/frames)
- veya https://framely.xyz/ kullan

## 📱 Mobil Görünüm

Uygulama responsive tasarım ile şu özelliklere sahip:
- ✅ Mobil-first design
- ✅ Touch-friendly buttons
- ✅ Optimized for small screens
- ✅ PWA ready (manifest.json)

## 🔧 Gerekli Dosyalar

1. **manifest.json** ✅ (Eklandi)
2. **Meta tags** ✅ (Eklandi)
3. **Responsive CSS** ✅ (Eklandi)

## ⚙️ Environment Variables

Deploy için gerekli environment variables:
```
NONE - Static site, no server needed
```

## 🚀 Base Blockchain

- **Contract Address:** `0xe2BfF3fCEd31187C828C7200e592f5b506EbEd8C`
- **Network:** Base Sepolia (Test)
- **RPC:** https://sepolia.base.org
- **Explorer:** https://sepolia.basescan.org

## 📝 Next Steps

1. ✅ Deploy to hosting (Vercel/Netlify)
2. ✅ Update meta tags with real URLs
3. ✅ Test on Farcaster
4. ✅ Share in Warpcast channels

## 🎯 Frame Features

- **Interactive:** Users can connect wallet and add items
- **On-chain:** All data stored on Base blockchain
- **Forever:** Permanent storage
- **Social:** View other users' bucket lists

## 🔗 Useful Links

- Base Docs: https://docs.base.org
- Farcaster Frames: https://warpcast.com/~/developers/frames
- Base Sepolia Faucet: https://docs.base.org/tools/network-faucets
