# 🌸 Panduan Lengkap Setup MCP: GitHub, Vercel & Cloudflare 🚀
> *Disediakan dengan kasih sayang oleh Puteri khas untuk sesi Live Demo santai bersama kawan-kawan!* ✨

---

## 🌟 Apa Itu MCP & Kenapa Kawan Korang Mesti Teruja?

Pernah tak korang rasa penat nak kena:
1. Buka browser, login **GitHub** semata-mata nak check PR atau create issue?
2. Buka tab baru, login **Vercel** nak tengok log build deployment passed ke failed?
3. Buka dashboard **Cloudflare** nak belek Workers atau KV store?

Dengan **Model Context Protocol (MCP)**, AI Assistant korang (contohnya Claude Desktop atau Antigravity) tak lagi duduk dalam "bilik gelap" — AI kini ada "tangan dan mata" untuk berinteraksi terus dengan tools kegemaran korang melalui API rasmi! Semuanya berlaku dari satu kotak sembang sahaja! 🪄

```mermaid
flowchart LR
    A["🧑‍💻 Kawan Demo (Prompt)"] --> B["🤖 AI Assistant (Claude / Antigravity)"]
    B -->|"MCP Protocol"| C["🐙 GitHub MCP"]
    B -->|"MCP Protocol"| D["▲ Vercel MCP"]
    B -->|"MCP Protocol"| E["🟧 Cloudflare MCP"]
    C --> F[("GitHub Repos & PRs")]
    D --> G[("Vercel Deployments")]
    E --> H[("Cloudflare Workers & DNS")]
```

---

## 📋 Senarai Semak Persediaan (Pre-requisites Checklist)

Sebelum mula live demo, pastikan korang dah tick semua kotak ni supaya sesi berjalan lancar tanpa gelabah:

