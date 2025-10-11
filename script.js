// ===========================
// MENU HAMBURGUER MOBILE
// ===========================
const mobileToggle = document.getElementById("mobileToggle");
const navList = document.querySelector(".nav-list");

mobileToggle.addEventListener("click", () => {
  const expanded = mobileToggle.getAttribute("aria-expanded") === "true";
  mobileToggle.setAttribute("aria-expanded", String(!expanded));
  navList.classList.toggle("open");
});

// ===========================
// SCROLL SUAVE PARA LINKS INTERNOS
// ===========================
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    if (navList.classList.contains("open")) {
      navList.classList.remove("open");
      mobileToggle.setAttribute("aria-expanded", "false");
    }
  });
});

// ===========================
// BOTÃO VOLTAR AO TOPO
// ===========================
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===========================
// FORMULÁRIO DE CONTATO
// ===========================
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Mensagem enviada com sucesso!");
    contactForm.reset();
  });
}

// ===========================
// REVEAL ANIMATION
// ===========================
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => io.observe(el));
