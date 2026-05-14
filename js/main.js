function buildFeaturedCourseCardsForLanding() {
  if (typeof getAll !== "function") {
    return [];
  }
  const courses = getAll("courses");
  const out = [];
  let i = 0;
  while (i < courses.length) {
    const c = courses[i];
    if (c && c.featured === true && c.status === "published") {
      const meta =
        typeof c.moduleMeta === "string" && c.moduleMeta.length > 0 ? c.moduleMeta : "Kelas pilihan";
      out.push({
        title: c.title,
        meta: meta,
        price: c.price,
        badge: c.badge,
        href: "../student/course-detail.html?id=" + encodeURIComponent(String(c.id)),
      });
    }
    i += 1;
  }
  return out;
}

function initLandingDemoCourses() {
  const el = document.getElementById("landing-course-grid");
  if (!el) {
    return;
  }
  const cards = buildFeaturedCourseCardsForLanding();
  if (cards.length > 0) {
    renderCourseCards("landing-course-grid", cards);
    return;
  }
  renderCourseCards("landing-course-grid", [
    {
      title: "Dasar Pemrograman Web",
      meta: "12 modul",
      price: 199000,
      badge: "Populer",
    },
    {
      title: "Desain UI untuk Pemula",
      meta: "8 modul",
      price: 249000,
      badge: "Baru",
    },
    {
      title: "Manajemen Produk Digital",
      meta: "10 modul",
      price: 299000,
      badge: "Unggulan",
    },
  ]);
}

function initFaqPage() {
  const el = document.getElementById("faq-list");
  if (!el) {
    return;
  }
  const faqItems = [
    {
      question: "Bagaimana cara mendaftar sebagai siswa?",
      answer:
        "Buka halaman Daftar Siswa, isi data akun, setujui syarat ketentuan, lalu kirim formulir. Anda akan menerima petunjuk aktivasi melalui email (alur backend disimulasikan di front-end statis).",
    },
    {
      question: "Apa beda akun siswa dan instruktur?",
      answer:
        "Akun siswa untuk mengikuti kelas, kuis, dan sertifikat. Akun instruktur untuk membuat kelas, mengunggah materi, dan melihat laporan pendapatan.",
    },
    {
      question: "Metode pembayaran apa yang didukung?",
      answer:
        "Platform ini mendukung transfer bank dan e-wallet (raincheck integrasi). Detail metode akan muncul pada langkah checkout.",
    },
    {
      question: "Bagaimana jika lupa kata sandi?",
      answer:
        'Gunakan tautan "Lupa kata sandi?" di halaman masuk. Anda akan menerima email berisi tautan reset (simulasi).',
    },
  ];
  renderFaqList("faq-list", faqItems);
  wireFaqAccordion("faq-list");
}

function setFormError(inputId, message) {
  const input = document.getElementById(inputId);
  if (!input) {
    return;
  }
  const group = input.closest(".form-group");
  if (!group) {
    return;
  }
  const err = group.querySelector(".form-error");
  if (!err) {
    return;
  }
  err.textContent = message;
  err.classList.add("is-visible");
}

function clearFormErrors(form) {
  if (!form) {
    return;
  }
  const errs = form.querySelectorAll(".form-error");
  let i = 0;
  while (i < errs.length) {
    errs[i].classList.remove("is-visible");
    errs[i].textContent = "";
    i += 1;
  }
}

