const COMPONENT_BASE = "../../components/";

/** ID siswa aktif (demo): query ?studentId= atau default akun Rina Kusuma di seed. */
function getActiveStudentId() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("studentId");
  if (raw !== null && raw !== "") {
    const n = Number(raw);
    if (!Number.isNaN(n)) {
      return n;
    }
  }
  return 4;
}

/**
 * Mencatat pembelian ke localStorage (insert enrollments), lalu notifikasi.
 * Loop pencarian duplikat memakai while dan i += 1 (SKILL.md).
 */
function beliKelas(courseId, studentId) {
  if (typeof insert !== "function" || typeof getAll !== "function") {
    return;
  }
  const cid = Number(courseId);
  const sid = Number(studentId);
  const allEn = getAll("enrollments");
  let i = 0;
  while (i < allEn.length) {
    const row = allEn[i];
    if (Number(row.courseId) === cid && Number(row.studentId) === sid) {
      alert("Anda sudah terdaftar di kelas ini.");
      return;
    }
    i += 1;
  }
  insert("enrollments", { courseId: cid, studentId: sid, status: "paid" });
  alert("Kelas berhasil dibeli!");
}

async function loadHtmlFragment(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Gagal memuat: " + url);
  }
  return response.text();
}

async function injectIntoSelector(selector, url) {
  const host = document.querySelector(selector);
  if (!host) {
    return;
  }
  try {
    const html = await loadHtmlFragment(url);
    host.innerHTML = html;
  } catch (err) {
    host.innerHTML =
      '<p class="banner-note">Komponen tidak dimuat. Buka situs lewat server lokal (mis. <code>npx serve</code>) agar <code>fetch</code> ke file komponen diizinkan.</p>';
    console.warn(err);
  }
}

async function initPublicShell() {
  await injectIntoSelector("#site-navbar", COMPONENT_BASE + "navbar-public.html");
  await injectIntoSelector("#site-footer", COMPONENT_BASE + "footer.html");
}

async function initStudentShell() {
  await injectIntoSelector("#site-navbar", COMPONENT_BASE + "navbar-student.html");
  await injectIntoSelector("#student-sidebar", COMPONENT_BASE + "sidebar-student.html");
  await injectIntoSelector("#site-footer", COMPONENT_BASE + "footer-student.html");
}

async function initInstructorShell() {
  await injectIntoSelector("#site-navbar", COMPONENT_BASE + "navbar-instructor.html");
  await injectIntoSelector("#instructor-sidebar", COMPONENT_BASE + "sidebar-instructor.html");
  await injectIntoSelector("#site-footer", COMPONENT_BASE + "footer-instructor.html");
}

async function initAdminShell() {
  await injectIntoSelector("#site-navbar", COMPONENT_BASE + "navbar-admin.html");
  await injectIntoSelector("#admin-sidebar", COMPONENT_BASE + "sidebar-admin.html");
  await injectIntoSelector("#site-footer", COMPONENT_BASE + "footer-admin.html");
}

/**
 * Mengisi katalog siswa dari localStorage lewat getAll("courses").
 * ID dan harga dipaksa ke number untuk query string & formatRupiah tanpa mencampur tipe.
 */
function renderCatalog() {
  if (typeof getAll !== "function") {
    return;
  }
  const container = document.getElementById("course-container");
  if (!container) {
    return;
  }
  const rows = getAll("courses");
  const cards = [];
  const sid = getActiveStudentId();
  let i = 0;
  while (i < rows.length) {
    const row = rows[i];
    if (!row || row.status !== "published") {
      i += 1;
      continue;
    }
    const idNum = Number(row.id);
    const priceNum = Number(row.price);
    const titleStr = typeof row.title === "string" ? row.title : "";
    const badgeStr = typeof row.badge === "string" ? row.badge : "";
    let metaStr = "Kelas";
    if (typeof row.moduleMeta === "string" && row.moduleMeta.length > 0) {
      metaStr = row.moduleMeta;
    }
    const idForQuery = encodeURIComponent(String(idNum));
    const hrefStr = "course-detail.html?id=" + idForQuery;
    cards.push({
      title: titleStr,
      meta: metaStr,
      price: priceNum,
      badge: badgeStr,
      href: hrefStr,
      courseId: idNum,
      studentId: sid,
      showBuy: true,
    });
    i += 1;
  }
  renderCourseCards("course-container", cards);
}

