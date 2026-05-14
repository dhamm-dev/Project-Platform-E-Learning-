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

document.addEventListener("DOMContentLoaded", async function () {
  await initPublicShell();
  initLandingDemoCourses();
  initFaqPage();
  wireAuthDemoForms();
});