function wireAuthDemoForms() {
  const loginForm = document.getElementById("form-login");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      clearFormErrors(loginForm);
      const email = document.getElementById("login-email");
      const pass = document.getElementById("login-password");
      let ok = true;
      if (!isValidEmail(email.value)) {
        setFormError("login-email", "Email tidak valid.");
        ok = false;
      }
      if (!isNonEmptyString(pass.value)) {
        setFormError("login-password", "Kata sandi wajib diisi.");
        ok = false;
      }
      if (ok) {
        alert("Validasi OK (demo). Hubungkan ke API backend untuk login sesungguhnya.");
      }
    });
  }

  const regStudent = document.getElementById("form-register-student");
  if (regStudent) {
    regStudent.addEventListener("submit", function (e) {
      e.preventDefault();
      clearFormErrors(regStudent);
      let ok = true;
      if (!isNonEmptyString(document.getElementById("reg-s-name").value)) {
        setFormError("reg-s-name", "Nama wajib diisi.");
        ok = false;
      }
      if (!isValidEmail(document.getElementById("reg-s-email").value)) {
        setFormError("reg-s-email", "Email tidak valid.");
        ok = false;
      }
      const p1 = document.getElementById("reg-s-password").value;
      const p2 = document.getElementById("reg-s-password2").value;
      if (!isNonEmptyString(p1) || p1.length < 8) {
        setFormError("reg-s-password", "Minimal 8 karakter.");
        ok = false;
      }
      if (!passwordsMatch(p1, p2)) {
        setFormError("reg-s-password2", "Konfirmasi tidak cocok.");
        ok = false;
      }
      if (!document.getElementById("reg-s-agree").checked) {
        alert("Anda harus menyetujui syarat & ketentuan.");
        ok = false;
      }
      if (ok) {
        alert("Pendaftaran siswa (demo) berhasil divalidasi.");
      }
    });
  }

  const regInst = document.getElementById("form-register-instructor");
  if (regInst) {
    regInst.addEventListener("submit", function (e) {
      e.preventDefault();
      clearFormErrors(regInst);
      let ok = true;
      if (!isNonEmptyString(document.getElementById("reg-i-name").value)) {
        setFormError("reg-i-name", "Nama wajib diisi.");
        ok = false;
      }
      if (!isValidEmail(document.getElementById("reg-i-email").value)) {
        setFormError("reg-i-email", "Email tidak valid.");
        ok = false;
      }
      if (!isNonEmptyString(document.getElementById("reg-i-expertise").value)) {
        setFormError("reg-i-expertise", "Bidang keahlian wajib diisi.");
        ok = false;
      }
      const p1 = document.getElementById("reg-i-password").value;
      const p2 = document.getElementById("reg-i-password2").value;
      if (!isNonEmptyString(p1) || p1.length < 8) {
        setFormError("reg-i-password", "Minimal 8 karakter.");
        ok = false;
      }
      if (!passwordsMatch(p1, p2)) {
        setFormError("reg-i-password2", "Konfirmasi tidak cocok.");
        ok = false;
      }
      if (!document.getElementById("reg-i-agree").checked) {
        alert("Anda harus menyetujui syarat & ketentuan.");
        ok = false;
      }
      if (ok) {
        alert("Pendaftaran instruktur (demo) berhasil divalidasi.");
      }
    });
  }

  const forgot = document.getElementById("form-forgot-password");
  if (forgot) {
    forgot.addEventListener("submit", function (e) {
      e.preventDefault();
      clearFormErrors(forgot);
      if (!isValidEmail(document.getElementById("forgot-email").value)) {
        setFormError("forgot-email", "Email tidak valid.");
        return;
      }
      alert("Instruksi reset (demo) akan dikirim ke email Anda.");
    });
  }

  const reset = document.getElementById("form-reset-password");
  if (reset) {
    reset.addEventListener("submit", function (e) {
      e.preventDefault();
      clearFormErrors(reset);
      const p1 = document.getElementById("reset-password").value;
      const p2 = document.getElementById("reset-password2").value;
      let ok = true;
      if (!isNonEmptyString(p1) || p1.length < 8) {
        setFormError("reset-password", "Minimal 8 karakter.");
        ok = false;
      }
      if (!passwordsMatch(p1, p2)) {
        setFormError("reset-password2", "Konfirmasi tidak cocok.");
        ok = false;
      }
      if (ok) {
        alert("Kata sandi diperbarui (demo).");
      }
    });
  }
}

function getDemoStudentCourses() {
  return [
    {
      title: "Dasar Pemrograman Web",
      meta: "12 modul",
      price: 199000,
      badge: "Populer",
      href: "course-detail.html",
    },
    {
      title: "Desain UI untuk Pemula",
      meta: "8 modul",
      price: 249000,
      badge: "Baru",
      href: "course-detail.html",
    },
    {
      title: "Manajemen Produk Digital",
      meta: "10 modul",
      price: 299000,
      badge: "Unggulan",
      href: "course-detail.html",
    },
  ];
}

