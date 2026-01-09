
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const darkToggle = document.getElementById("dark-toggle");
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  darkToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

const elements = document.querySelectorAll(".fade-section, .fade-item");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

elements.forEach(el => observer.observe(el));

const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".carte-projet");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    projects.forEach(project => {
      project.style.display =
        filter === "all" || project.dataset.category === filter
          ? "block"
          : "none";
    });
  });
});

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
  const target = +counter.dataset.target;
  let count = 0;

  const update = () => {
    if (count < target) {
      count++;
      counter.textContent = count + "%";
      requestAnimationFrame(update);
    }
  };
  update();
});

if (window.innerWidth <= 768) {
  document.querySelectorAll(".competence").forEach(card => {
    const counter = card.querySelector(".counter");
    if (!counter) return;

    card.style.setProperty("--level", counter.dataset.target + "%");
  });

  const skillObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  document.querySelectorAll(".competence").forEach(card =>
    skillObserver.observe(card)
  );
}
