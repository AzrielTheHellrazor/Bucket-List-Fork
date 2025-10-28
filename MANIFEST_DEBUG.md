# 🔍 Manifest Debug - Adım Adım

## ✅ Test 1: Dosya URL'leri Kontrol

Aşağıdaki URL'leri tarayıcıda aç, 404 olmamalı:

1. **Icon URL:** https://bucket-list-silk.vercel.app/icon.png
2. **Image URL:** https://bucket-list-silk.vercel.app/image.png
3. **Splash URL:** https://bucket-list-silk.vercel.app/splash.png
4. **Webhook:** https://bucket-list-silk.vercel.app/api/webhook

**Sorun:** Eğer 404 veriyorsa → Dosyalar root'ta değil
**Çözüm:** Deploy'u kontrol et

---

## ✅ Test 2: Manifest JSON

https://bucket-list-silk.vercel.app/farcaster.json

Bu URL'yi aç. JSON görünmeli.

---

## ✅ Test 3: Webhook Endpoint

https://bucket-list-silk.vercel.app/api/webhook

Bu URL'ye GET request at. "ok" döndürmeli.

---

## 🔍 Olası Sorunlar

### Sorun 1: Dosyalar Root'ta Değil
Vercel vercel.json ile root'a yönlendiriyor olabilir.

**Kontrol:** https://bucket-list-silk.vercel.app/icon.png çalışıyor mu?

### Sorun 2: Webhook 404
Webhook endpoint'i /api/webhook.js ama Vercel serverless function olarak çalışmıyor.

**Kontrol:** https://bucket-list-silk.vercel.app/api/webhook

### Sorun 3: Manifest Format'ı
Belki manifest format'ı yanlış. accountAssociation otomatik oluşturulmuş ama başka sorun var.

---

## 🔧 Hızlı Çözüm

Webhook'u kaldırabilirsin. Manifest'te şu satırı sil:

```json
"webhookUrl": "https://bucket-list-silk.vercel.app/api/webhook",
```

AMA Farcaster embed tool'da düzenleme yapamıyorsun.

Alternatif: Gerekli dosyaları oluşturup tekrar push et.