function initStudentCatalog() {
  const el = document.getElementById("course-container");
  if (!el) {
    return;
  }
  if (typeof renderCatalog === "function") {
    renderCatalog();
    return;
  }
  renderCourseCards("course-container", getDemoStudentCourses());
}

function initStudentWishlist() {
  const el = document.getElementById("student-wishlist-grid");
  if (!el) {
    return;
  }
  const all = getDemoStudentCourses();
  const subset = [all[0], all[2]];
  renderCourseCards("student-wishlist-grid", subset);
}

function initStudentDashboardCourses() {
  if (typeof renderDashboard === "function") {
    const myCourses = document.getElementById("my-courses-container");
    if (myCourses) {
      renderDashboard(getActiveStudentId());
    }
  }
  const el = document.getElementById("student-continue-grid");
  if (!el) {
    return;
  }
  const all = getDemoStudentCourses();
  const subset = [all[0], all[1]];
  const courseIds = [1, 2];
  let i = 0;
  while (i < subset.length) {
    const cid = courseIds[i] !== undefined ? courseIds[i] : 1;
    subset[i].href = "learning-room.html?courseId=" + encodeURIComponent(String(cid));
    i += 1;
  }
  renderCourseCards("student-continue-grid", subset);
}

function initStudentLearningRoom() {
  const playlistHost = document.getElementById("playlist-container");
  if (!playlistHost) {
    return;
  }
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("courseId");
  let courseId = 1;
  if (raw !== null && raw !== "") {
    const n = Number(raw);
    if (!Number.isNaN(n)) {
      courseId = n;
    }
  }
  if (typeof renderLearningRoom === "function") {
    renderLearningRoom(courseId);
  }
}

function initStudentNotifications() {
  const el = document.getElementById("student-notif-list");
  if (!el) {
    return;
  }
  const items = [
    {
      title: "Pembayaran dikonfirmasi",
      body: "Akses kelas Manajemen Produk Digital sudah aktif.",
      time: "2 jam lalu",
      unread: true,
    },
    {
      title: "Jadwal kuis diperbarui",
      body: "Instruktur menambah jendela pengumpulan untuk modul 4.",
      time: "Kemarin",
      unread: true,
    },
    {
      title: "Balasan diskusi",
      body: "Mentor membalas pertanyaan Anda di ruang diskusi.",
      time: "3 hari lalu",
      unread: false,
    },
  ];
  renderNotificationList("student-notif-list", items);
}

function initStudentTransactions() {
  const el = document.getElementById("student-tx-tbody");
  if (!el) {
    return;
  }
  const rows = [
    {
      id: "INV-2026-0142",
      course: "Desain UI untuk Pemula",
      amount: 249000,
      status: "Lunas",
      date: "12 Mei 2026",
    },
    {
      id: "INV-2026-0098",
      course: "Dasar Pemrograman Web",
      amount: 199000,
      status: "Lunas",
      date: "2 Mei 2026",
    },
  ];
  renderTransactionRows("student-tx-tbody", rows);
}

function wireQuizDemoForm() {
  const form = document.getElementById("form-quiz-demo");
  if (!form) {
    return;
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    window.location.href = "quiz-result.html";
  });
}

function getDemoInstructorCourses() {
  return [
    {
      title: "Dasar Pemrograman Web",
      meta: "12 modul · 1.240 siswa",
      status: "Terbit",
      href: "curriculum-manager.html",
    },
    {
      title: "Workshop UI Mobile",
      meta: "6 modul · 412 siswa",
      status: "Draft",
      href: "create-course.html",
    },
    {
      title: "Manajemen Produk Digital",
      meta: "10 modul · 890 siswa",
      status: "Menunggu review",
      href: "my-courses.html",
    },
  ];
}

function initInstructorDashboard() {
  const el = document.getElementById("instructor-dash-courses");
  if (!el) {
    return;
  }
  const subset = getDemoInstructorCourses().slice(0, 2);
  renderInstructorManageCards("instructor-dash-courses", subset);
}