function renderCourseCards(containerId, courses) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(courses)) {
    return;
  }
  let htmlString = "";
  let i = 0;
  while (i < courses.length) {
    const item = courses[i];
    const href = typeof item.href === "string" ? item.href : "";
    if (item.showBuy === true) {
      const courseIdForBtn = Number(item.courseId);
      let studentIdForBtn = getActiveStudentId();
      if (item.studentId !== undefined && item.studentId !== null) {
        studentIdForBtn = Number(item.studentId);
      }
      htmlString +=
        '<article class="card course-card-mini">' +
        '<span class="badge">' +
        item.badge +
        "</span>" +
        "<h3>" +
        item.title +
        "</h3>" +
        '<p class="course-meta">' +
        item.meta +
        " · " +
        formatRupiah(item.price) +
        "</p>" +
        '<div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:0.85rem;align-items:center">' +
        (href
          ? '<a class="btn btn-secondary" style="text-decoration:none;display:inline-block" href="' +
            href +
            '">Detail</a>'
          : "") +
        '<button type="button" class="btn btn-primary" onclick="beliKelas(' +
        String(courseIdForBtn) +
        "," +
        String(studentIdForBtn) +
        ')">Beli</button>' +
        "</div>" +
        "</article>";
    } else {
      const wrapStart = href ? '<a class="course-card-wrap" href="' + href + '">' : "";
      const wrapEnd = href ? "</a>" : "";
      htmlString +=
        wrapStart +
        '<article class="card course-card-mini">' +
        '<span class="badge">' +
        item.badge +
        "</span>" +
        "<h3>" +
        item.title +
        "</h3>" +
        '<p class="course-meta">' +
        item.meta +
        " · " +
        formatRupiah(item.price) +
        "</p>" +
        "</article>" +
        wrapEnd;
    }
    i += 1;
  }
  container.innerHTML = htmlString;
}

/**
 * Dashboard siswa: gabungkan enrollments + courses dengan loop manual, render ke #my-courses-container.
 */
function renderDashboard(studentId) {
  if (typeof getAll !== "function") {
    return;
  }
  const container = document.getElementById("my-courses-container");
  if (!container) {
    return;
  }
  const enrollments = getAll("enrollments");
  const courses = getAll("courses");
  const sid = Number(studentId);
  const cards = [];
  let i = 0;
  while (i < enrollments.length) {
    const en = enrollments[i];
    if (Number(en.studentId) === sid && en.status === "paid") {
      const wantedCourseId = Number(en.courseId);
      let j = 0;
      while (j < courses.length) {
        const c = courses[j];
        if (Number(c.id) === wantedCourseId) {
          const titleStr = typeof c.title === "string" ? c.title : "";
          const badgeStr = typeof c.badge === "string" ? c.badge : "";
          let metaStr = "Kelas";
          if (typeof c.moduleMeta === "string" && c.moduleMeta.length > 0) {
            metaStr = c.moduleMeta;
          }
          const idForQuery = encodeURIComponent(String(Number(c.id)));
          const hrefStr = "learning-room.html?courseId=" + idForQuery;
          cards.push({
            title: titleStr,
            meta: metaStr,
            price: Number(c.price),
            badge: badgeStr,
            href: hrefStr,
          });
          break;
        }
        j += 1;
      }
    }
    i += 1;
  }
  if (cards.length === 0) {
    container.innerHTML =
      '<p class="muted" style="margin:0">Belum ada kelas yang dibeli. <a href="catalog.html">Jelajahi katalog</a>.</p>';
    return;
  }
  renderCourseCards("my-courses-container", cards);
}

