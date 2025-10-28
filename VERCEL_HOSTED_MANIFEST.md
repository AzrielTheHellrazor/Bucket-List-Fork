# 🎯 Vercel Hosted Manifest - Adımlar

## ✅ Yapılanlar
- Manifest endpoint oluşturuldu: `/api/manifest.json.js`
- Gerekli dosyalar eklendi: icon.png, image.png, splash.png

## 📍 Şimdi Yapılacaklar

### 1. Vercel Dashboard'a Git
https://vercel.com/dashboard → Bucket-List projesi

### 2. "Create hosted manifest" Butonuna Bas
Farcaster embed tool'da "Create hosted manifest" butonuna basınca açılan formda:

**Manifest URL:** 
```
https://bucket-list-silk.vercel.app/api/manifest.json
```

**Hosting Provider:** Vercel

### 3. Submit Et
Formu doldur ve submit et.

### 4. Farcaster'a Geri Dön
Gelen manifest URL'ini kopyala (muhtemelen Vercel'de farklı bir URL verecek)

### 5. Farcaster App Directory'ye Submit
- Manifest URL'i yapıştır
- Submit et
- ✅ Başarılı!

---

## 🔍 Manifest Endpoint Test Et

Deploy tamamlandıktan sonra test et:
https://bucket-list-silk.vercel.app/api/manifest.json

Bu URL'yi tarayıcıda aç. JSON dönmesi lazım.

---

## ⚠️ Eğer Hala Hata Varsa

**Alternatif:** Vercel'de "Deployments" → "..." → "View Build Logs" 
- Build hatası var mı kontrol et
- API endpoint çalışıyor mu kontrol et

**Manifest JSON Kontrol:**
Tarayıcıda aç: https://bucket-list-silk.vercel.app/api/manifest.json
JSON döndüğünü gör!