function initInstructorMyCourses() {
  const el = document.getElementById("instructor-my-courses-grid");
  if (!el) {
    return;
  }
  renderInstructorManageCards("instructor-my-courses-grid", getDemoInstructorCourses());
}

function initInstructorCurriculum() {
  const el = document.getElementById("instructor-curriculum-tbody");
  if (!el) {
    return;
  }
  const rows = [
    { order: "1", title: "Perkenalan & alur belajar", type: "Video", duration: "08:00", status: "Terbit" },
    { order: "2", title: "HTML semantik", type: "Video", duration: "22:00", status: "Terbit" },
    { order: "3", title: "Latihan struktur halaman", type: "Tugas", duration: "—", status: "Draft" },
    { order: "4", title: "Checkpoint modul 1", type: "Kuis", duration: "15 soal", status: "Terbit" },
  ];
  renderCurriculumRows("instructor-curriculum-tbody", rows);
}

function initInstructorEnrolled() {
  const el = document.getElementById("instructor-enrolled-tbody");
  if (!el) {
    return;
  }
  const rows = [
    {
      name: "Rina Kusuma",
      email: "rina@email.demo",
      course: "Dasar Pemrograman Web",
      enrolled: "28 Apr 2026",
      progress: "42%",
    },
    {
      name: "Budi Hartono",
      email: "budi@email.demo",
      course: "Dasar Pemrograman Web",
      enrolled: "30 Apr 2026",
      progress: "18%",
    },
    {
      name: "Maya Sari",
      email: "maya@email.demo",
      course: "Manajemen Produk Digital",
      enrolled: "5 Mei 2026",
      progress: "76%",
    },
  ];
  renderEnrolledStudentRows("instructor-enrolled-tbody", rows);
}

function initInstructorQna() {
  const el = document.getElementById("instructor-qna-tbody");
  if (!el) {
    return;
  }
  const rows = [
    {
      course: "Dasar Pemrograman Web",
      student: "Rina K.",
      excerpt: "Bagaimana cara menautkan CSS eksternal…",
      posted: "13 Mei 2026",
      status: "Belum dijawab",
    },
    {
      course: "Manajemen Produk Digital",
      student: "Maya S.",
      excerpt: "Apakah template roadmap bisa digunakan…",
      posted: "12 Mei 2026",
      status: "Sudah dijawab",
    },
  ];
  renderQnaRows("instructor-qna-tbody", rows);
}

function initInstructorDiscounts() {
  const el = document.getElementById("instructor-discount-tbody");
  if (!el) {
    return;
  }
  const rows = [
    {
      code: "WEB10",
      course: "Dasar Pemrograman Web",
      value: "10%",
      expires: "30 Jun 2026",
      uses: "34 / 200",
    },
    {
      code: "PRODUK50K",
      course: "Manajemen Produk Digital",
      value: formatRupiah(50000),
      expires: "15 Mei 2026",
      uses: "12 / 80",
    },
  ];
  renderDiscountRows("instructor-discount-tbody", rows);
}

function initInstructorRevenue() {
  const el = document.getElementById("instructor-revenue-tbody");
  if (!el) {
    return;
  }
  const rows = [
    { period: "Apr 2026", gross: 18500000, fee: 1850000, net: 16650000, note: "Settled" },
    { period: "Mar 2026", gross: 16200000, fee: 1620000, net: 14580000, note: "Settled" },
    { period: "Feb 2026", gross: 14100000, fee: 1410000, net: 12690000, note: "Settled" },
  ];
  renderRevenueRows("instructor-revenue-tbody", rows);
}

function initInstructorWithdrawalHistory() {
  const el = document.getElementById("instructor-wd-tbody");
  if (!el) {
    return;
  }
  const rows = [
    {
      id: "WD-2026-0041",
      amount: 5000000,
      bank: "BCA · ****3210",
      status: "Selesai",
      date: "8 Mei 2026",
    },
    {
      id: "WD-2026-0012",
      amount: 3500000,
      bank: "BCA · ****3210",
      status: "Selesai",
      date: "10 Apr 2026",
    },
  ];
  renderWithdrawalRows("instructor-wd-tbody", rows);
}