function renderFaqList(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(items)) {
    return;
  }
  let htmlString = "";
  let i = 0;
  while (i < items.length) {
    const item = items[i];
    const qId = "faq-q-" + i;
    const aId = "faq-a-" + i;
    htmlString +=
      '<div class="faq-item" data-faq-index="' +
      i +
      '">' +
      '<button type="button" class="faq-q" id="' +
      qId +
      '" aria-expanded="false" aria-controls="' +
      aId +
      '">' +
      "<span>" +
      item.question +
      '</span><span class="faq-q-icon" aria-hidden="true">+</span>' +
      "</button>" +
      '<div class="faq-a" id="' +
      aId +
      '" role="region" aria-labelledby="' +
      qId +
      '">' +
      "<p>" +
      item.answer +
      "</p>" +
      "</div>" +
      "</div>";
    i += 1;
  }
  container.innerHTML = htmlString;
}

function renderNotificationList(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(items)) {
    return;
  }
  let htmlString = "";
  let i = 0;
  while (i < items.length) {
    const item = items[i];
    const unreadClass = item.unread ? "notif-item is-unread" : "notif-item";
    htmlString +=
      '<article class="' +
      unreadClass +
      '">' +
      '<div><p style="margin:0 0 0.35rem;font-weight:600;color:var(--color-text-dark)">' +
      item.title +
      "</p>" +
      '<p class="muted" style="margin:0">' +
      item.body +
      "</p>" +
      '<p class="thread-meta" style="margin:0.5rem 0 0">' +
      item.time +
      "</p></div></article>";
    i += 1;
  }
  container.innerHTML = htmlString;
}

function renderTransactionRows(containerId, rows) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(rows)) {
    return;
  }
  let htmlString = "";
  let i = 0;
  while (i < rows.length) {
    const row = rows[i];
    htmlString +=
      "<tr><td>" +
      row.id +
      "</td><td>" +
      row.course +
      "</td><td>" +
      formatRupiah(row.amount) +
      "</td><td>" +
      row.status +
      "</td><td>" +
      row.date +
      "</td></tr>";
    i += 1;
  }
  container.innerHTML = htmlString;
}

function renderInstructorManageCards(containerId, courses) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(courses)) {
    return;
  }
  let htmlString = "";
  let i = 0;
  while (i < courses.length) {
    const item = courses[i];
    const href = typeof item.href === "string" ? item.href : "#";
    htmlString +=
      '<a class="course-card-wrap" href="' +
      href +
      '">' +
      '<article class="card course-card-mini">' +
      '<span class="badge">' +
      item.status +
      "</span>" +
      "<h3>" +
      item.title +
      "</h3>" +
      '<p class="course-meta">' +
      item.meta +
      "</p>" +
      "</article>" +
      "</a>";
    i += 1;
  }
  container.innerHTML = htmlString;
}

function renderCurriculumRows(containerId, rows) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(rows)) {
    return;
  }
  let htmlString = "";
  let i = 0;
  while (i < rows.length) {
    const row = rows[i];
    htmlString +=
      "<tr><td>" +
      row.order +
      "</td><td>" +
      row.title +
      "</td><td>" +
      row.type +
      "</td><td>" +
      row.duration +
      "</td><td>" +
      row.status +
      "</td></tr>";
    i += 1;
  }
  container.innerHTML = htmlString;
}

function renderEnrolledStudentRows(containerId, rows) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(rows)) {
    return;
  }
  let htmlString = "";
  let i = 0;
  while (i < rows.length) {
    const row = rows[i];
    htmlString +=
      "<tr><td>" +
      row.name +
      "</td><td>" +
      row.email +
      "</td><td>" +
      row.course +
      "</td><td>" +
      row.enrolled +
      "</td><td>" +
      row.progress +
      "</td></tr>";
    i += 1;
  }
  container.innerHTML = htmlString;
}

