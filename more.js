// Count section animation
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const statsSection = document.querySelector(".stats-section");
  let hasAnimated = false;

  // IntersectionObserver to detect when .stats-section enters view
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;

        counters.forEach(counter => {
          counter.innerText = '0';
          const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            const increment = target / 100;

            if (count < target) {
              counter.innerText = Math.ceil(count + increment);
              setTimeout(updateCount, 20);
            } else {
              counter.innerText = target.toLocaleString();
            }
          };
          updateCount();
        });

        observer.unobserve(statsSection); // Stop observing after first run
      }
    });
  }, {
    threshold: 0.6 // Trigger when 60% of the section is visible
  });

  observer.observe(statsSection);
});

// gallery section
const slider = document.getElementById("slider");
const images = slider.querySelectorAll("img");
const visibleImages = 3;
let index = 0;
let interval;
let isTransitioning = false;

// Clone first 3 images and append to the end for infinite scroll illusion
for (let i = 0; i < visibleImages; i++) {
  const clone = images[i].cloneNode(true);
  slider.appendChild(clone);
}

function updateSlider(animate = true) {
  if (!animate) {
    slider.style.transition = "none";
  } else {
    slider.style.transition = "transform 0.5s ease-in-out";
  }
  const offset = index * (100 / visibleImages);
  slider.style.transform = `translateX(-${offset}%)`;
}

function showNext() {
  if (isTransitioning) return;
  isTransitioning = true;
  index++;
  updateSlider(true);

  // When reaching the cloned set, reset after transition
  if (index === slider.children.length - visibleImages) {
    setTimeout(() => {
      index = 0;
      updateSlider(false);
    }, 500);
  }

  setTimeout(() => {
    isTransitioning = false;
  }, 600);
}

function showPrev() {
  if (isTransitioning) return;
  isTransitioning = true;

  if (index === 0) {
    // Jump to cloned last slide first
    index = slider.children.length - visibleImages;
    updateSlider(false);
  }

  setTimeout(() => {
    index--;
    updateSlider(true);
    isTransitioning = false;
  }, 20);
}

document.querySelector(".next").addEventListener("click", () => {
  showNext();
  restartAutoSlide();
});

document.querySelector(".prev").addEventListener("click", () => {
  showPrev();
  restartAutoSlide();
});

function startAutoSlide() {
  interval = setInterval(showNext, 2500);
}

function restartAutoSlide() {
  clearInterval(interval);
  startAutoSlide();
}

window.addEventListener("load", () => {
  updateSlider(false);
  startAutoSlide();
});