function initInstructorReviews() {
  const el = document.getElementById("instructor-reviews-list");
  if (!el) {
    return;
  }
  const items = [
    {
      course: "Dasar Pemrograman Web",
      student: "Andi W.",
      date: "11 Mei 2026",
      stars: "5",
      comment: "Penjelasan modul awal sangat jelas dan contoh kodenya relevan.",
    },
    {
      course: "Manajemen Produk Digital",
      student: "Lia P.",
      date: "9 Mei 2026",
      stars: "4",
      comment: "Studi kasusnya membantu; perlu sedikit lebih banyak referensi bacaan.",
    },
  ];
  renderInstructorReviewCards("instructor-reviews-list", items);
}

function initInstructorNotifications() {
  const el = document.getElementById("instructor-notif-list");
  if (!el) {
    return;
  }
  const items = [
    {
      title: "Penarikan saldo disetujui",
      body: "Permintaan WD-2026-0041 telah ditransfer ke rekening terdaftar.",
      time: "1 jam lalu",
      unread: true,
    },
    {
      title: "Pertanyaan baru di kelas",
      body: "Siswa mengajukan pertanyaan di modul 2 — Dasar Pemrograman Web.",
      time: "Kemarin",
      unread: true,
    },
    {
      title: "Kelas lolos moderasi",
      body: "Workshop UI Mobile siap diterbitkan setelah Anda menambahkan thumbnail.",
      time: "3 hari lalu",
      unread: false,
    },
  ];
  renderNotificationList("instructor-notif-list", items);
}

function wireInstructorWithdrawalForm() {
  const form = document.getElementById("form-instructor-withdraw");
  if (!form) {
    return;
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearFormErrors(form);
    const amount = document.getElementById("wd-amount");
    const bank = document.getElementById("wd-bank");
    let ok = true;
    const n = amount ? Number(amount.value) : 0;
    if (!amount || !isNonEmptyString(amount.value) || Number.isNaN(n) || n < 100000) {
      setFormError("wd-amount", "Minimal penarikan Rp100.000 (demo).");
      ok = false;
    }
    if (!bank || !isNonEmptyString(bank.value)) {
      setFormError("wd-bank", "Pilih rekening tujuan.");
      ok = false;
    }
    if (ok) {
      alert("Permintaan penarikan (demo) tervalidasi. Hubungkan ke API untuk proses nyata.");
    }
  });
}

function wireInstructorUploadDemo() {
  const form = document.getElementById("form-instructor-upload");
  if (!form) {
    return;
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Unggah materi (demo): file akan diproses setelah backend tersedia.");
  });
}

function wireInstructorCreateCourse() {
  const form = document.getElementById("form-instructor-create-course");
  if (!form) {
    return;
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearFormErrors(form);
    const title = document.getElementById("cc-title");
    let ok = true;
    if (!title || !isNonEmptyString(title.value)) {
      setFormError("cc-title", "Judul kelas wajib diisi.");
      ok = false;
    }
    if (ok) {
      alert("Draf kelas (demo) disimpan. Lanjut ke kurikulum dari menu samping.");
    }
  });
}

function wireInstructorCreateQuiz() {
  const form = document.getElementById("form-instructor-quiz");
  if (!form) {
    return;
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Bank soal kuis (demo) disimpan.");
  });
}

function wireInstructorDiscountForm() {
  const form = document.getElementById("form-instructor-discount");
  if (!form) {
    return;
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearFormErrors(form);
    const code = document.getElementById("disc-code");
    if (!code || !isNonEmptyString(code.value)) {
      setFormError("disc-code", "Kode kupon wajib diisi.");
      return;
    }
    alert("Kupon (demo) ditambahkan ke daftar.");
  });
}

function wireInstructorPublicProfile() {
  const form = document.getElementById("form-instructor-public-profile");
  if (!form) {
    return;
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Profil publik (demo) diperbarui.");
  });
}

