
---
name: elearning-dev-agent
description: >
  Gunakan skill ini untuk SEMUA tugas pengembangan pada proyek platform E-Learning — membangun halaman HTML, styling CSS murni, dan manipulasi DOM dengan Vanilla JavaScript. Picu kapan pun pengguna meminta untuk membuat, mengedit, atau memperbaiki file apa pun di dalam basis kode proyek E-Learning ini.
project: E-Learning Platform
editor: Antigravity
stack: HTML5, CSS3, Vanilla JavaScript
---

# E-Learning Dev Agent — Master SKILL.md

## 1. Project Identity

| Key | Value |
|---|---|
| **Project Name** | E-Learning Platform |
| **Purpose** | Platform kursus online dengan alur terstruktur: pencarian kelas → pembelian akses → konsumsi materi |
| **Editor** | Antigravity |
| **Stack Utama** | HTML5, CSS3 Murni, Vanilla JavaScript |
| **Desain UI** | *Soft*, modern, minimalis, dan minim distraksi |
| **Arsitektur** | Berbasis modul (Publik, Siswa, Instruktur, Admin) dengan antarmuka dinamis (*reusable components*) |

---

## 2. MANDATORY EXECUTION RULE — Anti-Hallucination Protocol

> **Aturan ini mengesampingkan segalanya. Selalu baca bagian ini terlebih dahulu.**

### Rule A — Multi-Interface / Multi-Component Request
Jika pengguna meminta untuk membangun halaman yang memiliki banyak komponen atau *layout* kompleks (misal: "Buat halaman Katalog Kelas dengan sidebar dan grid kelas"), Anda **DILARANG KERAS** menulis seluruh kode secara bersamaan.

Anda WAJIB mengikuti alur dua fase ini:

#### Phase 1: Confirm & Clarify (TANPA KODE)
1. Ulangi struktur yang diminta secara singkat.
2. Identifikasi komponen mana yang bisa dipanggil ulang (dari folder `components/`).
3. Jika ada detail yang ambigu, **BERHENTI dan tanyakan** sebelum menulis kode.

#### Phase 2: Isolated Execution
- Hanya buat kode setelah rencana dikonfirmasi.
- Buat file satu per satu: mulai dari kerangka HTML, lalu *styling* CSS, dan terakhir injeksi logika Vanilla JS.

### Rule B — Pendekatan Kode Sederhana & Linier
- **Dilarang menggunakan hierarki kode yang kaku** seperti *abstract classes* atau desain *pattern* yang terlalu kompleks.
- Terapkan struktur logika yang sederhana, dinamis, dan langsung pada tujuan.
- Untuk *looping* atau iterasi dalam merender antarmuka (seperti memunculkan daftar video), **wajib** menggunakan sintaks inkrementasi `i += 1` (jangan gunakan `i = i + 1`).

### Rule C — Design System Before Styling
Sebelum menulis CSS apa pun, jadikan Bagian 4 (Design System) sebagai referensi untuk memastikan token warna dan utilitas kelas sesuai dengan tema *soft* & modern.

---

## 3. Folder Structure

```text
elearning-platform/
├── assets/
│   ├── img/                   # Banner promo, thumbnail kelas, ilustrasi
│   └── icons/                 # Ikon SVG (minimalis)
│
├── css/
│   ├── globals.css            # Variabel warna dasar, font, reset CSS
│   ├── components.css         # Gaya elemen berulang (.btn, .card, .form-control)
│   └── layout.css             # Gaya struktur utama (Grid, Sidebar, Navbar)
│
├── js/
│   ├── main.js                # Inisialisasi global
│   ├── render.js              # Logika manipulasi DOM sederhana untuk merender komponen
│   └── utils.js               # Fungsi pembantu (format uang, validasi sederhana)
│
├── components/                # Potongan HTML yang dapat disematkan ulang secara dinamis
│   ├── navbar-public.html
│   ├── sidebar-student.html
│   ├── sidebar-instructor.html
│   ├── sidebar-admin.html
│   ├── course-card.html
│   └── footer.html
│
└── views/                     # 50 Halaman Antarmuka Utama
    ├── public/                # 8 Interface (Landing Page, Login, Register...)
    ├── student/               # 17 Interface (Dashboard, Ruang Belajar, Cart...)
    ├── instructor/            # 15 Interface (Manajemen Kelas, Upload Video...)
    └── admin/                 # 10 Interface (Manajemen Pengguna, Verifikasi...)

```