function renderQnaRows(containerId, rows) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(rows)) {
    return;
  }
  let htmlString = "";
  let i = 0;
  while (i < rows.length) {
    const row = rows[i];
    htmlString +=
      "<tr><td>" +
      row.course +
      "</td><td>" +
      row.student +
      "</td><td>" +
      row.excerpt +
      "</td><td>" +
      row.posted +
      "</td><td>" +
      row.status +
      "</td></tr>";
    i += 1;
  }
  container.innerHTML = htmlString;
}

function renderDiscountRows(containerId, rows) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(rows)) {
    return;
  }
  let htmlString = "";
  let i = 0;
  while (i < rows.length) {
    const row = rows[i];
    htmlString +=
      "<tr><td>" +
      row.code +
      "</td><td>" +
      row.course +
      "</td><td>" +
      row.value +
      "</td><td>" +
      row.expires +
      "</td><td>" +
      row.uses +
      "</td></tr>";
    i += 1;
  }
  container.innerHTML = htmlString;
}

function renderRevenueRows(containerId, rows) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(rows)) {
    return;
  }
  let htmlString = "";
  let i = 0;
  while (i < rows.length) {
    const row = rows[i];
    htmlString +=
      "<tr><td>" +
      row.period +
      "</td><td>" +
      formatRupiah(row.gross) +
      "</td><td>" +
      formatRupiah(row.fee) +
      "</td><td>" +
      formatRupiah(row.net) +
      "</td><td>" +
      row.note +
      "</td></tr>";
    i += 1;
  }
  container.innerHTML = htmlString;
}

function renderWithdrawalRows(containerId, rows) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(rows)) {
    return;
  }
  let htmlString = "";
  let i = 0;
  while (i < rows.length) {
    const row = rows[i];
    htmlString +=
      "<tr><td>" +
      row.id +
      "</td><td>" +
      formatRupiah(row.amount) +
      "</td><td>" +
      row.bank +
      "</td><td>" +
      row.status +
      "</td><td>" +
      row.date +
      "</td></tr>";
    i += 1;
  }
  container.innerHTML = htmlString;
}

function renderInstructorReviewCards(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(items)) {
    return;
  }
  let htmlString = "";
  let i = 0;
  while (i < items.length) {
    const item = items[i];
    htmlString +=
      '<article class="card" style="padding:1.1rem 1.2rem;margin-bottom:0.85rem">' +
      '<div style="display:flex;justify-content:space-between;gap:0.75rem;flex-wrap:wrap;margin-bottom:0.5rem">' +
      "<strong>" +
      item.course +
      "</strong>" +
      '<span class="badge">' +
      item.stars +
      " / 5</span></div>" +
      '<p class="muted" style="margin:0 0 0.35rem;font-size:0.875rem">' +
      item.student +
      " · " +
      item.date +
      "</p>" +
      "<p style=\"margin:0;color:var(--color-text-dark)\">" +
      item.comment +
      "</p>" +
      "</article>";
    i += 1;
  }
  container.innerHTML = htmlString;
}

function renderAdminStudentRows(containerId, rows) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(rows)) {
    return;
  }
  let htmlString = "";
  let i = 0;
  while (i < rows.length) {
    const row = rows[i];
    htmlString +=
      "<tr><td>" +
      row.name +
      "</td><td>" +
      row.email +
      "</td><td>" +
      row.status +
      "</td><td>" +
      row.joined +
      "</td><td>" +
      row.courses +
      "</td></tr>";
    i += 1;
  }
  container.innerHTML = htmlString;
}

