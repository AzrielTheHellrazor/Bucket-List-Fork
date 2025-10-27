# 🚀 Base Mainnet Deploy Rehberi

## ⚠️ DİKKAT
**Mainnet'te işlem yapmak GERÇEK PARAYLA olacak!**

---

## 📋 Deploy İçin Gerekenler

### 1. .env Dosyasını Güncelle

`.env` dosyasında şu satırı ekle:

```env
BASE_RPC_URL=https://mainnet.base.org
```

Ya da daha iyi bir RPC (ucretsiz):
```env
BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/YOUR_API_KEY
```

### 2. Cüzdanında Base Mainnet ETH Olmalı

**Minimum:** 0.01 ETH (deploy için yeterli)

**Nereye geçecek ETH:**
- Contract deploy
- Builder'a fee (her item için 0.0001 ETH)

---

## 🎯 Deploy Adımları

### 1. Wallet'ı Kontrol Et
```
ETH: ___ Base Mainnet
Address: 0x89F04F5C012eDa374E38a7012aeB3CB43c90A52f
```

### 2. Deploy Et
```bash
npm run deploy:base
```

### 3. Çıkan Contract Address'i Kopyala
```
Contract deployed at: 0x...
```

### 4. Frontend Config Güncelle
`frontend/config.js` dosyasını güncelle:
```js
export const CONTRACT_ADDRESS = "0x..."; // YENİ ADRES
```

### 5. Push Et
```bash
git add frontend/config.js
git commit -m "Update contract address to mainnet"
git push
```

---

## 💰 Maliyet

**Deploy:** ~0.001 ETH (~$2-3)
**Her kullanıcı işlemi:** 0.0001 ETH fee + gas fee

---

## ✅ Sonra

- Site otomatik mainnet contract'a bağlanacak
- Network değişecek: "Base Sepolia" → "Base"
- Gerçek para ile çalışacak!

---

## 🤔 Önce Düşün

**Sepolia'da kalmak daha mı iyi?**
- ✅ Test için ücretsiz
- ✅ Denemeler özgürce
- ❌ Gerçek para yok

**Mainnet'e geçmek:**
- ✅ Production
- ✅ Gerçek kullanıcılar
- ✅ Para kazanma potansiyeli
- ❌ Gerçek ETH gerekiyor
- ❌ Hata maliyetli

---

## 💡 Öneri

**1. Sepolia'da test yap** (şu an)
- User feedback topla
- Bug'ları düzelt
- Özellik ekle

**2. Sonra mainnet'e geç**

Karar senin! 🤝

