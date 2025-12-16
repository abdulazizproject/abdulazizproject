// Simple 3D tilt effect for the hero card
const heroCard = document.getElementById("heroCard");

if (heroCard) {
  const inner = heroCard.querySelector(".card-3d-inner");

  let rotationX = 0;
  let rotationY = 0;
  let targetX = 0;
  let targetY = 0;

  const lerp = (a, b, t) => a + (b - a) * t;

  const animate = () => {
    rotationX = lerp(rotationX, targetX, 0.09);
    rotationY = lerp(rotationY, targetY, 0.09);

    inner.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    requestAnimationFrame(animate);
  };

  heroCard.addEventListener("mousemove", (e) => {
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
    targetX = 0;
    targetY = 0;
  });

  animate();
}

// Set current year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