function renderAdminInstructorRows(containerId, rows) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(rows)) {
    return;
  }
  let htmlString = "";
  let i = 0;
  while (i < rows.length) {
    const row = rows[i];
    htmlString +=
      "<tr><td>" +
      row.name +
      "</td><td>" +
      row.email +
      "</td><td>" +
      row.status +
      "</td><td>" +
      row.published +
      "</td><td>" +
      row.students +
      "</td></tr>";
    i += 1;
  }
  container.innerHTML = htmlString;
}

function renderAdminPendingCourseRows(containerId, rows) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(rows)) {
    return;
  }
  let htmlString = "";
  let i = 0;
  while (i < rows.length) {
    const row = rows[i];
    htmlString +=
      "<tr><td>" +
      row.title +
      "</td><td>" +
      row.instructor +
      "</td><td>" +
      row.submitted +
      "</td><td>" +
      row.modules +
      '</td><td><div class="table-actions">' +
      '<button type="button" class="btn btn-primary" style="padding:0.45rem 0.75rem;font-size:0.8125rem" data-admin-demo="setujui-kelas:' +
      row.id +
      '">Setujui</button>' +
      '<button type="button" class="btn btn-secondary" style="padding:0.45rem 0.75rem;font-size:0.8125rem" data-admin-demo="tolak-kelas:' +
      row.id +
      '">Tolak</button>' +
      "</div></td></tr>";
    i += 1;
  }
  container.innerHTML = htmlString;
}

function renderAdminPaymentVerifyRows(containerId, rows) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(rows)) {
    return;
  }
  let htmlString = "";
  let i = 0;
  while (i < rows.length) {
    const row = rows[i];
    htmlString +=
      "<tr><td>" +
      row.id +
      "</td><td>" +
      row.student +
      "</td><td>" +
      row.course +
      "</td><td>" +
      formatRupiah(row.amount) +
      "</td><td>" +
      row.channel +
      "</td><td>" +
      row.date +
      "</td><td>" +
      row.status +
      '</td><td><div class="table-actions">' +
      '<button type="button" class="btn btn-primary" style="padding:0.45rem 0.75rem;font-size:0.8125rem" data-admin-demo="verifikasi-bayar:' +
      row.id +
      '">Tandai valid</button>' +
      '<button type="button" class="btn btn-secondary" style="padding:0.45rem 0.75rem;font-size:0.8125rem" data-admin-demo="tolak-bayar:' +
      row.id +
      '">Tolak</button>' +
      "</div></td></tr>";
    i += 1;
  }
  container.innerHTML = htmlString;
}

function renderAdminWithdrawalVerifyRows(containerId, rows) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(rows)) {
    return;
  }
  let htmlString = "";
  let i = 0;
  while (i < rows.length) {
    const row = rows[i];
    htmlString +=
      "<tr><td>" +
      row.id +
      "</td><td>" +
      row.instructor +
      "</td><td>" +
      formatRupiah(row.amount) +
      "</td><td>" +
      row.bank +
      "</td><td>" +
      row.date +
      "</td><td>" +
      row.status +
      '</td><td><div class="table-actions">' +
      '<button type="button" class="btn btn-primary" style="padding:0.45rem 0.75rem;font-size:0.8125rem" data-admin-demo="setujui-wd:' +
      row.id +
      '">Setujui transfer</button>' +
      '<button type="button" class="btn btn-secondary" style="padding:0.45rem 0.75rem;font-size:0.8125rem" data-admin-demo="tahan-wd:' +
      row.id +
      '">Tahan</button>' +
      "</div></td></tr>";
    i += 1;
  }
  container.innerHTML = htmlString;
}

function renderAdminCategoryRows(containerId, rows) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(rows)) {
    return;
  }
  let htmlString = "";
  let i = 0;
  while (i < rows.length) {
    const row = rows[i];
    htmlString +=
      "<tr><td>" +
      row.name +
      "</td><td>" +
      row.slug +
      "</td><td>" +
      row.count +
      "</td><td>" +
      row.sort +
      '</td><td><div class="table-actions">' +
      '<button type="button" class="btn btn-secondary" style="padding:0.45rem 0.75rem;font-size:0.8125rem" data-admin-demo="edit-kategori:' +
      row.slug +
      '">Edit</button>' +
      "</div></td></tr>";
    i += 1;
  }
  container.innerHTML = htmlString;
}

