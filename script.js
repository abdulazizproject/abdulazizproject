// Enhanced 3D tilt effect for the hero card (desktop + mobile)
const heroCard = document.getElementById("heroCard");

if (heroCard) {
  const inner = heroCard.querySelector(".card-3d-inner");

  let rotationX = 0;
  let rotationY = 0;
  let targetX = 0;
  let targetY = 0;
  let isTouching = false;

  const lerp = (a, b, t) => a + (b - a) * t;

  const animate = () => {
    rotationX = lerp(rotationX, targetX, 0.09);
    rotationY = lerp(rotationY, targetY, 0.09);

    inner.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    requestAnimationFrame(animate);
  };

  // Mouse events (desktop)
  heroCard.addEventListener("mousemove", (e) => {
    if (isTouching) return;
    const rect = heroCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    targetY = percentX * 12; // rotateY
    targetX = -percentY * 12; // rotateX
  });

  heroCard.addEventListener("mouseleave", () => {
    if (!isTouching) {
      targetX = 0;
      targetY = 0;
    }
  });

  // Touch events (mobile)
  heroCard.addEventListener("touchstart", (e) => {
    isTouching = true;
  }, { passive: true });

  heroCard.addEventListener("touchmove", (e) => {
    if (!isTouching) return;
    e.preventDefault();
    const touch = e.touches[0];
    const rect = heroCard.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    targetY = percentX * 8; // Slightly less rotation on mobile
    targetX = -percentY * 8;
  }, { passive: false });

  heroCard.addEventListener("touchend", () => {
    isTouching = false;
    targetX = 0;
    targetY = 0;
  });

  animate();
}

// Smooth scroll for anchor links (mobile optimization)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for sticky nav
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  });
});

// Intersection Observer for fade-in animations on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll(".section, .trading-card, .contact-card, .stat-card").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// Set current year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


