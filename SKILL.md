---
name: elearning-dev-agent
description: >
  Gunakan skill ini untuk tugas pengembangan lanjutan pada proyek platform E-Learning. 
  Antarmuka statis (HTML/CSS) sudah selesai. Fokus utama sekarang adalah menyuntikkan 
  logika manipulasi DOM dinamis dengan Vanilla JavaScript, merender komponen, dan 
  menjalankan operasi CRUD menggunakan simulasi database via LocalStorage dan data.js.
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
| **Status Proyek**| Pembuatan antarmuka statis (HTML & CSS) **sudah selesai**. Fokus pada injeksi JavaScript. |
| **Arsitektur** | Berbasis modul komponen UI berulang dan manipulasi DOM satu arah |

---

## 2. MANDATORY EXECUTION RULE — Anti-Hallucination Protocol

> **Aturan ini mengesampingkan segalanya. Wajib dipatuhi tanpa terkecuali.**

### Rule A — JavaScript Iteration Standard
- **Penting:** Dalam setiap penulisan *looping* manual (seperti `while` untuk merender elemen), **WAJIB** menggunakan sintaks inkrementasi `i += 1`. Jangan pernah gunakan `i = i + 1` atau `i++`.
- **Dilarang keras** menggunakan struktur kode yang kaku atau modul/desain *pattern* yang terlalu kompleks (seperti *Abstract Classes* atau abstraksi OOP yang berlapis). Gunakan pendekatan fungsional, dinamis, dan simpel.

### Rule B — Simulasi Database (LocalStorage CRUD)
Karena tidak ada *backend* server, semua interaksi data yang dinamis dan terhubung antar 50 halaman harus mematuhi alur ini:
- `data.js`: Hanya digunakan untuk menyuplai data kosong atau data *default* awal (*Seed Data*).
- `db.js`: Pusat operasi CRUD (*Create, Read, Update, Delete*). Ambil data dari `localStorage`, ubah datanya via JavaScript, lalu simpan kembali dengan `JSON.stringify()`.
- DILARANG KERAS melakukan CRUD langsung ke variabel di memori biasa karena perubahan akan hilang saat halaman di-*refresh*.

### Rule C — Isolated Execution
Jika pengguna meminta untuk membuat logika halaman tertentu, buat secara berurutan:
1. Pastikan struktur data di `db.js` / `data.js` sudah siap.
2. Buat fungsi logika di `render.js` atau *script* khusus halaman tersebut.
3. Sambungkan ke elemen HTML yang sudah ada.

---

## 3. Folder Structure

```text
elearning-platform/
├── assets/
│   ├── img/                   # Banner promo, thumbnail, foto profil
│   └── icons/                 # Ikon SVG (minimalis)
├── css/                       # (SUDAH SELESAI DIBANGUN)
│   ├── globals.css            
│   ├── components.css         
│   └── layout.css             
├── js/                        # (FOKUS AREA KERJA SAAT INI)
│   ├── data.js                # Kumpulan data awal (Seed Data)
│   ├── db.js                  # Logika CRUD utama terhubung ke LocalStorage
│   └── render.js              # Fungsi manipulasi DOM / render UI
├── components/                # Potongan HTML yang dapat disematkan ulang
└── views/                     # 50 Halaman Antarmuka (HTML sudah siap)
    ├── public/                
    ├── student/               
    ├── instructor/            
    └── admin/                 

```

---

## 4. UI Rendering Pattern (Dynamic via LocalStorage)

Hindari penggunaan abstraksi *framework*. Terapkan manipulasi DOM satu arah yang terstruktur. Ambil data dari `db.js` dan render ke antarmuka HTML menggunakan standar *looping* wajib. Jangan menyatukan tipe data yang berbeda (seperti teks dan angka) pada logika *sorting* atau validasi yang bisa memicu *error* eksekusi.

```javascript
// Contoh Logika Render Dinamis
// Pastikan skrip data.js dan db.js sudah dimuat di HTML sebelum kode ini berjalan

function renderCourseList() {
  const courses = getAll('courses'); // Memanggil data dinamis dari file db.js
  const container = document.getElementById('course-container');
  
  if (!container) return;
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

## 5. Antarmuka (Peta 50 Interface)

Gunakan referensi ini sebagai panduan saat menghubungkan logika JS ke halaman HTML:

* **Modul Publik (8 Interface):** Landing Page, Login, Registrasi Siswa, Registrasi Instruktur, Lupa Password, Reset Password, S&K, FAQ.
* **Modul Siswa (17 Interface):** Dashboard, Katalog, Detail Kelas, Cart, Checkout, Invoice, Ruang Belajar Utama (Pemutar Video), Kuis, Hasil Kuis, Diskusi, Sertifikat, Profil, Riwayat, Wishlist, Ulasan, Daftar Instruktur, Notifikasi.
* **Modul Instruktur (15 Interface):** Dashboard, Daftar Kelas, Buat Kelas, Manajemen Silabus, Upload Materi, Buat Kuis, Daftar Siswa Terdaftar, QnA, Pengaturan Diskon, Profil Publik, Laporan Pendapatan, Form Withdrawal, Riwayat Withdrawal, Ulasan Siswa, Notifikasi.
* **Modul Admin (10 Interface):** Dashboard Utama, Data Siswa, Data Instruktur, Persetujuan Kelas, Verifikasi Pembayaran, Verifikasi Withdrawal, Kategori, Moderasi Ulasan, Pengaturan Banner, Manajemen Admin.

---

## 6. Key Constraints & Anti-Patterns

| ❌ Jangan Lakukan | ✅ Lakukan Ini |
| --- | --- |
| Menggunakan `i = i + 1` atau `i++` pada *loop* | **Gunakan pendekatan konsisten `i += 1**` |
| Membuat hierarki logika JS berbasis *Abstract Classes* | **Gunakan pendekatan kode sederhana, fungsional, dan linier** |
| Menambahkan *framework* luar (React, Vue, dll) | **Tetap berpegang pada Vanilla HTML, CSS Murni, dan Vanilla JS** |
| *Hardcode* array dinamis di dalam *file* halaman JS/HTML | **Panggil fungsi baca dari `db.js` untuk menarik data dari `localStorage**` |
| Mencampur seluruh *layout* HTML dalam satu file panjang | **Pisahkan elemen ke `components/` untuk di-include** |
| Menambahkan warna *hardcode* pada HTML | **Gunakan variabel warna CSS dari root `globals.css**` |

```

```
