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

document.addEventListener("DOMContentLoaded", async function () {
  const shell = document.body.getAttribute("data-shell") || "public";
  if (shell === "student") {
    await initStudentShell();
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
  wireAuthDemoForms();
  wireQuizDemoForm();
});
