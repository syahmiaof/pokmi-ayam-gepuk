<div align="center">
  <h1>AYAM GEPUK POKMI</h1>
  <p><strong>Sambal Noir × Gepuk Pop: Visual Prototype & Digital Experience untuk Jenama Makanan Jalanan Premium</strong></p>
  <p>
    <a href="https://ayamgepukpokmi.syahmiaof.my/"><img src="https://img.shields.io/badge/Demo-Live-60E1B5?style=for-the-badge&logoColor=60E1B5&labelColor=101713" alt="Demo"></a>
    <a href="https://github.com/syahmiaof/pokmi-ayam-gepuk"><img src="https://img.shields.io/badge/Source-GitHub-60E1B5?style=for-the-badge&logo=github&logoColor=60E1B5&labelColor=101713" alt="GitHub"></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-60E1B5?style=for-the-badge&logoColor=60E1B5&labelColor=101713" alt="License"></a>
    <a href="https://github.com/syahmiaof/pokmi-ayam-gepuk/actions"><img src="https://img.shields.io/badge/CI-Passing-60E1B5?style=for-the-badge&logo=githubactions&logoColor=60E1B5&labelColor=101713" alt="CI"></a>
    <a href="https://syahmiaof.my"><img src="https://img.shields.io/badge/Portfolio-syahmiaof.my-60E1B5?style=for-the-badge&logo=vercel&logoColor=60E1B5&labelColor=101713" alt="Portfolio"></a>
  </p>
</div>

![Preview Ayam Gepuk Pokmi](public/og-image.jpg)

---

## Gambaran Keseluruhan (Overview)

**Ayam Gepuk Pokmi** ialah prototaip visual interaktif dan laman pengalaman digital (*digital brand showcase*) yang direka untuk jenama makanan jalanan moden Malaysia. Menggabungkan estetika brutalist jalanan dengan palet warna hangat (*Noir, Deep Crimson, Hot Mustard, Cream*), laman ini mempamerkan menu signatur ayam gepuk bersama sambal istimewa (Sambal Gajus, Sambal Hijau, Sambal Bakar Berasap), kerangupan enoki krispi, dan pengalaman pesanan pantas.

Dibina menggunakan **React 18**, **TypeScript**, **Tailwind CSS**, dan dioptimumkan menggunakan **Vite** untuk prestasi render kilat dengan sifar kebergantungan luar yang berat.

---

## Ciri-Ciri Utama (Key Features)

- **Sambal Matrix Interaktif**: Terokai profil kepedasan, tekstur, dan ramuan 3 sambal signatur Pokmi dengan visual kad interaktif.
- **Dulang Menu Signatur**: Paparan hidangan padu lengkap dengan maklumat rempah, tahap pedas (1–5 bintang), dan nota tekstur.
- **Dapur Tumbuk & Suasana Jalanan**: Galeri foto grid dinamik merakamkan budaya lepak malam, sambal ditumbuk lesung batu segar, dan hidangan atas dulang.
- **Pencari Lokasi & Waktu Operasi**: Kad cawangan interaktif lengkap dengan alamat, waktu operasi, dan nombor contoh.
- **Reka Bentuk Brutalist-Pop Responsif**: Tipografi besar (*display typography*), palet warna berani, dan animasi *reveal-on-scroll* yang menghormati mod capaian `prefers-reduced-motion`.

---

## Struktur Kod (Project Structure)

```text
demo-pokmi/
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI workflow (typecheck, lint, build)
├── public/                    # Aset statik, ikon web, dan imej jenama
├── src/
│   ├── components/
│   │   └── AyamGepukPokmi.tsx # Komponen utama prototaip digital Pokmi
│   ├── App.tsx                # App root shell
│   ├── index.css              # Tailwind base & komponen tipografi
│   └── main.tsx               # Titik masuk aplikasi React
├── eslint.config.js           # Konfigurasi ESLint moden (flat config)
├── package.json               # Skrip arahan dan pakej kebergantungan
├── tailwind.config.js         # Konfigurasi tema dan warna Pokmi
├── tsconfig.json              # Tetapan kompilasi TypeScript
└── vite.config.ts             # Konfigurasi bundler Vite
```

---

## Arahan Pembangunan (Development & Build)

### Keperluan
- Node.js 18+ atau 20+
- npm 9+

### Langkah Pemasangan

```bash
# 1. Pasang dependencies
npm install

# 2. Jalankan server pembangunan setempat
npm run dev

# 3. Jalankan semakan jenis TypeScript
npm run typecheck

# 4. Jalankan analisis kod (linter)
npm run lint

# 5. Bina pakej pengeluaran (production build)
npm run build

# 6. Pratonton hasil binaan
npm run preview
```

---

## Had (Limits)

Nama cawangan, alamat, waktu operasi dan nombor telefon yang dipaparkan ialah **placeholder demo**, bukan butiran kedai sebenar. Foto makanan menggunakan imej luaran Unsplash. Butang sosial berlabel demo tidak membuka akaun rasmi.

---

## Builder

[Muhammad Syahmi](https://syahmiaof.my)

---

## Lesen & Hak Cipta

Dilesenkan di bawah [Lesen MIT](LICENSE). Hak Cipta © 2026 [Muhammad Syahmi](https://syahmiaof.my).
