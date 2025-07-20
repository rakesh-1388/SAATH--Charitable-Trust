const indianBtn = document.getElementById("indianBtn");
const foreignBtn = document.getElementById("foreignBtn");

const indianForm = document.getElementById("indianForm");
const foreignForm = document.getElementById("foreignForm");

indianBtn.addEventListener("click", () => {
  indianForm.classList.add("active-form");
  foreignForm.classList.remove("active-form");

  indianBtn.classList.add("active");
  foreignBtn.classList.remove("active");
});

foreignBtn.addEventListener("click", () => {
  foreignForm.classList.add("active-form");
  indianForm.classList.remove("active-form");

  foreignBtn.classList.add("active");
  indianBtn.classList.remove("active");
});


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

// impact section.
const diaryList = document.getElementById('diaryList');
const items = diaryList.children;
const itemHeight = 55; // same as CSS height of li
const visibleCount = 4;
let index = 0;

function slideDiaries() {
  index++;
  if (index > items.length - visibleCount) {
    index = 0;
  }
  diaryList.style.transform = `translateY(-${index * itemHeight}px)`;
}

// Start auto slide
setInterval(slideDiaries, 2000);
