
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navbar = document.querySelector(".navbar");

toggle.addEventListener("click", () => {
  const isActive = navLinks.classList.toggle("active");
  toggle.setAttribute("aria-expanded", isActive);

  if (isActive) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

document.addEventListener("click", (e) => {
  if (!navbar.contains(e.target) && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
});

let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-section, .fade-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  elements.forEach((el) => observer.observe(el));
});

const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".carte-projet");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    projects.forEach((project, index) => {
      const category = project.dataset.category;
      if (filter === "all" || category === filter) {
        setTimeout(() => {
          project.style.display = "block";
          setTimeout(() => {
            project.style.opacity = "1";
            project.style.transform = "translateY(0)";
          }, 50);
        }, index * 50);
      } else {
        project.style.opacity = "0";
        project.style.transform = "translateY(20px)";
        setTimeout(() => {
          project.style.display = "none";
        }, 300);
      }
    });
  });
});

projects.forEach((project) => {
  project.style.transition = "opacity 0.3s ease, transform 0.3s ease";
});

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector("button[type='submit']");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "📤 Envoi en cours...";
    submitBtn.disabled = true;
    setTimeout(() => {
      submitBtn.textContent = "✅ Message envoyé !";
      submitBtn.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";
      contactForm.reset();
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = "";
      }, 3000);
    }, 1500);
  });
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const offsetTop = target.offsetTop - 80;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  });
});