function isProbableHttpUrl(value) {
  if (!isNonEmptyString(value)) {
    return true;
  }
  const t = value.trim();
  return t.indexOf("http://") === 0 || t.indexOf("https://") === 0;
}

function isValidAdminSlug(value) {
  if (!isNonEmptyString(value)) {
    return false;
  }
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.trim());
}

function wireAdminDemoActions() {
  document.body.addEventListener("click", function (e) {
    const btn = e.target.closest("[data-admin-demo]");
    if (!btn) {
      return;
    }
    if (document.body.getAttribute("data-shell") !== "admin") {
      return;
    }
    e.preventDefault();
    const v = btn.getAttribute("data-admin-demo") || "";
    alert("Aksi admin (demo): " + v);
  });
}

function initAdminDashboard() {
  const el = document.getElementById("admin-activity-list");
  if (!el) {
    return;
  }
  const items = [
    {
      title: "Kelas baru diajukan",
      body: "Workshop UI Mobile — menunggu moderasi konten.",
      time: "32 menit lalu",
      unread: true,
    },
    {
      title: "Bukti transfer diunggah",
      body: "INV-2026-0203 menunggu pencocokan mutasi.",
      time: "2 jam lalu",
      unread: true,
    },
    {
      title: "Laporan ulasan",
      body: "LP-881 — diduga spam pada kelas Manajemen Produk.",
      time: "Kemarin",
      unread: false,
    },
  ];
  renderNotificationList("admin-activity-list", items);
}

function initAdminManageStudents() {
  const el = document.getElementById("admin-students-tbody");
  if (!el) {
    return;
  }
  const rows = [
    {
      name: "Rina Kusuma",
      email: "rina@email.demo",
      status: "Aktif",
      joined: "Jan 2026",
      courses: "3",
    },
    {
      name: "Budi Hartono",
      email: "budi@email.demo",
      status: "Aktif",
      joined: "Mar 2026",
      courses: "1",
    },
    {
      name: "Tamu Uji",
      email: "tamu@email.demo",
      status: "Ditangguhkan",
      joined: "Apr 2026",
      courses: "0",
    },
  ];
  renderAdminStudentRows("admin-students-tbody", rows);
}

function initAdminManageInstructors() {
  const el = document.getElementById("admin-instructors-tbody");
  if (!el) {
    return;
  }
  const rows = [
    {
      name: "Dewi Lestari",
      email: "dewi@mentor.demo",
      status: "Terverifikasi",
      published: "4",
      students: "3.120",
    },
    {
      name: "Andi Pratama",
      email: "andi@mentor.demo",
      status: "Terverifikasi",
      published: "2",
      students: "890",
    },
    {
      name: "Calon Mentor X",
      email: "calon@mentor.demo",
      status: "Menunggu dokumen",
      published: "0",
      students: "0",
    },
  ];
  renderAdminInstructorRows("admin-instructors-tbody", rows);
}

function initAdminApproveCourses() {
  const el = document.getElementById("admin-approve-tbody");
  if (!el) {
    return;
  }
  const rows = [
    {
      id: "CRS-104",
      title: "Workshop UI Mobile",
      instructor: "Dewi Lestari",
      submitted: "13 Mei 2026",
      modules: "6",
    },
    {
      id: "CRS-105",
      title: "Python untuk Analisis Data",
      instructor: "Andi Pratama",
      submitted: "12 Mei 2026",
      modules: "11",
    },
  ];
  renderAdminPendingCourseRows("admin-approve-tbody", rows);
}

function initAdminVerifyPayments() {
  const el = document.getElementById("admin-pay-tbody");
  if (!el) {
    return;
  }
  const rows = [
    {
      id: "INV-2026-0203",
      student: "Maya Sari",
      course: "Manajemen Produk Digital",
      amount: 299000,
      channel: "Transfer BCA",
      date: "14 Mei 2026",
      status: "Menunggu verifikasi",
    },
    {
      id: "INV-2026-0198",
      student: "Rina Kusuma",
      course: "Desain UI untuk Pemula",
      amount: 249000,
      channel: "QRIS",
      date: "13 Mei 2026",
      status: "Menunggu verifikasi",
    },
  ];
  renderAdminPaymentVerifyRows("admin-pay-tbody", rows);
}

