/* =========================================================
   Mangesh Kumar Mahala — Portfolio Interactivity & Animations
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Copyright Year
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Theme Toggle (Dark / Light)
  const htmlEl = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const savedTheme = localStorage.getItem("mkm-theme") || "dark";

  const applyTheme = (theme) => {
    htmlEl.setAttribute("data-theme", theme);
    localStorage.setItem("mkm-theme", theme);
    if (themeIcon) {
      themeIcon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
  };
  applyTheme(savedTheme);

  themeToggle?.addEventListener("click", () => {
    const next = htmlEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
  });

  // 3. Mobile Menu Toggle
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks?.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger?.setAttribute("aria-expanded", "false");
    });
  });

  // 4. Typing Effect in Hero
  const typedEl = document.getElementById("typedText");
  const roles = [
    "B.Tech CSE Fresher",
    "Java & Python Developer",
    "SQL & MySQL Enthusiast",
    "OOP & DBMS Problem Solver"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    if (!typedEl) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 45 : 85;
    if (!isDeleting && charIndex === currentRole.length) {
      speed = 1600;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 350;
    }

    setTimeout(typeLoop, speed);
  }
  typeLoop();

  // 5. Interactive Code Window Tabs (Java / Python / SQL)
  const codeTabs = document.querySelectorAll(".code-tab");
  const codeBlocks = document.querySelectorAll(".code-block");

  codeTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const lang = tab.dataset.lang;
      codeTabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      codeBlocks.forEach((block) => {
        block.classList.toggle("active", block.id === `code-${lang}`);
      });
    });
  });

  // 5b. Pointer-Driven 3D AI Assistant Motion
  const aiStage = document.getElementById("aiStage");
  if (aiStage && window.matchMedia("(pointer: fine)").matches) {
    aiStage.addEventListener("pointermove", (event) => {
      const bounds = aiStage.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      aiStage.style.setProperty("--ai-rotate-x", `${(-y * 10).toFixed(2)}deg`);
      aiStage.style.setProperty("--ai-rotate-y", `${(x * 12).toFixed(2)}deg`);
    });

    aiStage.addEventListener("pointerleave", () => {
      aiStage.style.setProperty("--ai-rotate-x", "0deg");
      aiStage.style.setProperty("--ai-rotate-y", "0deg");
    });
  }

  // 6. Skill Category Filters
  const filterBtns = document.querySelectorAll(".filter-btn");
  const skillCards = document.querySelectorAll(".skill-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      skillCards.forEach((card) => {
        const show = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("hidden", !show);
      });
    });
  });

  // 7. Scroll Reveal & Animated Skill Bars (IntersectionObserver)
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          const bar = entry.target.querySelector(".progress-fill");
          if (bar && bar.dataset.width) {
            bar.style.width = bar.dataset.width;
          }
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  // 8. Scroll Progress Bar, Navbar State, Scroll Spy & Scroll-to-Top
  const scrollProgress = document.getElementById("scrollProgress");
  const navbar = document.getElementById("navbar");
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollProgress && docHeight > 0) {
      scrollProgress.style.width = `${(scrollY / docHeight) * 100}%`;
    }

    navbar?.classList.toggle("scrolled", scrollY > 40);
    scrollTopBtn?.classList.toggle("visible", scrollY > 450);

    let currentSection = "home";
    sections.forEach((sec) => {
      if (scrollY >= sec.offsetTop - 160) {
        currentSection = sec.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.toggle("active", item.getAttribute("href") === `#${currentSection}`);
    });
  });

  scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 9. Toast Helper & Copy Email Button
  const toastEl = document.getElementById("toast");
  let toastTimer;

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 3200);
  }

  const copyEmailBtn = document.getElementById("copyEmailBtn");
  copyEmailBtn?.addEventListener("click", async () => {
    const email = copyEmailBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      showToast(`Copied ${email} to clipboard!`);
    } catch {
      showToast(`Email: ${email}`);
    }
  });

  // 10. Contact Form Handler (supports optional FastAPI/Spring Boot API or mailto fallback)
  const contactForm = document.getElementById("contactForm");
  const API_ENDPOINT = ""; // Set to "http://localhost:8000/api/contact" (Python) or "http://localhost:8080/api/contact" (Java) if running backend

  contactForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
      showToast("Please fill in all fields.");
      return;
    }

    if (API_ENDPOINT) {
      try {
        const res = await fetch(API_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, subject, message })
        });
        if (!res.ok) throw new Error("Request failed");
        showToast("Message sent successfully via API!");
        contactForm.reset();
        return;
      } catch {
        showToast("Backend unreachable — opening your email client instead.");
      }
    }

    const mailtoUrl =
      `mailto:mangeshmahala2004@gmail.com?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(`Hi Mangesh,

${message}

From: ${name} (${email})`)}`;
    window.location.href = mailtoUrl;
    showToast("Opening your email client...");
    contactForm.reset();
  });

  // 11. Subtle Interactive Particle Constellation Background
  const canvas = document.getElementById("bgCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    const count = window.innerWidth < 768 ? 28 : 55;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.8 + 0.8
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLight = htmlEl.getAttribute("data-theme") === "light";
      const dotColor = isLight ? "rgba(79, 70, 229, 0.35)" : "rgba(56, 189, 248, 0.45)";
      const lineBase = isLight ? "79, 70, 229" : "99, 102, 241";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${lineBase}, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }
    animate();
  }
});
