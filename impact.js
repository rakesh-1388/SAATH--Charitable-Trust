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
