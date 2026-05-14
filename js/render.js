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

function renderCourseCards(containerId, courses) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(courses)) {
    return;
  }
  let htmlString = "";
  let i = 0;
  while (i < courses.length) {
    const item = courses[i];
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
      "</article>";
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
