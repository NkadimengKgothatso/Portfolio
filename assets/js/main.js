// Portfolio interactions — progressive enhancement only; the page works without JS.
(() => {
  "use strict";

  const EMAIL = "Kgothatsonkadimeng15@gmail.com";
  const root = document.documentElement;
  root.classList.add("js");

  // ---- Header border on scroll
  const header = document.querySelector(".site-header");
  const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // ---- Mobile navigation
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  const setNav = (open) => {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
  };
  if (toggle && nav) {
    toggle.addEventListener("click", () => setNav(toggle.getAttribute("aria-expanded") !== "true"));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) setNav(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { setNav(false); toggle.focus(); }
    });
    window.matchMedia("(min-width: 861px)").addEventListener("change", (mq) => { if (mq.matches) setNav(false); });
  }

  // ---- Active section in nav
  const links = [...document.querySelectorAll('.nav-list a[href^="#"]')];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => {
          if (a.getAttribute("href") === "#" + entry.target.id) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => spy.observe(s));
  }

  // ---- Reveal on scroll (skipped entirely when reduced motion is requested)
  const reveals = document.querySelectorAll(".reveal");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); obs.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    reveals.forEach((el) => io.observe(el));
  }

  // ---- Copy email
  const copyBtn = document.querySelector("[data-copy-email]");
  if (copyBtn && navigator.clipboard) {
    copyBtn.hidden = false;
    copyBtn.addEventListener("click", async () => {
      const label = copyBtn.querySelector("span");
      try {
        await navigator.clipboard.writeText(EMAIL);
        label.textContent = "Copied";
      } catch {
        label.textContent = "Copy failed";
      }
      setTimeout(() => { label.textContent = "Copy"; }, 2000);
    });
  }

  // ---- Contact form → opens the visitor's email client (static site, no backend)
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const from = String(data.get("email") || "").trim();
      const message = String(data.get("message") || "").trim();
      const subject = `Portfolio enquiry from ${name}`;
      const body = `${message}\n\n— ${name}${from ? ` (${from})` : ""}`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  // ---- Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
