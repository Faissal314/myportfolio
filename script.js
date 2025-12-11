
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});


document.addEventListener("DOMContentLoaded", () => {
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
});

const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".carte-projet");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    projects.forEach(project => {
      if (filter === "all" || project.dataset.category === filter) {
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }
    });
  });
});