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

// =================================================================== 
// COPY BUTTON FUNCTIONALITY - Add to your core.js file
// ===================================================================

/**
 * Initialize copy buttons for all code containers
 * Call this function after the DOM is loaded
 */
function initializeCopyButtons() {
    // Find all code containers
    const codeContainers = document.querySelectorAll('.code-container');
    
    codeContainers.forEach(container => {
        // Skip if button already exists
        if (container.querySelector('.copy-code-button')) return;
        
        // Create the copy button
        const copyButton = createCopyButton();
        container.appendChild(copyButton);
        
        // Add click handler
        copyButton.addEventListener('click', () => {
            copyCodeFromContainer(container, copyButton);
        });
    });
}

/**
 * Create a copy button element with icons
 */
function createCopyButton() {
    const button = document.createElement('button');
    button.className = 'copy-code-button';
    button.setAttribute('aria-label', 'Copy code to clipboard');
    button.innerHTML = `
        <svg class="copy-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 4V16C8 17.1046 8.89543 18 10 18H18C19.1046 18 20 17.1046 20 16V7.24264C20 6.97721 19.8946 6.7228 19.7071 6.53553L16.4645 3.29289C16.2772 3.10536 16.0228 3 15.7574 3H10C8.89543 3 8 3.89543 8 5Z" stroke="currentColor" stroke-width="2"/>
            <path d="M16 18V20C16 21.1046 15.1046 22 14 22H6C4.89543 22 4 21.1046 4 20V9C4 7.89543 4.89543 7 6 7H8" stroke="currentColor" stroke-width="2"/>
        </svg>
        <svg class="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="copy-text">Copy</span>
    `;
    return button;
}

/**
 * Copy code content from a container to clipboard
 */
async function copyCodeFromContainer(container, button) {
    try {
        // Find the code element
        const codeElement = container.querySelector('pre code') || container.querySelector('code');
        if (!codeElement) {
            console.warn('No code element found in container');
            return;
        }
        
        // Get the text content, cleaning up any HTML
        let codeText = codeElement.textContent || codeElement.innerText;
        
        // Clean up the text (remove extra whitespace, normalize line endings)
        codeText = codeText.trim().replace(/\r\n/g, '\n');
        
        // Copy to clipboard
        await navigator.clipboard.writeText(codeText);
        
        // Show success feedback
        showCopySuccess(button);
        
    } catch (error) {
        console.error('Failed to copy code:', error);
        // Fallback for browsers that don't support clipboard API
        fallbackCopyCode(container, button);
    }
}

/**
 * Fallback copy method for older browsers
 */
function fallbackCopyCode(container, button) {
    try {
        const codeElement = container.querySelector('pre code') || container.querySelector('code');
        if (!codeElement) return;
        
        // Create a temporary textarea
        const textarea = document.createElement('textarea');
        textarea.value = codeElement.textContent || codeElement.innerText;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        
        // Select and copy
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        showCopySuccess(button);
    } catch (error) {
        console.error('Fallback copy failed:', error);
        showCopyError(button);
    }
}

/**
 * Show success feedback on the copy button
 */
function showCopySuccess(button) {
    const textSpan = button.querySelector('.copy-text');
    
    // Add copied class for styling
    button.classList.add('copied');
    if (textSpan) textSpan.textContent = 'Copied!';
    
    // Reset after 2 seconds
    setTimeout(() => {
        button.classList.remove('copied');
        if (textSpan) textSpan.textContent = 'Copy';
    }, 2000);
}

// Interactive slide counter functionality - Add to core.js

let isInputMode = false;

function toggleSlideInput() {
    const counter = document.getElementById('counter');
    
    if (isInputMode) return; // Prevent multiple inputs
    
    isInputMode = true;
    
    // Get current slide info
    const totalSlides = getSlides().length;
    const currentSlide = current + 1; // Convert to 1-based
    
    // Store original content
    const originalContent = counter.innerHTML;
    
    // Create input element
    const input = document.createElement('input');
    input.type = 'number';
    input.id = 'slide-input';
    input.min = '1';
    input.max = totalSlides.toString();
    input.value = currentSlide.toString();
    
    // Replace counter content with input
    counter.innerHTML = '';
    counter.appendChild(input);
    
    // Focus and select the input
    input.focus();
    input.select();
    
    // Handle input completion
    function handleInputComplete() {
        const newSlide = parseInt(input.value);
        
        // Validate and jump to slide if valid
        if (newSlide >= 1 && newSlide <= totalSlides) {
            jumpToSlide(newSlide - 1); // Convert to 0-based index
        }
        
        // Restore the counter display
        restoreCounter();
    }
    
    function restoreCounter() {
        // Update the counter with current state
        updateSlideCounter();
        
        // Add tooltip back
        const counterText = counter.textContent;
        counter.innerHTML = `
            ${counterText}
        `;
        
        isInputMode = false;
    }
    
    // Event listeners for input
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            handleInputComplete();
        } else if (e.key === 'Escape') {
            restoreCounter();
        }
    });
    
    input.addEventListener('blur', function() {
        handleInputComplete();
    });
}

function jumpToSlide(slideIndex) {
    const slides = getSlides();
    
    // Validate index
    if (slideIndex < 0 || slideIndex >= slides.length) {
        return;
    }
    
    // Update current slide
    current = slideIndex;
    
    // Show the slide
    showSlide(current);
}

// Update the existing updateSlideCounter function to handle tooltip
function updateSlideCounter() {
    const counter = document.getElementById('counter');
    const totalSlides = getSlides().length;
    
    if (counter && !isInputMode) {
        const currentSlide = current + 1;
        counter.innerHTML = `
            ${currentSlide} / ${totalSlides}
        `;
    }
}

/**
 * Show error feedback on the copy button
 */
function showCopyError(button) {
    const textSpan = button.querySelector('.copy-text');
    
    button.style.backgroundColor = 'rgba(211, 47, 47, 0.9)';
    if (textSpan) textSpan.textContent = 'Error';
    
    setTimeout(() => {
        button.style.backgroundColor = '';
        if (textSpan) textSpan.textContent = 'Copy';
    }, 2000);
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure all slides are loaded
    setTimeout(initializeCopyButtons, 100);
});

// Also initialize when new content is dynamically added
// (useful if slides are loaded dynamically)
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1 && node.querySelector && node.querySelector('.code-container')) {
                    setTimeout(initializeCopyButtons, 50);
                }
            });
        }
    });
});

// Start observing
observer.observe(document.body, {
    childList: true,
    subtree: true
});

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


document.addEventListener('DOMContentLoaded', setupCodeCopyButtons);