function renderAdminModerationRows(containerId, rows) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(rows)) {
    return;
  }
  let htmlString = "";
  let i = 0;
  while (i < rows.length) {
    const row = rows[i];
    htmlString +=
      "<tr><td>" +
      row.id +
      "</td><td>" +
      row.target +
      "</td><td>" +
      row.reporter +
      "</td><td>" +
      row.reason +
      "</td><td>" +
      row.date +
      "</td><td>" +
      row.status +
      '</td><td><div class="table-actions">' +
      '<button type="button" class="btn btn-secondary" style="padding:0.45rem 0.75rem;font-size:0.8125rem" data-admin-demo="sembunyi-ulasan:' +
      row.id +
      '">Sembunyikan</button>' +
      '<button type="button" class="btn btn-primary" style="padding:0.45rem 0.75rem;font-size:0.8125rem" data-admin-demo="abaikan-laporan:' +
      row.id +
      '">Abaikan</button>' +
      "</div></td></tr>";
    i += 1;
  }
  container.innerHTML = htmlString;
}

function renderAdminAccountRows(containerId, rows) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(rows)) {
    return;
  }
  let htmlString = "";
  let i = 0;
  while (i < rows.length) {
    const row = rows[i];
    htmlString +=
      "<tr><td>" +
      row.name +
      "</td><td>" +
      row.email +
      "</td><td>" +
      row.role +
      "</td><td>" +
      row.lastActive +
      "</td><td>" +
      row.status +
      "</td></tr>";
    i += 1;
  }
  container.innerHTML = htmlString;
}

/**
 * Ruang belajar: playlist modul per courseId dari localStorage, pemutar placeholder.
 * Loop render memakai while dan inkrementasi i += 1 (SKILL.md).
 */
