// ===========================
// MENU HAMBURGUER MOBILE
// ===========================
const mobileToggle = document.getElementById("mobileToggle");
const navList = document.querySelector(".nav-list");

if (mobileToggle) {
  mobileToggle.addEventListener("click", () => {
    const expanded = mobileToggle.getAttribute("aria-expanded") === "true";
    mobileToggle.setAttribute("aria-expanded", String(!expanded));
    navList.classList.toggle("open");
  });
}

// ===========================
// SCROLL SUAVE PARA LINKS INTERNOS
// ===========================
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    if (navList && navList.classList.contains("open")) {
      navList.classList.remove("open");
      mobileToggle.setAttribute("aria-expanded", "false");
    }
  });
});

// ===========================
// BOTÃO VOLTAR AO TOPO
// ===========================
const topBtn = document.getElementById("topBtn");

if (topBtn) {
  window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ===========================
// FORMULÁRIO DE CONTATO
// ===========================
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Mensagem enviada com sucesso!");
    contactForm.reset();
  });
}

// ===========================
// REVEAL ANIMATION
// ===========================
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((el) => io.observe(el));

// ===========================
// NOTÍCIAS DINÂMICAS (Home + Página de Notícias)
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const newsGrid = document.querySelector(".news-grid");
  if (!newsGrid) return;

  const noticiasPath = "assets/data/noticias.json";

  fetch(noticiasPath)
    .then((response) => {
      if (!response.ok) throw new Error("Erro ao carregar o JSON");
      return response.json();
    })
    .then((noticias) => {
      const isHome =
        location.pathname.endsWith("index.html") ||
        location.pathname === "/" ||
        document.title.includes("Home");

      const noticiasMostrar = isHome ? noticias.slice(0, 4) : noticias;

      noticiasMostrar.forEach((n) => {
        if (n.titulo.toLowerCase().includes("relatório")) return;

        const card = document.createElement("div");
        card.classList.add("news-card", "reveal");

        card.innerHTML = `
          <img src="${n.imagem}" alt="${n.titulo}">
          <h4>${n.titulo}</h4>
          <p class="date">${n.data}</p>
          <a href="${n.link}" class="btn btn-primary" target="_blank">Ler mais</a>
        `;

        newsGrid.appendChild(card);
      });

      const novos = document.querySelectorAll(".reveal");
      novos.forEach((el) => io.observe(el));
    })
    .catch((err) => console.error("Erro ao carregar notícias:", err));
});

