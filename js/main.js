function initLandingDemoCourses() {
  const el = document.getElementById("landing-course-grid");
  if (!el) {
    return;
  }
  const demoCourses = [
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
  ];
  renderCourseCards("landing-course-grid", demoCourses);
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
  const el = document.getElementById("student-catalog-grid");
  if (!el) {
    return;
  }
  renderCourseCards("student-catalog-grid", getDemoStudentCourses());
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
  const el = document.getElementById("student-continue-grid");
  if (!el) {
    return;
  }
  const all = getDemoStudentCourses();
  const subset = [all[0], all[1]];
  let i = 0;
  while (i < subset.length) {
    subset[i].href = "learning-room.html";
    i += 1;
  }
  renderCourseCards("student-continue-grid", subset);
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

document.addEventListener("DOMContentLoaded", async function () {
  const shell = document.body.getAttribute("data-shell") || "public";
  if (shell === "student") {
    await initStudentShell();
  } else if (shell === "instructor") {
    await initInstructorShell();
  } else {
    await initPublicShell();
  }
  initLandingDemoCourses();
  initFaqPage();
  initStudentCatalog();
  initStudentWishlist();
  initStudentDashboardCourses();
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
  wireAuthDemoForms();
  wireQuizDemoForm();
  wireInstructorWithdrawalForm();
  wireInstructorUploadDemo();
  wireInstructorCreateCourse();
  wireInstructorCreateQuiz();
  wireInstructorDiscountForm();
  wireInstructorPublicProfile();
});