function initAdminVerifyWithdrawals() {
  const el = document.getElementById("admin-wd-tbody");
  if (!el) {
    return;
  }
  const rows = [
    {
      id: "WD-2026-0055",
      instructor: "Dewi Lestari",
      amount: 7200000,
      bank: "Mandiri · ****8821",
      date: "14 Mei 2026",
      status: "Menunggu admin",
    },
    {
      id: "WD-2026-0051",
      instructor: "Andi Pratama",
      amount: 2100000,
      bank: "BCA · ****4410",
      date: "13 Mei 2026",
      status: "Menunggu admin",
    },
  ];
  renderAdminWithdrawalVerifyRows("admin-wd-tbody", rows);
}

function initAdminCategories() {
  const el = document.getElementById("admin-cat-tbody");
  if (!el) {
    return;
  }
  const rows = [
    { name: "Pemrograman", slug: "pemrograman", count: "42", sort: "10" },
    { name: "Desain & UI", slug: "desain-ui", count: "28", sort: "20" },
    { name: "Bisnis & Karier", slug: "bisnis", count: "19", sort: "30" },
  ];
  renderAdminCategoryRows("admin-cat-tbody", rows);
}

function initAdminModeration() {
  const el = document.getElementById("admin-mod-tbody");
  if (!el) {
    return;
  }
  const rows = [
    {
      id: "LP-881",
      target: "Ulasan · Manajemen Produk Digital",
      reporter: "anon@email.demo",
      reason: "Spam / promosi",
      date: "13 Mei 2026",
      status: "Terbuka",
    },
    {
      id: "LP-874",
      target: "Ulasan · Dasar Pemrograman Web",
      reporter: "siswa@email.demo",
      reason: "Ujaran tidak pantas",
      date: "10 Mei 2026",
      status: "Terbuka",
    },
  ];
  renderAdminModerationRows("admin-mod-tbody", rows);
}

function initAdminAccounts() {
  const el = document.getElementById("admin-admins-tbody");
  if (!el) {
    return;
  }
  const rows = [
    {
      name: "Eka Ramadhan",
      email: "eka@admin.demo",
      role: "Super admin",
      lastActive: "14 Mei 2026, 09:12",
      status: "Aktif",
    },
    {
      name: "Siti Nurhaliza",
      email: "siti@admin.demo",
      role: "Operator support",
      lastActive: "13 Mei 2026, 16:40",
      status: "Aktif",
    },
    {
      name: "Finance Bot",
      email: "finance@admin.demo",
      role: "Finance",
      lastActive: "12 Mei 2026, 08:05",
      status: "Aktif",
    },
  ];
  renderAdminAccountRows("admin-admins-tbody", rows);
}

