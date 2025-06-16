// --- core.js ---
// Manages the fundamental slide deck system.

// --- State and Variables ---
const slides = document.querySelectorAll('.slide');
let current = 0;
let currentTextSize = parseFloat(localStorage.getItem('slideTextSize') || '1');
// NOTE: The code-size logic is removed as the buttons were removed.

// --- Core Functions ---

function updateTextSize() {
  document.documentElement.style.setProperty('--slide-font-size', `${currentTextSize}em`);
  localStorage.setItem('slideTextSize', currentTextSize);
}

function showSlide(index) {
  slides.forEach((s, i) => s.style.display = i === index ? 'block' : 'none');
  const counter = document.getElementById('counter');
  if (counter) {
    counter.textContent = `${index + 1} / ${slides.length}`;
  }
  
  if (typeof resetAnimations === 'function') {
    resetAnimations();
  }
  
  setTimeout(() => {
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll();
    }
  }, 50);
}

function nextSlide() { 
  if (typeof slideAnimations !== 'undefined' && slideAnimations[current]) {
    if (slideAnimations[current]()) {
      return; 
    }
  }
  
  if (current < slides.length - 1) { 
    current++; 
    showSlide(current); 
  }
}

function prevSlide() { 
  if (current > 0) { 
    current--; 
    showSlide(current); 
  }
}

function printAllSlides() {
  window.print();
}

// --- Initial Setup ---
// This event listener ensures that all code inside it only runs AFTER the entire
// HTML document has been loaded and is ready to be interacted with.
document.addEventListener('DOMContentLoaded', () => {

  // Attach all event listeners to the navigation buttons
  document.getElementById('bigger-text').onclick = () => {
    currentTextSize += 0.05;
    updateTextSize();
  };
  
  document.getElementById('smaller-text').onclick = () => {
    currentTextSize -= 0.05;
    updateTextSize();
  };
  
  document.getElementById('next').onclick = nextSlide;
  document.getElementById('prev').onclick = prevSlide;
  document.getElementById('print').onclick = printAllSlides;

  // Set up keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    else if (e.key === 'ArrowRight') nextSlide();
  });

  // Apply initial sizes and show the first slide
  updateTextSize();
  showSlide(current);
});