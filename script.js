// Hide top violet bar on scroll
let prevScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const topStrip = document.getElementById("top-strip");
  const currentScrollY = window.scrollY;

  if (currentScrollY > prevScrollY) {
    // Scrolling down
    topStrip.style.top = "-40px";
  } else {
    // Scrolling up
    topStrip.style.top = "0";
  }

  prevScrollY = currentScrollY;
});
// Hero slide section 
const slides = document.querySelectorAll(".slide");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

let currentSlide = 0;
let slideInterval = setInterval(nextSlide, 5000); // 5 seconds

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
  });
  slides[index].classList.add("active");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Event listeners
rightArrow.addEventListener("click", () => {
  nextSlide();
  resetInterval();
});

leftArrow.addEventListener("click", () => {
  prevSlide();
  resetInterval();
});

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 6000);
}

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




// Auto-scroll blog section
document.addEventListener("DOMContentLoaded", () => {
  const blogList = document.querySelector(".blog-list");
  const blogItems = document.querySelectorAll(".blog-item");
  let currentIndex = 0;
  const visibleItems = 4;

  setInterval(() => {
    currentIndex++;
    if (currentIndex > blogItems.length - visibleItems) {
      currentIndex = 0;
    }
    blogList.style.transform = `translateY(-${currentIndex * (blogItems[0].offsetHeight + 16)}px)`;
  }, 2000);
});


// donate section
window.addEventListener("scroll", () => {
  const section = document.querySelector(".donate-content");
  const sectionTop = section.getBoundingClientRect().top;
  const triggerPoint = window.innerHeight - 100;

  if (sectionTop < triggerPoint) {
    section.classList.add("show");
  } else {
    section.classList.remove("show"); // Remove if you want it to animate again on re-scroll
  }
});


