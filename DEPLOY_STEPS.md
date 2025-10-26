# 🚀 Deployment Steps

## 1. Frontend Deploy (Vercel - En Kolay)

```bash
# Vercel CLI install
npm i -g vercel

# Login
vercel login

# Deploy
cd frontend
vercel --prod
```

**Output:** URL alacaksın (örn: https://bucket-list.vercel.app)

## 2. Deploy Sonrası

### Meta Tags Güncelleme
`frontend/index.html` dosyasında:
- Line 12: `<meta property="og:url" content="YOUR_DEPLOY_URL">`
- Line 17: `<meta property="fc:frame:image" content="YOUR_DEPLOY_URL/assets/...">`
- Line 23: `<meta name="twitter:image" content="YOUR_DEPLOY_URL/assets/...">`

## 3. Base Mainnet'e Geçiş (Opsiyonel)

```bash
# .env dosyasında BASE_SEPOLIA_RPC_URL'yi güncelle
BASE_SEPOLIA_RPC_URL=https://mainnet.base.org

# Deploy et
npm run deploy:base-sepolia
```

## 4. Farcaster Frame Olarak Paylaş

Frame'i test et:
- https://warpcast.com/~/developers/frames

Paylaş:
```markdown
Check out my bucket list on Base! 🪣

Your dreams, forever on-chain.
Store up to 10 bucket list items.

[Try it now: YOUR_URL]

#Base #Web3 #BucketList #Farcaster
```

## 5. Next Features (İsteğe Bağlı)

- [ ] Analytics ekle
- [ ] Social sharing
- [ ] Leaderboard
- [ ] Categories/tags
- [ ] Multi-chain support

## 📊 Mevcut Durum

- ✅ Contract: `0xC3c047675B68BEa7C9bdce329E327f6C2C5B59B3`
- ✅ Builder: `0x89F04F5C012eDa374E38a7012aeB3CB43c90A52f`
- ✅ Fee: 0.0001 ETH per item
- ✅ Network: Base Sepolia