---

## 4. Design System

### 4.1 Color Tokens (didefinisikan di `globals.css` dalam `:root`)

Gunakan palet warna ini untuk mempertahankan tampilan yang lembut, bersih, dan modern:

| CSS Variable | Hex | Penggunaan |
| --- | --- | --- |
| `--color-primary` | `#6366f1` | Aksi utama, indikator progres, tombol *checkout* |
| `--color-primary-soft` | `#e0e7ff` | *Hover state* tombol sekunder, aksen *background* |
| `--color-bg-main` | `#f8fafc` | Latar belakang halaman (hindari putih murni untuk ruang baca) |
| `--color-bg-card` | `#ffffff` | Latar belakang *Card* kelas, panel kuis, dan ruang video |
| `--color-text-dark` | `#0f172a` | Judul (H1-H6) dan teks penekanan utama |
| `--color-text-body` | `#475569` | Teks paragraf, deksripsi silabus, instruksi |
| `--color-border` | `#e2e8f0` | Garis pemisah, *border* input form |
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.1)` | Bayangan statis kartu/panel |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.05)` | Bayangan dinamis saat *hover* |

### 4.2 Global CSS Component Classes

Gunakan kelas utilitas bawaan dari `components.css` ini agar seragam:

```css
/* Layout & Container */
.container-main  { max-width: 1200px; margin: 0 auto; padding: 2rem 1.5rem; }
.page-title      { font-size: 1.5rem; font-weight: 700; color: var(--color-text-dark); margin-bottom: 1.5rem; }

/* Cards */
.card            { background: var(--color-bg-card); border-radius: 12px; border: 1px solid var(--color-border); box-shadow: var(--shadow-sm); transition: transform 0.2s; }
.card:hover      { transform: translateY(-2px); box-shadow: var(--shadow-md); }

/* Buttons */
.btn             { display: inline-flex; align-items: center; justify-content: center; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 500; cursor: pointer; border: none; transition: all 0.2s ease; }
.btn-primary     { background-color: var(--color-primary); color: #fff; }
.btn-secondary   { background-color: var(--color-bg-main); color: var(--color-text-dark); border: 1px solid var(--color-border); }

/* Forms */
.form-group      { margin-bottom: 1.25rem; }
.form-label      { display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500; color: var(--color-text-dark); }
.form-control    { width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--color-border); border-radius: 8px; font-size: 0.95rem; }

```

---

## 5. Vanilla JS UI Patterns

Hindari penggunaan abstraksi *framework*. Terapkan manipulasi DOM satu arah yang terstruktur:

### 5.1 Merender Daftar Modul secara Dinamis

Gunakan *looping* sederhana untuk merender antarmuka berulang. Wajib gunakan `i += 1`.

```javascript
const courseModules = [
  { title: "Pengenalan Ekosistem", duration: "10 min" },
  { title: "Instalasi Tools", duration: "15 min" },
  { title: "Praktik Dasar", duration: "25 min" }
];

function renderModules(modules) {
  const container = document.getElementById('module-container');
  container.innerHTML = ''; 
  let htmlString = '';
  
  let i = 0;
  while (i < modules.length) {
    const item = modules[i];
    htmlString += `
      <div class="module-item">
        <h4 class="module-title">${item.title}</h4>
        <span class="module-duration">${item.duration}</span>
      </div>
    `;
    i += 1; // Aturan wajib inkrementasi
  }
  
  container.innerHTML = htmlString;
}

```

---

## 6. Daftar Rincian 50 Antarmuka (Peta Implementasi)

Gunakan daftar ini sebagai *checkpoint* operasional saat membuat file HTML.

### Modul 1: Publik & Autentikasi (8 Interface)

1. `views/public/landing.html` - Halaman Utama (*Landing Page*)
2. `views/public/login.html` - Halaman *Login* (Universal)
3. `views/public/register-student.html` - Registrasi Siswa
4. `views/public/register-instructor.html` - Registrasi Mentor/Instruktur
5. `views/public/forgot-password.html` - Halaman Lupa *Password*
6. `views/public/reset-password.html` - Halaman *Reset Password*
7. `views/public/terms.html` - Syarat & Ketentuan
8. `views/public/faq.html` - FAQ (Tanya Jawab)

### Modul 2: Siswa / Ruang Belajar (17 Interface)

