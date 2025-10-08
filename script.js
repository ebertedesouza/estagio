// ===========================
// MENU HAMBURGUER MOBILE
// ===========================
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".navbar ul");

mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
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
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
    }
  });
});

// ===========================
// BOTÃO VOLTAR AO TOPO
// ===========================
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===========================
// FORMULÁRIO DE CONTATO (EXEMPLO)
// ===========================
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Mensagem enviada com sucesso!");
    contactForm.reset();
  });
}