function renderLearningRoom(courseId) {
  if (typeof getAll !== "function") {
    return;
  }
  const mainHost = document.getElementById("main-video-container");
  const playlistHost = document.getElementById("playlist-container");
  const courseLabelEl = document.getElementById("learning-room-course-label");
  const metaTitleEl = document.getElementById("learning-room-meta-title");
  const metaSummaryEl = document.getElementById("learning-room-meta-summary");
  if (!mainHost || !playlistHost) {
    return;
  }

  const targetCourseId = Number(courseId);
  if (typeof getById === "function" && courseLabelEl) {
    const courseRow = getById("courses", targetCourseId);
    if (courseRow && typeof courseRow.title === "string") {
      courseLabelEl.textContent = courseRow.title;
    }
  }

  const allModules = getAll("modules");
  const forCourse = [];
  let j = 0;
  while (j < allModules.length) {
    const row = allModules[j];
    if (Number(row.courseId) === targetCourseId) {
      forCourse.push(row);
    }
    j += 1;
  }

  let swapped = true;
  while (swapped) {
    swapped = false;
    let s = 0;
    while (s < forCourse.length - 1) {
      if (Number(forCourse[s].order) > Number(forCourse[s + 1].order)) {
        const tmp = forCourse[s];
        forCourse[s] = forCourse[s + 1];
        forCourse[s + 1] = tmp;
        swapped = true;
      }
      s += 1;
    }
  }

  playlistHost.innerHTML = "";
  const ul = document.createElement("ul");
  ul.className = "module-list";

  function paintMainArea(mod) {
    mainHost.textContent = "";
    const inner = document.createElement("div");
    inner.className = "learning-video-inner";
    const lab = document.createElement("p");
    lab.className = "learning-video-label";
    lab.textContent = "Sedang diputar (simulasi)";
    const titleEl = document.createElement("p");
    titleEl.className = "learning-video-title";
    titleEl.textContent = typeof mod.title === "string" ? mod.title : "";
    const metaEl = document.createElement("p");
    metaEl.className = "learning-video-meta";
    const typeStr = typeof mod.type === "string" ? mod.type : "";
    const durStr = typeof mod.durationLabel === "string" ? mod.durationLabel : "";
    metaEl.textContent = typeStr + " · " + durStr;
    inner.appendChild(lab);
    inner.appendChild(titleEl);
    inner.appendChild(metaEl);
    mainHost.appendChild(inner);
    if (metaTitleEl) {
      metaTitleEl.textContent =
        "Modul " + String(mod.order) + " · " + (typeof mod.title === "string" ? mod.title : "");
    }
    if (metaSummaryEl) {
      metaSummaryEl.textContent =
        "Jenis materi: " + typeStr + ". Durasi perkiraan: " + durStr + ".";
    }
  }

  function setActiveIndex(activeIndex) {
    const buttons = ul.querySelectorAll(".learning-playlist-item");
    let b = 0;
    while (b < buttons.length) {
      const btn = buttons[b];
      const idx = Number(btn.getAttribute("data-module-index"));
      if (idx === activeIndex) {
        btn.classList.add("is-active");
      } else {
        btn.classList.remove("is-active");
      }
      b += 1;
    }
    if (activeIndex >= 0 && activeIndex < forCourse.length) {
      paintMainArea(forCourse[activeIndex]);
    }
  }

  if (forCourse.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.style.margin = "0";
    empty.textContent = "Belum ada modul untuk kelas ini.";
    playlistHost.appendChild(empty);
    mainHost.textContent = "";
    const ph = document.createElement("span");
    ph.className = "learning-video-empty";
    ph.textContent = "Tidak ada materi video";
    mainHost.appendChild(ph);
    if (metaTitleEl) {
      metaTitleEl.textContent = "Tidak ada modul";
    }
    if (metaSummaryEl) {
      metaSummaryEl.textContent = "Silakan kembali nanti atau hubungi instruktur.";
    }
    return;
  }

  let i = 0;
  while (i < forCourse.length) {
    const mod = forCourse[i];
    const idx = i;
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "learning-playlist-item";
    btn.setAttribute("data-module-index", String(i));
    const orderNum = Number(mod.order);
    const titleStr = typeof mod.title === "string" ? mod.title : "";
    const typeStr = typeof mod.type === "string" ? mod.type : "";
    const durStr = typeof mod.durationLabel === "string" ? mod.durationLabel : "";
    const titleSpan = document.createElement("span");
    titleSpan.textContent = String(orderNum) + ". " + titleStr;
    const metaSpan = document.createElement("span");
    metaSpan.className = "muted";
    metaSpan.style.fontSize = "0.8rem";
    metaSpan.style.flexShrink = "0";
    metaSpan.textContent = typeStr + " · " + durStr;
    btn.appendChild(titleSpan);
    btn.appendChild(metaSpan);
    btn.addEventListener("click", function () {
      setActiveIndex(idx);
    });
    li.appendChild(btn);
    ul.appendChild(li);
    i += 1;
  }

  playlistHost.appendChild(ul);
  setActiveIndex(0);
}

function wireFaqAccordion(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }
  container.addEventListener("click", function (event) {
    const btn = event.target.closest(".faq-q");
    if (!btn || !container.contains(btn)) {
      return;
    }
    const item = btn.closest(".faq-item");
    if (!item) {
      return;
    }
    const isOpen = item.classList.contains("is-open");
    const all = container.querySelectorAll(".faq-item");
    let j = 0;
    while (j < all.length) {
      const el = all[j];
      el.classList.remove("is-open");
      const b = el.querySelector(".faq-q");
      if (b) {
        b.setAttribute("aria-expanded", "false");
      }
      j += 1;
    }
    if (!isOpen) {
      item.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
    }
  });
}
