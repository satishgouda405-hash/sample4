/* Kanaka Ridge — interactions. No libraries. */
(function () {
  "use strict";

  /* ---------- analytics (GA4 placeholder) ---------- */
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  // Replace G-XXXXXXXXXX with your GA4 Measurement ID.
  gtag("js", new Date());
  gtag("config", "G-XXXXXXXXXX", { debug_mode: false });

  function track(event, params) {
    dataLayer.push(Object.assign({ event: event }, params || {}));
    if (window.gtag) gtag("event", event, params || {});
  }
  window.krTrack = track;

  /* ---------- scroll reveal ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  /* ---------- nav scrolled state ---------- */
  var nav = document.querySelector(".nav");
  function onScroll() { if (nav) nav.classList.toggle("scrolled", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- mobile menu ---------- */
  var burger = document.querySelector(".burger");
  var menu = document.querySelector(".mobile-menu");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.textContent = open ? "✕" : "☰";
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { menu.classList.remove("open"); burger.textContent = "☰"; });
    });
  }

  /* ---------- parallax hero ---------- */
  var heroImg = document.querySelector(".hero-bg img");
  if (heroImg && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      if (y < window.innerHeight * 1.2) heroImg.style.transform = "scale(1.08) translateY(" + y * 0.18 + "px)";
    }, { passive: true });
  }

  /* ---------- tile cursor glow ---------- */
  document.querySelectorAll(".tile").forEach(function (t) {
    t.addEventListener("pointermove", function (e) {
      var r = t.getBoundingClientRect();
      t.style.setProperty("--mx", (e.clientX - r.left) + "px");
      t.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });

  /* ---------- event tracking on clicks ---------- */
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-track]");
    if (!el) return;
    track(el.getAttribute("data-track"), { label: el.getAttribute("data-track-label") || el.textContent.trim().slice(0, 60) });
  });

  /* ---------- enquiry form ---------- */
  var form = document.querySelector("form.enquiry");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      track("enquiry_submit", { form: form.getAttribute("data-form") || "contact" });
      var msg = form.querySelector(".form-success");
      if (msg) msg.hidden = false;
      form.reset();
    });
  }

  /* ---------- gallery filter ---------- */
  var filterRow = document.querySelector(".filter-row");
  if (filterRow) {
    filterRow.addEventListener("click", function (e) {
      var btn = e.target.closest("button"); if (!btn) return;
      filterRow.querySelectorAll("button").forEach(function (b) { b.classList.remove("on"); });
      btn.classList.add("on");
      var f = btn.getAttribute("data-filter");
      document.querySelectorAll(".gal figure").forEach(function (fig) {
        fig.style.display = (f === "all" || fig.getAttribute("data-cat") === f) ? "" : "none";
      });
    });
  }

  /* ---------- lazy images ---------- */
  document.querySelectorAll("img").forEach(function (img) {
    img.setAttribute("loading", "lazy"); img.setAttribute("decoding", "async");
  });
})();
