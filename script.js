/* ==========================================================
   Laxmikant Poojari – Portfolio Scripts
   Vanilla JavaScript only
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- 1. Auto-update footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 2. Mobile navigation toggle ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  const closeMenu = () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the menu after tapping a link (mobile)
  navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  /* ---------- 3. Navbar style change on scroll ---------- */
  const navbar = document.getElementById("navbar");
  const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 4. Reveal elements as they enter the viewport ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el, i) => {
      // Small stagger so grouped cards appear one after another
      el.style.transitionDelay = `${(i % 4) * 80}ms`;
      revealObserver.observe(el);
    });
  } else {
    // Fallback for very old browsers: just show everything
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* ---------- 5. Highlight the nav link of the section in view ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navItems = document.querySelectorAll(".nav-link");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navItems.forEach((link) =>
              link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`)
            );
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" } // triggers near the middle of the screen
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }
});
