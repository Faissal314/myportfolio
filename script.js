const toggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  toggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // ===================================================
  // Dark / Light Toggle
  // ===================================================
  const darkToggle = document.getElementById("dark-toggle");
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  });

  // ===================================================
  // Fade in sections
  // ===================================================
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

  // ===================================================
  // Filter projects
  // ===================================================
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".carte-projet");
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      projects.forEach(project => {
        project.style.display = filter === "all" || project.dataset.category === filter ? "block" : "none";
      });
    });
  });

  // ===================================================
  // Animated counters
  // ===================================================
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const updateCounter = () => {
      const target = +counter.dataset.target;
      const count = +counter.innerText.replace('%','');
      const increment = target / 100;
      if (count < target) {
        counter.innerText = `${Math.ceil(count + increment)}%`;
        setTimeout(updateCounter, 20);
      } else {
        counter.innerText = `${target}%`;
      }
    };
    updateCounter();
  });