function wireAdminHomepageForm() {
  const form = document.getElementById("form-admin-homepage");
  if (!form) {
    return;
  }
  const headline = document.getElementById("hp-headline");
  const sub = document.getElementById("hp-sub");
  const ctaLabel = document.getElementById("hp-cta-label");
  const ctaUrl = document.getElementById("hp-cta-url");
  const banner = document.getElementById("hp-banner");
  const prevTitle = document.getElementById("hp-preview-title");
  const prevSub = document.getElementById("hp-preview-sub");
  const prevCta = document.getElementById("hp-preview-cta");
  const previewBox = document.getElementById("admin-hp-preview");

  function syncPreview() {
    if (prevTitle && headline) {
      prevTitle.textContent = isNonEmptyString(headline.value) ? headline.value : "Pratinjau judul";
    }
    if (prevSub && sub) {
      prevSub.textContent = isNonEmptyString(sub.value) ? sub.value : "Pratinjau subjudul muncul di sini.";
    }
    if (prevCta && ctaLabel) {
      prevCta.textContent = isNonEmptyString(ctaLabel.value) ? ctaLabel.value : "Pratinjau CTA";
    }
    if (previewBox && banner && isProbableHttpUrl(banner.value) && isNonEmptyString(banner.value)) {
      previewBox.style.backgroundImage =
        "linear-gradient(160deg, rgba(224,231,255,0.92) 0%, rgba(248,250,252,0.95) 55%), url(" + banner.value.trim() + ")";
      previewBox.style.backgroundSize = "cover";
      previewBox.style.backgroundPosition = "center";
    } else if (previewBox) {
      previewBox.style.backgroundImage = "";
      previewBox.style.background =
        "linear-gradient(160deg, var(--color-primary-soft) 0%, var(--color-bg-main) 60%)";
    }
  }

  let i = 0;
  const inputs = [headline, sub, ctaLabel, ctaUrl, banner];
  while (i < inputs.length) {
    const inp = inputs[i];
    if (inp) {
      inp.addEventListener("input", syncPreview);
    }
    i += 1;
  }
  syncPreview();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearFormErrors(form);
    let ok = true;
    if (headline && !isNonEmptyString(headline.value)) {
      setFormError("hp-headline", "Judul wajib diisi.");
      ok = false;
    }
    if (ctaUrl && !isProbableHttpUrl(ctaUrl.value)) {
      setFormError("hp-cta-url", "Gunakan URL yang diawali http:// atau https://.");
      ok = false;
    }
    if (banner && !isProbableHttpUrl(banner.value)) {
      setFormError("hp-banner", "Gunakan URL gambar yang diawali http:// atau https://.");
      ok = false;
    }
    if (ok) {
      alert("Konfigurasi beranda (demo) disimpan.");
    }
  });
}

function wireAdminCategoryForm() {
  const form = document.getElementById("form-admin-category");
  if (!form) {
    return;
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearFormErrors(form);
    const nameEl = document.getElementById("ac-name");
    const slugEl = document.getElementById("ac-slug");
    let ok = true;
    if (!nameEl || !isNonEmptyString(nameEl.value)) {
      setFormError("ac-name", "Nama wajib diisi.");
      ok = false;
    }
    if (!slugEl || !isValidAdminSlug(slugEl.value)) {
      setFormError("ac-slug", "Slug huruf kecil, angka, dan tanda hubung saja.");
      ok = false;
    }
    if (ok) {
      alert("Kategori (demo) ditambahkan ke antrean.");
      form.reset();
    }
  });
}

function wireAdminInviteForm() {
  const form = document.getElementById("form-admin-invite");
  if (!form) {
    return;
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearFormErrors(form);
    const email = document.getElementById("inv-email");
    if (!email || !isValidEmail(email.value)) {
      setFormError("inv-email", "Email undangan tidak valid.");
      return;
    }
    alert("Undangan admin (demo) dikirim.");
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", async function () {
  const shell = document.body.getAttribute("data-shell") || "public";
  if (shell === "student") {
    await initStudentShell();
  } else if (shell === "instructor") {
    await initInstructorShell();
  } else if (shell === "admin") {
    await initAdminShell();
  } else {
    await initPublicShell();
  }
  initLandingDemoCourses();
  initFaqPage();
  initStudentCatalog();
  initStudentWishlist();
  initStudentDashboardCourses();
  initStudentLearningRoom();
  initStudentNotifications();
  initStudentTransactions();
  initInstructorDashboard();
  initInstructorMyCourses();
  initInstructorCurriculum();
  initInstructorEnrolled();
  initInstructorQna();
  initInstructorDiscounts();
  initInstructorRevenue();
  initInstructorWithdrawalHistory();
  initInstructorReviews();
  initInstructorNotifications();
  initAdminDashboard();
  initAdminManageStudents();
  initAdminManageInstructors();
  initAdminApproveCourses();
  initAdminVerifyPayments();
  initAdminVerifyWithdrawals();
  initAdminCategories();
  initAdminModeration();
  initAdminAccounts();
  wireAuthDemoForms();
  wireQuizDemoForm();
  wireInstructorWithdrawalForm();
  wireInstructorUploadDemo();
  wireInstructorCreateCourse();
  wireInstructorCreateQuiz();
  wireInstructorDiscountForm();
  wireInstructorPublicProfile();
  wireAdminDemoActions();
  wireAdminHomepageForm();
  wireAdminCategoryForm();
  wireAdminInviteForm();
});
