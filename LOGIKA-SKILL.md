
```markdown
---
name: elearning-dev-agent
description: >
  Gunakan skill ini untuk SEMUA tugas pengembangan pada proyek platform E-Learning. 
  Fokus pada HTML, CSS murni, dan Vanilla JavaScript. Data bersifat dinamis menggunakan 
  simulasi database via LocalStorage dan data.js. Dilarang keras menggunakan framework tambahan.
project: E-Learning Platform
editor: Antigravity / Cursor
stack: HTML5, CSS3, Vanilla JavaScript, LocalStorage
---

# E-Learning Dev Agent — Master SKILL.md

## 1. Project Identity

| Key | Value |
|---|---|
| **Project Name** | E-Learning Platform |
| **Purpose** | Platform kursus online dengan alur terstruktur (cari → beli → belajar) |
| **Stack Utama** | HTML5, CSS3 Murni, Vanilla JavaScript |
| **Database** | *Frontend-Only* (Kombinasi `data.js` untuk *seed data* & `localStorage` untuk CRUD) |
| **Desain UI** | *Soft*, modern, minimalis, dan minim distraksi |
| **Arsitektur** | Berbasis modul komponen UI berulang dan manipulasi DOM satu arah |

---

## 2. MANDATORY EXECUTION RULE — Anti-Hallucination Protocol

> **Aturan ini mengesampingkan segalanya. Wajib dipatuhi tanpa terkecuali.**

### Rule A — JavaScript Iteration Standard
- **Penting:** Dalam setiap penulisan *looping* manual (seperti `while` untuk merender elemen), **WAJIB** menggunakan sintaks inkrementasi `i += 1`. Jangan pernah gunakan `i = i + 1` atau `i++`.
- **Dilarang keras** menggunakan struktur kode yang kaku atau modul/desain *pattern* yang terlalu kompleks (seperti *Abstract Classes* atau abstraksi OOP yang berlapis). Gunakan pendekatan fungsional, dinamis, dan simpel.

### Rule B — Simulasi Database (LocalStorage CRUD)
Karena tidak ada *backend* server, semua interaksi data yang dinamis dan terhubung antar 50 halaman harus mematuhi alur ini:
- `data.js`: Hanya digunakan untuk menyuplai data kosong atau data *default* awal.
- `db.js`: Pusat operasi CRUD (*Create, Read, Update, Delete*). Ambil data dari `localStorage`, ubah datanya via JavaScript, lalu simpan kembali dengan `JSON.stringify()`.
- Jangan melakukan CRUD langsung ke variabel di memori biasa karena perubahan akan hilang saat pindah halaman.

### Rule C — Multi-Component Request
Jika pengguna meminta pembuatan halaman yang kompleks:
1. Pikirkan ulang komponen apa saja yang bisa digunakan kembali (dari folder `components/`).
2. Buat kerangka HTML & *layout* CSS terlebih dahulu.
3. Terakhir, injeksikan logika Vanilla JS untuk menarik data dari `db.js` dan merendernya.

---

## 3. Folder Structure

```text
elearning-platform/
├── assets/
│   ├── img/                   # Banner promo, thumbnail, foto profil
│   └── icons/                 # Ikon SVG (minimalis)
├── css/
│   ├── globals.css            # Variabel warna dasar, reset CSS
│   ├── components.css         # Gaya elemen berulang (.btn, .card, .form-control)
│   └── layout.css             # Gaya struktur utama (Grid, Sidebar, Navbar)
├── js/
│   ├── data.js                # Kumpulan data awal (Seed Data)
│   ├── db.js                  # Logika CRUD utama terhubung ke LocalStorage
│   └── render.js              # Fungsi manipulasi DOM / render UI
├── components/                # Potongan HTML yang dapat disematkan ulang
│   ├── navbar.html
│   ├── sidebar-student.html
│   ├── course-card.html
│   └── footer.html
└── views/                     # 50 Halaman Antarmuka
    ├── public/                # Landing Page, Login, Register, FAQ
    ├── student/               # Dashboard, Ruang Belajar, Cart, Checkout
    ├── instructor/            # Manajemen Kelas, Upload Video, QnA
    └── admin/                 # Manajemen Pengguna, Verifikasi Transaksi