- [ ] **Node.js Terpasang**: Buka Terminal / CMD / PowerShell, taip `node -v` (Pastikan v18 ke atas) dan `npx -v`.
- [ ] **Claude Desktop / Antigravity Terpasang**: Dah install aplikasi client MCP yang terkini di komputer.
- [ ] **Akaun Aktif**:
  - [ ] GitHub ([github.com](https://github.com))
  - [ ] Vercel ([vercel.com](https://vercel.com))
  - [ ] Cloudflare ([dash.cloudflare.com](https://dash.cloudflare.com))
- [ ] **Text Editor**: Notepad, Notepad++, atau VS Code untuk edit fail konfigurasi JSON.
- [ ] **Tempat Catatan Rahsia**: Buka Notepad kosong seketika untuk simpan token sebelum paste ke fail konfigurasi (Ingat, jangan share skrin masa ni ya!).

---

## 📍 Di Mana Lokasi Fail Konfigurasi MCP?

Sebelum kita kutip token, jom kenal pasti dulu di mana fail `claude_desktop_config.json` berada:

- **Windows**:
  ```text
  %APPDATA%\Claude\claude_desktop_config.json
  ```
  *(Cara pantas: Tekan `Win + R`, taip `%APPDATA%\Claude`, tekan Enter. Kalau fail belum wujud, create fail baru bernama `claude_desktop_config.json`)*.
- **macOS**:
  ```text
  ~/Library/Application Support/Claude/claude_desktop_config.json
  ```

---

## 🐙 Bahagian 1: Setup GitHub MCP Server

GitHub MCP membolehkan AI mencari repository, membaca kod, membuat fail baru, membuka issue, dan mengurus Pull Requests secara terus.

### 🖼️ Langkah Klik Demi Langkah (GUI GitHub):
1. **Login ke GitHub**: Pergi ke [github.com](https://github.com).
2. **Buka Settings**: Klik gambar avatar profile korang di penjuru **atas kanan**, kemudian klik **Settings**.
3. **Developer Settings**: Scroll menu di sebelah kiri sampai ke bawah sekali, klik **Developer settings**.
4. **Personal Access Tokens**:
   - Klik **Personal access tokens** ➡️ pilih **Tokens (classic)**.
   *(Nota Puteri: Buat masa ni Token Classic paling mudah dan serasi dengan kebanyakan MCP server).*
5. **Jana Token Baru**:
   - Klik butang **Generate new token** ➡️ pilih **Generate new token (classic)**.
   - Masukkan kata laluan GitHub jika diminta.
6. **Tetapan Token**:
   - **Note**: Tulis `MCP Demo Server` atau `Claude Desktop MCP`.
   - **Expiration**: Pilih **7 days** atau **30 days** *(Tips: Elakkan pilih "No expiration" demi keselamatan!)*.
   - **Scopes (Kebenaran)**: Tandakan tick pada:
     - [x] `repo` (Full control of private repositories - untuk baca & tulis repo)
     - [x] `read:org` (Jika korang ada team/organization)
     - [x] `read:user` & `user:email` (Akses maklumat profil)
     - [x] `workflow` (Pilihan: jika mahu AI semak GitHub Actions)
7. **Simpan Token**:
   - Scroll ke bawah sekali dan klik butang hijau **Generate token**.
   - ⚠️ **AMARAN MANIS PUTERI:** Salin kod token bermula dengan `ghp_xxxxxxxxxxxxxxxxxxxx` sekarang juga! GitHub takkan tunjukkan token ni lagi lepas korang refresh page!

### 💻 Snippet Konfigurasi GitHub:
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_MASUKKAN_TOKEN_GITHUB_KORANG_DI_SINI"
      }
    }
  }
}
```

### 🎯 Idea Prompt Semasa Live Demo:
> *"Tolong senaraikan 5 repository terbaru dalam akaun GitHub saya berserta status public/private."*  
> *"Buatkan satu issue baru dalam repo [nama-repo] bertajuk 'Refactor Header Component' dengan penerangan ringkas."*

---

## ▲ Bahagian 2: Setup Vercel MCP Server

Vercel MCP membolehkan AI memantau status deployment, menyemak error dalam log, menyenaraikan projek, dan mengurus persekitaran hosting frontend korang.

### 🖼️ Langkah Klik Demi Langkah (GUI Vercel):
1. **Login ke Vercel**: Pergi ke [vercel.com](https://vercel.com).
2. **Buka Account Settings**: Klik avatar profile korang di penjuru **atas kanan**, kemudian pilih **Settings**.
3. **Pilih Menu Tokens**: Di panel navigasi sebelah kiri, klik tab **Tokens**.
4. **Cipta Token**:
   - Di bawah ruangan **Create Token**, masukkan nama token contohnya: `MCP-Claude-Demo`.
   - **Scope**: Pilih `Full Account` (atau pilih Team spesifik jika projek korang bawah team).
   - **Expiration**: Pilih tempoh sesuai (contoh: `7 Days` atau `30 Days`).
5. **Ketik Create**:
   - Klik butang biru **Create**.
   - Token rahsia akan dipaparkan (format: string rawak aksara).
   - Klik butang **Copy** dan simpan di fail teks sementara.

### 💻 Snippet Konfigurasi Vercel:
```json
{
  "mcpServers": {
    "vercel": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-vercel"],
      "env": {
        "VERCEL_API_TOKEN": "MASUKKAN_TOKEN_VERCEL_KORANG_DI_SINI"
      }
    }
  }
}
```

### 🎯 Idea Prompt Semasa Live Demo:
> *"Semak status projek terkini saya di Vercel, ada deployment yang gagal (failed) ke hari ini?"*  
> *"Tolong ambilkan URL deployment preview yang paling latest untuk projek [nama-projek]."*

---

## 🟧 Bahagian 3: Setup Cloudflare MCP Server

Cloudflare MCP membolehkan AI menyemak zon DNS, mengurus Cloudflare Workers, melihat senarai KV namespace, dan memeriksa analytics trafik.

### 🖼️ Langkah Klik Demi Langkah (GUI Cloudflare):
1. **Login ke Cloudflare**: Pergi ke [dash.cloudflare.com](https://dash.cloudflare.com).
2. **Dapatkan Account ID**:
   - Di halaman utama / Overview (atau bila klik mana-mana domain/worker), perhatikan panel sebelah kanan.
   - Salin **Account ID** (string 32 aksara hex). Simpan ini!
3. **Buka User API Tokens**:
   - Klik avatar profile di penjuru **atas kanan**, pilih **My Profile**.
   - Di menu sebelah kiri, klik **API Tokens**.
4. **Create API Token**:
   - Klik butang biru **Create Token**.
   - Boleh gunakan template **Edit Cloudflare Workers** ATAU buat Custom Token:
     - Klik **Get started** pada bahagian **Custom Token**.
     - **Token name**: `MCP-Demo-Token`.
     - **Permissions**:
       - `Account` ➡️ `Workers Scripts` ➡️ `Edit`
       - `Account` ➡️ `Workers KV Storage` ➡️ `Edit`
       - `Zone` ➡️ `DNS` ➡️ `Read` (atau `Edit` jika mahu AI urus DNS)
     - **Account Resources**: Pilih `Include` ➡️ `All accounts` (atau akaun anda).
5. **Sahkan & Jana**:
   - Klik butang **Continue to summary**.
   - Klik butang hijau **Create Token**.
   - Salin token Cloudflare yang dipaparkan (Cloudflare hanya paparkan sekali sahaja!).

### 💻 Snippet Konfigurasi Cloudflare:
```json
{
  "mcpServers": {
    "cloudflare": {
      "command": "npx",
      "args": ["-y", "@cloudflare/mcp-server-cloudflare"],
      "env": {
        "CLOUDFLARE_API_TOKEN": "MASUKKAN_TOKEN_CLOUDFLARE_DI_SINI",
        "CLOUDFLARE_ACCOUNT_ID": "MASUKKAN_ACCOUNT_ID_DI_SINI"
      }
    }
  }
}
```

### 🎯 Idea Prompt Semasa Live Demo:
> *"Senaraikan semua Cloudflare Workers yang aktif dalam akaun saya."*  
> *"Tolong semak rekod DNS jenis CNAME dan A untuk domain saya."*

---

## 🧩 Fail Lengkap Gabungan (3-in-1 `claude_desktop_config.json`)

Berikut adalah template fail penuh yang menggabungkan ketiga-tiga MCP server serentak. Korang hanya perlu gantikan placeholder dengan token masing-masing:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      }
    },
    "vercel": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-vercel"],
      "env": {
        "VERCEL_API_TOKEN": "xxxxxxxxxxxxxxxxxxxxxxxx"
      }
    },
    "cloudflare": {
      "command": "npx",
      "args": ["-y", "@cloudflare/mcp-server-cloudflare"],
      "env": {
        "CLOUDFLARE_API_TOKEN": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "CLOUDFLARE_ACCOUNT_ID": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

> [!IMPORTANT]
> Selepas simpan fail `claude_desktop_config.json`, **wajib restart aplikasi Claude Desktop** (Quit sepenuhnya dari System Tray di Windows, kemudian buka semula) supaya server MCP dimuatkan.

---

## 🛡️ Tips Keselamatan Penting (Wajib Tahu Masa Live Demo!)

Bila buat live demo depan kawan atau streaming, bahaya terbesar adalah **kebocoran token (credential leak)**. Ikuti tips comel Puteri di bawah:

1. 🚫 **Pause Screen Sharing Semasa Salin Token**:
   - Semasa berada di web GitHub/Vercel/Cloudflare untuk klik "Generate Token", jeda (pause) perkongsian skrin atau alihkan window browser ke skrin lain yang tidak dikongsi.
2. ⏱️ **Gunakan Token Berjangka Pendek (Short Expiry)**:
   - Pilih tempoh tamat 7 hari. Jangan sesekali pilih "Never expire" untuk sesi demonstrasi.
3. ❌ **Jangan Masukkan Token Dalam Git Repository**:
   - Jika workspace korang ada Git, pastikan fail yang mengandungi token dimasukkan dalam `.gitignore`.
4. 🧹 **Prosedur Revoke Selesai Demo (Hanya 1 Minit!)**:
   - **GitHub**: `Settings` ➡️ `Developer settings` ➡️ `Personal access tokens` ➡️ Klik butang **Delete** pada token demo.
   - **Vercel**: `Settings` ➡️ `Tokens` ➡️ Klik ikon **Sampah / Revoke** pada token demo.
   - **Cloudflare**: `My Profile` ➡️ `API Tokens` ➡️ Klik tiga titik `...` pada token ➡️ Pilih **Delete** atau **Roll**.

---

## 💡 Skrip & Tips Menarik Semasa Live Demo Bersama Kawan

Biar kawan korang ternganga kagum! Ni susunan jalan cerita (storyline demo) yang Puteri cadangkan:

| Fasa Demo | Apa Nak Kata / Buat | Kesan Wow |
| :--- | :--- | :--- |
| **1. Pembuka (Pain Point)** | *"Korang bayangkan nak deploy app kena lompat-lompat 3 tab browser... leceh kan?"* | Kawan rasa terpanggil sebab memang selalu kena macam tu. |
| **2. Tunjuk Fail Config** | *"Sebenarnya kita cuma tambah beberapa baris JSON je dalam Claude Desktop..."* | Kawan nampak mudah & tak perlu coding backend yang susah. |
| **3. Live Execution (The Magic)** | Buka Claude, klik ikon tukul / tools 🔨. Tunjuk list tools dari GitHub, Vercel & Cloudflare dah muncul! | *"Wah, Claude dah kenal akaun kita!"* |
| **4. Super Prompt (Cross-Service)** | Beri prompt gabungan: *"Tolong check commit latest di GitHub, pastikan Vercel dah deploy commit tu, dan check Worker Cloudflare kita aktif!"* | **Momen Paling Gempak!** AI semak 3 platform berbeza dalam satu nafas! 🤯 |
| **5. Penutup (Keselamatan)** | Tunjuk cara padam token serta-merta selepas habis kerja. | Kawan nampak korang seorang developer yang profesional & berhemah. |

---

## ❓ Soalan Lazim & Penyelesaian Masalah (Troubleshooting)

- **S: Kenapa ikon tools MCP tak muncul dalam chat Claude?**
  - *J*: Semak sama ada korang dah restart Claude Desktop sepenuhnya. Pastikan tiada ralat sintaks JSON (contohnya tertinggal koma `,` atau kurungan bertutup `}`).
- **S: Terminal keluar error `npx command not found`?**
  - *J*: Komputer korang belum pasang Node.js. Muat turun Node.js versi LTS dari [nodejs.org](https://nodejs.org).
- **S: Claude kata "Unauthorized / 401 Error"?**
  - *J*: Token salah, tertinggal aksara semasa copy-paste, atau token dah expired / scope tak cukup.

---

*Selamat berdemo dan semoga sesi perkongsian korang bersama kawan-kawan berjalan dengan hebat dan menyeronokkan! Kalau ada apa-apa, Puteri sentiasa ada untuk bantu!* 💖✨
