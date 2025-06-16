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
      
      // Execute any scripts in the loaded content
      const scripts = slidesContainer.querySelectorAll('script');
      scripts.forEach(script => {
        if (script.src) {
          // External script
          const newScript = document.createElement('script');
          newScript.src = script.src;
          document.head.appendChild(newScript);
        } else {
          // Inline script - execute the code
          try {
            eval(script.textContent);
          } catch (error) {
            console.error(`Error executing script in ${section}:`, error);
          }
        }
      });
      
    } catch (error) {
      console.error(`Failed to load section: ${section}`, error);
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
  
  // Wait a bit longer for everything to settle, then initialize
  setTimeout(() => {
    initializeSlides();
  }, 200);
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
  
  // Run Prism syntax highlighting AFTER everything is loaded
  setTimeout(() => {
    if (typeof Prism !== 'undefined') {
      console.log('Running Prism.highlightAll()');
      Prism.highlightAll();
    } else {
      console.log('Prism not found');
    }
  }, 100);
  
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
  const slides = getSlides();
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
  const slides = getSlides();
  
  if (typeof slideAnimations !== 'undefined') {
    const currentSlide = slides[current];
    const slideId = currentSlide ? currentSlide.id : null;
    
    if (slideId && slideAnimations[slideId]) {
      if (slideAnimations[slideId]()) {
        return;
      }
    }
    else if (slideAnimations[current]) {
      if (slideAnimations[current]()) {
        return;
      }
    }
  }
  
  if (current < slides.length - 1) { 
    current++; 
    showSlide(current); 
  }
}

function prevSlide() { 
  const slides = getSlides();
  
  if (current > 0) { 
    current--; 
    showSlide(current); 
  }
}

function printAllSlides() {
  window.print();
}

document.addEventListener('DOMContentLoaded', () => {
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
  
  document.getElementById('annotationToggle').onclick = toggleAllAnnotations;

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    else if (e.key === 'ArrowRight') nextSlide();
  });

  updateTextSize();
});

// Base class - add this to animations.js or core.js
class SlideAnimation {
    constructor() {
        if (this.slideId === undefined) {
            throw new Error('slideId getter must be defined in subclass');
        }
        this.register();
    }
    
    get slideId() {
        throw new Error('slideId getter must be implemented in subclass');
    }
    
    register() {
        if (typeof window.slideAnimations === 'undefined') {
            window.slideAnimations = {};
        }
        window.slideAnimations[this.slideId] = () => this.animate();
    }
    
    animate() {
        throw new Error('animate() method must be implemented in subclass');
    }
}

