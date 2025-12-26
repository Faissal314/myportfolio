document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      toggle.classList.toggle("open");
    });

    navItems.forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        toggle.classList.remove("open");
      });
    });
  }
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
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px"
    }
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
        const category = project.dataset.category;

        if (filter === "all" || category === filter) {
          project.style.display = "block";
          project.classList.remove("hidden");
        } else {
          project.style.display = "none";
          project.classList.add("hidden");
        }
      });
    });
  });
});