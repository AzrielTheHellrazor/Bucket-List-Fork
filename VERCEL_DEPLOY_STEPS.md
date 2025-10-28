# 🚀 Vercel Deployment Adımları

## ✅ Tamamlananlar
- ✅ GitHub repo oluşturuldu: https://github.com/simplepixellife/Bucket-List
- ✅ Kod push edildi
- ✅ .env dosyası gitignore'da (güvenli)

## 📋 Şimdi Yapılacaklar

### 1. Vercel'de Deploy
1. https://vercel.com/dashboard → "Add New Project"
2. GitHub repo'yu seç: **simplepixellife/Bucket-List**
3. **Root Directory:** `frontend` (ÖNEMLİ!)
4. Framework: "Other" veya "Static HTML"
5. Deploy

### 2. Deploy Sonrası
URL alacaksın (örn: https://bucket-list-xxx.vercel.app)

### 3. Meta Tags Güncelleme
Deploy ettikten sonra söyle, `frontend/index.html` dosyasında 3 yerde URL güncelleyeceğiz:

```html
<!-- Line 12 -->
<meta property="og:url" content="YOUR_VERCEL_URL">

<!-- Line 17 -->
<meta property="fc:frame:image" content="YOUR_VERCEL_URL/assets/Bucket List Logo.png">

<!-- Line 23 -->
<meta name="twitter:image" content="YOUR_VERCEL_URL/assets/Bucket List Logo.png">
```

Sonra GitHub'a push edip tekrar deploy!

### 4. Canlı URL Test
https://YOUR_URL.vercel.app → Test et!

---

## 📊 Mevcut Durum
- Contract: `0xC3c047675B68BEa7C9bdce329E327f6C2C5B59B3`
- Network: Base Sepolia
- Fee: 0.0001 ETH per item
- Builder: `0x89F04F5C012eDa374E38a7012aeB3CB43c90A52f`


