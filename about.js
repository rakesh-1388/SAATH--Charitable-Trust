const slider = document.getElementById("historySlider");
const cardWidth = 270; // card width + margin/gap
const totalCards = slider.children.length;
const visibleCards = 5;

let index = 0;

setInterval(() => {
  index++;
  if (index > totalCards - visibleCards) {
    index = 0; // restart from beginning
  }
  const offset = index * cardWidth;
  slider.style.transform = `translateX(-${offset}px)`;
}, 2500);
