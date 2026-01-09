// NAVBAR MOBILE
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (toggle && navLinks) {
  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Fermer le menu quand on clique sur un lien
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

// DARK MODE
const darkToggle = document.getElementById("dark-toggle");

if (darkToggle) {
  // Texte/icone initiale
  const updateDarkIcon = () => {
    darkToggle.textContent = document.body.classList.contains("dark-mode")
      ? "☀️"
      : "🌙";
  };

  updateDarkIcon();

  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    updateDarkIcon();
  });
}

// FADE-IN AVEC INTERSECTION OBSERVER
const elements = document.querySelectorAll(".fade-section, .fade-item");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));
} else {
  // Fallback : tout visible
  elements.forEach((el) => el.classList.add("visible"));
}

// FILTRE DES PROJETS
const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".carte-projet");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    projects.forEach((project) => {
      const match = filter === "all" || project.dataset.category === filter;
      project.style.display = match ? "block" : "none";
    });
  });
});

// COMPTEURS DE COMPÉTENCES
const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  const target = +counter.dataset.target;
  let count = 0;

  const update = () => {
    if (count < target) {
      count++;
      counter.textContent = count + "%";
      requestAnimationFrame(update);
    } else {
      counter.textContent = target + "%";
    }
  };

  update();
});

// ANIMATION BARRES DE COMPÉTENCES SUR MOBILE (optionnel)
if (window.innerWidth <= 768) {
  const competenceCards = document.querySelectorAll(".competence");

  competenceCards.forEach((card) => {
    const counter = card.querySelector(".counter");
    if (!counter) return;

    card.style.setProperty("--level", counter.dataset.target + "%");
  });

  if ("IntersectionObserver" in window) {
    const skillObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    competenceCards.forEach((card) => skillObserver.observe(card));
  }
}
