const COMPONENT_BASE = "../../components/";

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
    i += 1;
  }
  container.innerHTML = htmlString;
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
