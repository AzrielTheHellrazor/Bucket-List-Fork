# 🔧 Manifest JSON Çözümü

## Sorun
Manifest'te gösterilen dosyalar yok:
- ❌ icon.png
- ❌ image.png  
- ❌ splash.png
- ❌ webhook endpoint

## Çözüm

### Seçenek 1: Manifest'i Güncelle (Önerilen)

Manifest JSON'u şöyle güncelle:

```json
{
  "frame": {
    "name": "Bucket List",
    "version": "1",
    "iconUrl": "https://bucket-list-silk.vercel.app/assets/Bucket List Logo.png",
    "homeUrl": "https://bucket-list-silk.vercel.app",
    "imageUrl": "https://bucket-list-silk.vercel.app/assets/Bucket List Logo.png",
    "splashImageUrl": "https://bucket-list-silk.vercel.app/assets/Bucket List Logo.png",
    "splashBackgroundColor": "#1e293b",
    "subtitle": "Your bucket list. On-chain. Forever.",
    "primaryCategory": "entertainment",
    "description": "Store your bucket list items permanently on-chain. Add your dreams to the blockchain, and explore community bucket lists on Base.",
    "tags": [
      "base",
      "bucketlist",
      "social",
      "onchain",
      "lifestyle"
    ]
  }
}
```

**Değişiklikler:**
- ❌ `webhookUrl` satırını SİL
- `iconUrl`: Logo kullan
- `imageUrl`: Logo kullan  
- `splashImageUrl`: Logo kullan
- ❌ `accountAssociation` bölümünü SİL (otomatik oluşturur)

### Seçenek 2: Gerekli Dosyaları Ekle

Logo'yu kopyalayıp farklı isimlerle ekle:
- `icon.png` → Logo copy
- `image.png` → Logo copy
- `splash.png` → Logo copy

---

## Hazır Manifest JSON (Copy-Paste)

```json
{
  "frame": {
    "name": "Bucket List",
    "version": "1",
    "iconUrl": "https://bucket-list-silk.vercel.app/assets/Bucket List Logo.png",
    "homeUrl": "https://bucket-list-silk.vercel.app",
    "imageUrl": "https://bucket-list-silk.vercel.app/assets/Bucket List Logo.png",
    "splashImageUrl": "https://bucket-list-silk.vercel.app/assets/Bucket List Logo.png",
    "splashBackgroundColor": "#1e293b",
    "subtitle": "Your bucket list. On-chain. Forever.",
    "primaryCategory": "entertainment",
    "description": "Store your bucket list items permanently on-chain. Add your dreams to the blockchain, and explore community bucket lists on Base.",
    "tags": [
      "base",
      "bucketlist",
      "social",
      "onchain",
      "lifestyle"
    ]
  }
}
```

⚠️ **accountAssociation bölümünü sil!** Vercel otomatik oluşturur.