1. `views/student/dashboard.html` - *Dashboard* Siswa (Progres Kelas)
2. `views/student/catalog.html` - Katalog Kelas Utama
3. `views/student/course-detail.html` - Detail Kelas (Publik)
4. `views/student/cart.html` - Keranjang Pembelian (*Cart*)
5. `views/student/checkout.html` - *Checkout* & Metode Pembayaran
6. `views/student/invoice.html` - Konfirmasi / *Invoice* Pembayaran
7. `views/student/learning-room.html` - Ruang Belajar Utama (Pemutar Video & Panel)
8. `views/student/quiz.html` - Halaman Kuis / Evaluasi
9. `views/student/quiz-result.html` - Hasil Kuis & Pembahasan
10. `views/student/discussion.html` - Ruang Diskusi Kelas
11. `views/student/certificate.html` - Halaman Sertifikat
12. `views/student/profile.html` - Profil Siswa & Pengaturan Akun
13. `views/student/transaction-history.html` - Riwayat Transaksi Pembelian
14. `views/student/wishlist.html` - *Wishlist* / Kelas Tersimpan
15. `views/student/review-form.html` - Formulir Ulasan & *Rating*
16. `views/student/instructor-list.html` - Daftar Instruktur
17. `views/student/notifications.html` - Halaman Notifikasi Siswa

### Modul 3: Instruktur / Kreator (15 Interface)

1. `views/instructor/dashboard.html` - *Dashboard* Instruktur (Statistik & Pendapatan)
2. `views/instructor/my-courses.html` - Daftar Kelas Saya
3. `views/instructor/create-course.html` - Form Pembuatan Kelas Baru
4. `views/instructor/curriculum-manager.html` - Manajemen Kurikulum/Silabus
5. `views/instructor/upload-materials.html` - Form Unggah Video & Materi Pendukung
6. `views/instructor/create-quiz.html` - Form Pembuatan Kuis
7. `views/instructor/enrolled-students.html` - Daftar Siswa Terdaftar
8. `views/instructor/qna-panel.html` - Panel Tanya-Jawab (*Q&A*)
9. `views/instructor/discount-settings.html` - Pengaturan Diskon / Kupon Kelas
10. `views/instructor/public-profile.html` - Pengaturan Profil Publik Instruktur
11. `views/instructor/revenue-report.html` - Laporan Detail Pendapatan
12. `views/instructor/withdrawal-form.html` - Formulir Penarikan Saldo
13. `views/instructor/withdrawal-history.html` - Riwayat Penarikan Saldo
14. `views/instructor/reviews.html` - Halaman Ulasan (Melihat *rating* siswa)
15. `views/instructor/notifications.html` - Halaman Notifikasi Instruktur

### Modul 4: Admin Sistem (10 Interface)

1. `views/admin/dashboard.html` - *Dashboard* Admin Utama
2. `views/admin/manage-students.html` - Manajemen Data Siswa
3. `views/admin/manage-instructors.html` - Manajemen Data Instruktur
4. `views/admin/approve-courses.html` - Persetujuan Kelas Baru
5. `views/admin/verify-payments.html` - Verifikasi Pembayaran Transaksi
6. `views/admin/verify-withdrawals.html` - Verifikasi Penarikan Saldo
7. `views/admin/manage-categories.html` - Manajemen Kategori Kelas
8. `views/admin/moderate-reviews.html` - Moderasi Laporan & Ulasan
9. `views/admin/homepage-settings.html` - Pengaturan *Banner* & Promo
10. `views/admin/manage-admins.html` - Manajemen Akun Admin Sistem

---

## 7. Key Constraints & Anti-Patterns

| ❌ Jangan Lakukan | ✅ Lakukan Ini |
| --- | --- |
| Mencampur seluruh *layout* dalam satu file panjang | Pisahkan elemen Navbar, Sidebar ke folder `components/` untuk di-*include* |
| Membuat hierarki logika JS berbasis *Abstract Classes* | Gunakan pendekatan kode sederhana, fungsional, dan linier |
| Menggunakan `i = i + 1` atau `i++` pada iterasi *loop* | Gunakan pendekatan konsisten `i += 1` |
| Menambahkan *framework* luar (React, Vue, dll) | Tetap berpegang pada Vanilla HTML, CSS Murni, dan Vanilla JS |
| Menambahkan warna *hardcode* pada setiap elemen HTML | Gunakan variabel warna CSS dari root `globals.css` |

```

```