```

---

## 4. Design System

### 4.1 Color Tokens (`globals.css`)

Gunakan palet warna ini untuk mempertahankan tampilan *soft* & modern:

| CSS Variable | Hex | Penggunaan |
| --- | --- | --- |
| `--color-primary` | `#6366f1` | Aksi utama, tombol beli, progres |
| `--color-primary-soft` | `#e0e7ff` | *Hover state*, aksen *background* |
| `--color-bg-main` | `#f8fafc` | Latar belakang halaman luar |
| `--color-bg-card` | `#ffffff` | Latar belakang *Card* dan ruang baca |
| `--color-text-dark` | `#0f172a` | Judul (H1-H6) |
| `--color-text-body` | `#475569` | Teks paragraf, deksripsi |
| `--color-border` | `#e2e8f0` | Garis pemisah, *border* form |

---

## 5. UI Rendering Pattern

Terapkan manipulasi DOM satu arah yang terstruktur dengan standar *looping* wajib. Jangan menyatukan tipe data yang berbeda (seperti *string* dan *number* langsung) yang bisa mengacaukan logika pengurutan/rendering.

```javascript
// Memanggil data dari file db.js
const courses = getAll('courses');

function renderCourseList() {
  const container = document.getElementById('course-container');
  container.innerHTML = '';
  
  let htmlString = '';
  let i = 0;
  
  while (i < courses.length) {
    const course = courses[i];
    htmlString += `
      <div class="card">
        <h3>${course.title}</h3>
        <p>Harga: Rp ${course.price}</p>
        <button onclick="beliKelas(${course.id})" class="btn btn-primary">Beli</button>
      </div>
    `;
    i += 1; // Aturan inkrementasi wajib
  }
  
  container.innerHTML = htmlString;
}

```

---

## 6. Antarmuka (Peta 50 Interface)

Gunakan referensi ini agar tidak ada halaman yang terlewat:

* **Modul Publik (8 Interface):** Landing Page, Login, Registrasi Siswa, Registrasi Instruktur, Lupa Password, Reset Password, S&K, FAQ.
* **Modul Siswa (17 Interface):** Dashboard, Katalog, Detail Kelas, Cart, Checkout, Invoice, Ruang Belajar Utama (Pemutar Video), Kuis, Hasil Kuis, Diskusi, Sertifikat, Profil, Riwayat, Wishlist, Ulasan, Daftar Instruktur, Notifikasi.
* **Modul Instruktur (15 Interface):** Dashboard, Daftar Kelas, Buat Kelas, Manajemen Silabus, Upload Materi, Buat Kuis, Daftar Siswa Terdaftar, QnA, Pengaturan Diskon, Profil Publik, Laporan Pendapatan, Form Withdrawal, Riwayat Withdrawal, Ulasan Siswa, Notifikasi.
* **Modul Admin (10 Interface):** Dashboard Utama, Data Siswa, Data Instruktur, Persetujuan Kelas, Verifikasi Pembayaran, Verifikasi Withdrawal, Kategori, Moderasi Ulasan, Pengaturan Banner, Manajemen Admin.

---

## 7. Key Constraints & Anti-Patterns

| ❌ Jangan Lakukan | ✅ Lakukan Ini |
| --- | --- |
| Menggunakan `i = i + 1` atau `i++` pada *loop* | **Gunakan pendekatan konsisten `i += 1**` |
| Membuat hierarki logika JS dengan *Abstract Classes* | **Gunakan fungsi Vanilla JS murni yang sederhana & dinamis** |
| Menambahkan *framework* luar (React, Vue, Alpine, dll) | **Tetap berpegang pada HTML, CSS, Vanilla JS, dan LocalStorage** |
| Hardcode array dinamis di dalam file halaman HTML | **Panggil `getAll()` dari `db.js` untuk menarik data dari LocalStorage** |
| Menambahkan warna hex langsung (`#ff0000`) pada HTML | **Gunakan variabel warna CSS dari root `globals.css**` |

```

```