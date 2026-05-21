const header = document.querySelector("[data-header]");
const revealItems = document.querySelectorAll(".reveal");
const heroStage = document.querySelector(".hero-stage");

function updateHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 20);
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.18 },
  );

  for (const item of revealItems) {
    revealObserver.observe(item);
  }
} else {
  for (const item of revealItems) {
    item.classList.add("is-visible");
  }
}

if (heroStage && window.matchMedia("(pointer: fine)").matches) {
  heroStage.addEventListener("pointermove", (event) => {
    const rect = heroStage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroStage.style.setProperty("--tilt-x", `${y * -5}deg`);
    heroStage.style.setProperty("--tilt-y", `${x * 5}deg`);
    heroStage.animate(
      {
        transform: `perspective(1200px) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`,
      },
      { duration: 450, fill: "forwards", easing: "cubic-bezier(.2,.8,.2,1)" },
    );
  });

  heroStage.addEventListener("pointerleave", () => {
    heroStage.animate(
      { transform: "perspective(1200px) rotateX(0deg) rotateY(0deg)" },
      { duration: 450, fill: "forwards", easing: "cubic-bezier(.2,.8,.2,1)" },
    );
  });
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
