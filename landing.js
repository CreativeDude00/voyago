// ─── Contact form (mailto handler) ───────────────────────────────────────────

const contactForm = document.querySelector("[data-contact-form]");
const statusLine = document.querySelector("[data-form-status]");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      statusLine.textContent = "Please fill in your name, email, and message.";
      return;
    }

    const subject = encodeURIComponent(`VoyaGo support request from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    statusLine.textContent = "Opening your email app…";
    window.location.href = `mailto:support@voyagoo.app?subject=${subject}&body=${body}`;
  });
}

// ─── Dynamic year ─────────────────────────────────────────────────────────────

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

// ─── Hamburger menu ───────────────────────────────────────────────────────────

const burger = document.getElementById("burger");
const burgerClose = document.getElementById("burger-close");
const mobileNav = document.getElementById("mobile-nav");
const backdrop = document.getElementById("nav-backdrop");

function openNav() {
  burger.setAttribute("aria-expanded", "true");
  burger.classList.add("is-open");
  mobileNav.setAttribute("aria-hidden", "false");
  mobileNav.classList.add("is-open");
  backdrop.classList.add("is-open");
  document.body.classList.add("nav-open");
}

function closeNav() {
  burger.setAttribute("aria-expanded", "false");
  burger.classList.remove("is-open");
  mobileNav.setAttribute("aria-hidden", "true");
  mobileNav.classList.remove("is-open");
  backdrop.classList.remove("is-open");
  document.body.classList.remove("nav-open");
}

if (burger && mobileNav) {
  burger.addEventListener("click", openNav);
  if (burgerClose) burgerClose.addEventListener("click", closeNav);
  if (backdrop) backdrop.addEventListener("click", closeNav);

  mobileNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav.classList.contains("is-open")) {
      closeNav();
    }
  });
}

// ─── Scroll-reveal (Intersection Observer) ────────────────────────────────────

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  document.querySelectorAll(".reveal-scroll").forEach((el) => io.observe(el));
}
