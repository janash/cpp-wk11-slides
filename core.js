// --- core.js ---
// Manages the fundamental slide deck system.

// --- State and Variables ---
let current = 0;
let currentTextSize = parseFloat(localStorage.getItem('slideTextSize') || '1');

// --- Helper function to always get current slides ---
function getSlides() {
  return document.querySelectorAll('.slide');
}

// --- Core Functions ---

async function loadSections(sectionNames) {
  const slidesContainer = document.getElementById('slides');
  
  // Clear any existing content
  slidesContainer.innerHTML = '';
  
  for (const section of sectionNames) {
    try {
      console.log(`Loading section: ${section}`);
      const response = await fetch(`sections/${section}.html`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const html = await response.text();
      slidesContainer.insertAdjacentHTML('beforeend', html);
      
    } catch (error) {
      console.error(`Failed to load section: ${section}`, error);
      // You could add a placeholder slide for missing sections
      slidesContainer.insertAdjacentHTML('beforeend', 
        `<section class="slide">
          <div class="slide-body">
            <h2>Error loading section: ${section}</h2>
            <p>Check that sections/${section}.html exists</p>
          </div>
        </section>`
      );
    }
  }
  
  // Initialize slides after all sections are loaded
  initializeSlides();
}

function initializeSlides() {
  const slides = getSlides();
  
  // Hide all slides except the first
  slides.forEach((slide, index) => {
    slide.style.display = index === 0 ? 'block' : 'none';
  });
  
  // Reset current slide to 0
  current = 0;
  
  // Update counter
  updateSlideCounter();
  
  // Re-run Prism syntax highlighting if it exists
  if (typeof Prism !== 'undefined') {
    Prism.highlightAll();
  }
  
  console.log(`Loaded ${slides.length} slides total`);
}

function updateSlideCounter() {
  const counter = document.getElementById('counter');
  const totalSlides = getSlides().length;
  if (counter) {
    const currentSlide = getCurrentSlideIndex() + 1;
    counter.textContent = `${currentSlide} / ${totalSlides}`;
  }
}

function getCurrentSlideIndex() {
  const slides = getSlides();
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].style.display !== 'none') {
      return i;
    }
  }
  return 0;
}

function updateTextSize() {
  document.documentElement.style.setProperty('--slide-font-size', `${currentTextSize}em`);
  localStorage.setItem('slideTextSize', currentTextSize);
}

function showSlide(index) {
  const slides = getSlides(); // Get slides dynamically
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
  const slides = getSlides(); // Get slides dynamically
  
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
  const slides = getSlides(); // Get slides dynamically
  
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
  
  // Add annotation toggle button listener
  document.getElementById('annotationToggle').onclick = toggleAllAnnotations;

  // Set up keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    else if (e.key === 'ArrowRight') nextSlide();
  });

  // Apply initial sizes
  updateTextSize();
  
  // Note: Don't call showSlide(current) here since slides aren't loaded yet
  // The loadSections() call in index.html will handle initialization
});