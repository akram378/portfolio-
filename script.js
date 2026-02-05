// ===============================
// THEME TOGGLE
// ===============================
const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

// Check for saved theme preference
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  toggleBtn.innerText = "Light Mode";
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
      toggleBtn.innerText = "Light Mode";
      localStorage.setItem("theme", "dark");
    } else {
      toggleBtn.innerText = "Dark Mode";
      localStorage.setItem("theme", "light");
    }
  });
}

// ===============================
// TYPING EFFECT (Vanilla JS)
// ===============================
const subtitleElement = document.querySelector(".subtitle");
if (subtitleElement) {
  const textToType = "Web Developer in Progress 🚀";
  let charIndex = 0;

  // Clear initial text
  subtitleElement.innerHTML = "";

  // Create span for text and cursor
  const textSpan = document.createElement("span");
  const cursorSpan = document.createElement("span");
  cursorSpan.classList.add("cursor");
  subtitleElement.appendChild(textSpan);
  subtitleElement.appendChild(cursorSpan);

  function typeText() {
    if (charIndex < textToType.length) {
      textSpan.textContent += textToType.charAt(charIndex);
      charIndex++;
      setTimeout(typeText, 100);
    } else {
      // Optional: Stop blinking after typing
      // cursorSpan.style.display = 'none';
    }
  }

  // Start typing after initial delay
  setTimeout(typeText, 1500);
}

// ===============================
// GSAP ANIMATIONS (Safe Mode)
// ===============================
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // HERO ANIMATIONS
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

  tl.from(".hero-img-container", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.2
  })
    .from(".hero-title", {
      opacity: 0,
      duration: 0.8
    }, "-=0.4")
    .from(".subtitle", {
      opacity: 0,
      duration: 0.8
    }, "-=0.6");

  // SCROLL ANIMATIONS
  gsap.utils.toArray("section.card").forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      opacity: 0,
      y: 50,
      rotateX: -15,
      transformOrigin: "top center",
      duration: 0.8,
      ease: "power2.out"
    });
  });

  gsap.from(".project-card", {
    scrollTrigger: {
      trigger: ".projects-grid",
      start: "top 85%"
    },
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
  });

  gsap.from(".skill-card", {
    scrollTrigger: {
      trigger: ".skills-grid",
      start: "top 85%"
    },
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out"
  });

  gsap.from(".cs-list li", {
    scrollTrigger: {
      trigger: ".cs-list",
      start: "top 90%"
    },
    x: -20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "power2.out"
  });

  // 3D TILT EFFECT
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    // Inject Glare
    const glare = document.createElement("div");
    glare.classList.add("card-glare");
    card.appendChild(glare);

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Card Tilt
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      // Glare Position (follows mouse)
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;

      gsap.to(card, {
        duration: 0.1, // Faster response for parallax
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        scale: 1.05,
        ease: "power2.out",
      });

      // Update Glare
      gsap.to(glare, {
        duration: 0.1,
        opacity: 0.6, // Visible on hover
        background: `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.3) 0%, transparent 80%)`,
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        duration: 0.5,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        ease: "power2.out",
      });

      // Hide Glare
      gsap.to(glare, {
        duration: 0.5,
        opacity: 0,
      });
    });
  });

  // 3D AVATAR EFFECT
  const heroContainer = document.querySelector('.hero');
  const avatar = document.querySelector('.avatar');

  if (heroContainer && avatar) {
    heroContainer.addEventListener('mousemove', (e) => {
      const rect = heroContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate rotation (inverted for looking at cursor)
      const rotateX = ((y - centerY) / centerY) * 15;
      const rotateY = ((x - centerX) / centerX) * -15;

      gsap.to(avatar, {
        duration: 0.5,
        rotateX: rotateX,
        rotateY: rotateY,
        ease: "power2.out"
      });
    });

    heroContainer.addEventListener('mouseleave', () => {
      gsap.to(avatar, {
        duration: 0.5,
        rotateX: 0,
        rotateY: 0,
        ease: "power2.out"
      });
    });
  }

} else {
  console.warn("GSAP not loaded. Animations disabled.");
}

// ===============================
// SCROLL PROGRESS BAR
// ===============================
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (scrollTop / scrollHeight) * 100;
  const progressBar = document.getElementById("progressBar");
  if (progressBar) {
    progressBar.style.width = scrolled + "%";
  }
});

// ===============================
// MOBILE HAMBURGER MENU
// ===============================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const navLinksItems = document.querySelectorAll(".nav-links a");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    // Prevent scrolling when menu is open
    document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "auto";
  });

  // Close menu when a link is clicked
  navLinksItems.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });
}


