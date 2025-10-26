# 🚀 Hızlı Deploy Rehberi

## Seçenek 1: Netlify (EN KOLAY - 2 dakika)

1. **https://app.netlify.com** adresine git
2. "Sites" → "Add new site" → "Deploy manually"
3. `frontend` klasörünü ZIP yap
4. ZIP'i Netlify'a sürükle
5. ✅ Deploy oluyor!

**URL alacaksın:** https://random-name.netlify.app

---

## Seçenek 2: Vercel (GitHub gerekli)

1. GitHub'da repo oluştur
2. Kodu push et
3. https://vercel.com → GitHub bağla → Import
4. ✅ Auto deploy

---

## Seçenek 3: Fleek (Web3 yakın)

1. https://app.fleek.co
2. GitHub repo'yu bağla
3. Build settings ayarla
4. ✅ Deploy

---

## Deploy Sonrası

### Meta Tags Güncelle
Deploy ettikten sonra `frontend/index.html` dosyasında 3 yerde URL güncelle:

```html
<!-- Line 12 -->
<meta property="og:url" content="YOUR_NETLIFY_URL">

<!-- Line 17 -->
<meta property="fc:frame:image" content="YOUR_NETLIFY_URL/assets/Bucket List Logo.png">

<!-- Line 23 -->
<meta name="twitter:image" content="YOUR_NETLIFY_URL/assets/Bucket List Logo.png">
```

### Deploy Et ve Güncelle
1. URL'i al
2. HTML'de güncelle
3. Tekrar deploy et
4. ✅ Hazır!

---

## 📍 Mevcut Durum

- **Contract:** `0xC3c047675B68BEa7C9bdce329E327f6C2C5B59B3`
- **Network:** Base Sepolia
- **Fee:** 0.0001 ETH per item
- **Builder:** `0x89F04F5C012eDa374E38a7012aeB3CB43c90A52f`

---

## Sonraki Adımlar

1. ✅ Deploy (Netlify/Vercel)
2. ✅ Meta tags güncelle
3. ✅ Farcaster'da paylaş
4. 🎉 Live!

