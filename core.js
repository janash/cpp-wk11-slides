// --- core.js ---
// Manages the fundamental slide deck system.

'use strict';

// --- Constants and Configuration ---
const SLIDE_SELECTOR = '.slide';
const SLIDES_CONTAINER_ID = 'slides';
const COUNTER_ID = 'counter';
const SLIDE_INPUT_ID = 'slide-input';
const COPY_BUTTON_CLASS = 'copy-code-button';
const CODE_CONTAINER_SELECTOR = '.code-container';
const COPY_TEXT_SPAN_CLASS = 'copy-text';

const NAVIGATION_ELEMENTS_TO_HIDE = [
  '.nav',
  '.sidebar',
  '.sidebar-overlay',
  '.hamburger-menu'
];

const ANIMATION_RESET_DELAY = 50;
const PRISM_HIGHLIGHT_DELAY = 100;
const PRINT_RESTORE_DELAY = 2000;
const ERROR_MESSAGE_DISPLAY_TIME = 2000;
const AUTO_SIZE_CODE_DELAY = 500;

// --- State Variables ---
let currentSlideIndex = 0;
let currentTextSize = parseFloat(localStorage.getItem('slideTextSize') || '1');
let isSlideInputMode = false;
let skipAnimations = false; // Flag for keyboard navigation to bypass animations

// Global access for slide animations (defined in other scripts if present)
// window.slideAnimations = {}; // Initialized if not already by SlideAnimation class

// --- Helper Functions ---

/**
 * Always get a fresh NodeList of slides from the DOM.
 * Call this after dynamic content changes (e.g., loadSections).
 * @returns {NodeList} A NodeList containing all slide elements.
 */
function getSlides() {
  return document.querySelectorAll(SLIDE_SELECTOR);
}

/**
 * Executes a script element's content.
 * This is a safer alternative to `eval()`.
 * @param {HTMLScriptElement} script - The script element to execute.
 */
function executeScript(script) {
  const newScript = document.createElement('script');
  if (script.src) {
    newScript.src = script.src;
    newScript.async = false; // Maintain execution order if needed
    document.head.appendChild(newScript);
  } else {
    try {
      newScript.textContent = script.textContent;
      document.head.appendChild(newScript);
    } catch (error) {
      console.error('Error executing inline script:', error);
    }
  }
  // Remove the script after execution to prevent duplicates on subsequent loads if not needed
  if (newScript.parentNode) {
    newScript.parentNode.removeChild(newScript);
  }
}

// --- Core Slide Deck Functions ---

/**
 * Loads HTML sections dynamically into the slides container.
 * @param {string[]} sectionNames - An array of section file names (e.g., ['intro', 'chapter1']).
 */
async function loadSections(sectionNames) {
  const slidesContainer = document.getElementById(SLIDES_CONTAINER_ID);
  if (!slidesContainer) {
    console.error(`Slides container #${SLIDES_CONTAINER_ID} not found.`);
    return;
  }

  // Clear any existing content
  slidesContainer.innerHTML = '';

  for (const section of sectionNames) {
    try {
      // console.log(`Loading section: ${section}`); // Keep for debugging if needed
      const response = await fetch(`sections/${section}.html`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      slidesContainer.insertAdjacentHTML('beforeend', html);

      // Execute any scripts within the loaded HTML
      // Note: Scripts added via innerHTML might not execute automatically.
      // We manually parse and execute them.
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      const scripts = tempDiv.querySelectorAll('script');
      scripts.forEach(executeScript);

    } catch (error) {
      console.error(`Failed to load section: ${section}`, error);
      slidesContainer.insertAdjacentHTML('beforeend',
        `<section class="slide">
           <div class="slide-body">
             <h2>Error loading section: ${section}</h2>
             <p>Please check that <code>sections/${section}.html</code> exists and is accessible.</p>
             <p>Error details: ${error.message}</p>
           </div>
         </section>`
      );
    }
  }

  // Allow a brief moment for DOM to settle, then initialize slides
  setTimeout(initializeSlides, 200);
}

/**
 * Initializes the slide deck after content is loaded.
 * Hides all slides except the first and updates the counter.
 */
function initializeSlides() {
  const slides = getSlides();

  slides.forEach((slide, index) => {
    slide.style.display = index === 0 ? 'block' : 'none';
  });

  currentSlideIndex = 0; // Reset to the first slide
  updateSlideCounter();
  applyTextSize(); // Apply stored text size

  // Run Prism syntax highlighting after all content is in DOM
  setTimeout(() => {
    if (typeof Prism !== 'undefined') {
      // console.log('Running Prism.highlightAll()'); // Keep for debugging if needed
      Prism.highlightAll();
    } else {
      console.warn('Prism (syntax highlighter) not found.');
    }
    initializeCopyButtons(); // Initialize copy buttons after Prism
    autoSizeCode(); // Auto-size code blocks after content is ready
  }, PRISM_HIGHLIGHT_DELAY);

  console.log(`Initialized with ${slides.length} slides.`);
}

/**
 * Updates the slide counter display in the navigation.
 */
function updateSlideCounter() {
  const counter = document.getElementById(COUNTER_ID);
  const totalSlides = getSlides().length;
  if (counter && !isSlideInputMode) {
    counter.textContent = `${currentSlideIndex + 1} / ${totalSlides}`;
  }
}

/**
 * Updates the custom CSS variable for slide font size.
 */
function applyTextSize() {
  document.documentElement.style.setProperty('--slide-font-size', `${currentTextSize}em`);
  localStorage.setItem('slideTextSize', currentTextSize.toString());
}

/**
 * Displays a specific slide by its index.
 * @param {number} index - The index of the slide to show.
 */
function showSlide(index) {
  const slides = getSlides();
  if (index < 0 || index >= slides.length) {
    console.warn(`Attempted to show invalid slide index: ${index}`);
    return;
  }

  // Hide all slides, then show the target slide
  slides.forEach((s, i) => s.style.display = i === index ? 'block' : 'none');
  currentSlideIndex = index;
  updateSlideCounter();

  // Reset any slide-specific animations
  if (typeof resetAnimations === 'function') {
    resetAnimations();
  }

  // Re-highlight code for the new slide in case of dynamic content or state changes
  setTimeout(() => {
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll();
    }
  }, ANIMATION_RESET_DELAY);
}

/**
 * Navigates to the next slide or triggers an animation step.
 */
function nextSlide() {
  const slides = getSlides();

  // Determine if animations should be skipped (e.g., via Shift+Right or Spacebar)
  const shouldSkipAnimations = !window.annotationsVisible || skipAnimations;

  // Try to run slide-specific animation step first
  if (!shouldSkipAnimations && typeof window.slideAnimations !== 'undefined') {
    const currentSlideElement = slides[currentSlideIndex];
    const slideId = currentSlideElement ? currentSlideElement.id : null;

    if (slideId && window.slideAnimations[slideId]) {
      // If animation function exists and returns true, it means an animation step occurred.
      if (window.slideAnimations[slideId]()) {
        return; // Animation step executed, stay on current slide
      }
    }
  }

  // If no animation ran or animations are skipped, proceed to the next slide
  if (currentSlideIndex < slides.length - 1) {
    showSlide(currentSlideIndex + 1);
  }
}

/**
 * Navigates to the previous slide.
 */
function prevSlide() {
  if (currentSlideIndex > 0) {
    showSlide(currentSlideIndex - 1);
  }
}

/**
 * Initiates the print process for all slides.
 */
function printAllSlides() {
  // console.log('Print function called'); // Keep for debugging if needed

  const slides = getSlides();
  if (slides.length === 0) {
    console.warn('No slides found to print.');
    return;
  }

  const originalCurrentSlide = currentSlideIndex; // Store current slide to restore later

  // Force ALL slides to be visible before printing
  slides.forEach((slide, index) => {
    slide.style.display = 'block';
    slide.style.pageBreakAfter = 'always';
    slide.style.visibility = 'visible'; // Ensure visibility
    slide.style.opacity = '1'; // Ensure full opacity
  });

  // Remove the last slide's page break to avoid blank page
  slides[slides.length - 1].style.pageBreakAfter = 'avoid';

  // Hide navigation and other UI elements for printing
  const hiddenElements = [];
  NAVIGATION_ELEMENTS_TO_HIDE.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      // Store original display to restore later
      hiddenElements.push({ element: el, originalDisplay: el.style.display });
      el.style.display = 'none';
    });
  });

  // Add a class to body for print-specific styling (defined in CSS)
  document.body.classList.add('printing-all-slides');

  // Print after a short delay to ensure layout is complete
  setTimeout(() => {
    window.print();

    // Restore original state after printing
    setTimeout(() => {
      // console.log('Restoring original slide visibility...'); // Keep for debugging if needed

      // Hide all slides except the one that was active before printing
      slides.forEach((slide, index) => {
        slide.style.display = index === originalCurrentSlide ? 'block' : 'none';
        slide.style.pageBreakAfter = ''; // Clear page break
        slide.style.visibility = ''; // Clear inline visibility
        slide.style.opacity = ''; // Clear inline opacity
      });

      // Restore previously hidden UI elements
      hiddenElements.forEach(({ element, originalDisplay }) => {
        element.style.display = originalDisplay;
      });

      // Remove print class from body
      document.body.classList.remove('printing-all-slides');

      // console.log('Print state restored'); // Keep for debugging if needed
    }, PRINT_RESTORE_DELAY);
  }, 300); // Small delay to allow DOM to render for print preview
}

// --- Interactive Slide Counter (Jump to Slide) ---

/**
 * Toggles the slide counter between display and input modes.
 */
function toggleSlideInput() {
  const counter = document.getElementById(COUNTER_ID);
  if (!counter || isSlideInputMode) return;

  isSlideInputMode = true;

  const totalSlides = getSlides().length;
  const currentSlideNum = currentSlideIndex + 1;

  const input = document.createElement('input');
  input.type = 'text'; // Use text to allow initial non-numeric display if desired
  input.id = SLIDE_INPUT_ID;
  input.value = currentSlideNum.toString();
  input.maxLength = totalSlides.toString().length; // Limit input length

  counter.innerHTML = ''; // Clear counter text
  counter.appendChild(input);

  input.focus();
  input.select(); // Select current value for easy overwrite

  // Input validation: allow only numeric input and limit length
  input.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    if (e.target.value.length > totalSlides.toString().length) {
      e.target.value = e.target.value.slice(0, totalSlides.toString().length);
    }
  });

  const handleInputComplete = () => {
    const newSlideNum = parseInt(input.value, 10); // Parse as base 10

    if (!isNaN(newSlideNum) && newSlideNum >= 1 && newSlideNum <= totalSlides) {
      showSlide(newSlideNum - 1); // Jump to 0-indexed slide
      restoreCounter();
    } else {
      showInvalidMessage(totalSlides);
    }
  };

  const showInvalidMessage = (total) => {
    input.style.borderColor = '#d32f2f'; // Error color
    input.style.backgroundColor = '#ffebee'; // Light red background

    const errorMsg = document.createElement('div');
    errorMsg.textContent = `Invalid slide number. Must be 1-${total}.`;
    errorMsg.style.cssText = `
      color: white;
      background: #d32f2f;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 0.9em;
      text-align: center;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      top: -40px; /* Position above input */
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      z-index: 1000;
    `;

    // Add tooltip arrow
    const arrow = document.createElement('div');
    arrow.style.cssText = `
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid #d32f2f;
    `;
    errorMsg.appendChild(arrow);

    counter.style.position = 'relative'; // Enable positioning for error message
    counter.appendChild(errorMsg);

    setTimeout(restoreCounter, ERROR_MESSAGE_DISPLAY_TIME);
  };

  const restoreCounter = () => {
    counter.style.position = ''; // Remove inline position style
    isSlideInputMode = false;
    updateSlideCounter();
  };

  // Event listeners for input completion
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleInputComplete();
    } else if (e.key === 'Escape') {
      restoreCounter();
    }
  });

  input.addEventListener('blur', handleInputComplete);
}

// --- Keyboard Navigation ---

/**
 * Handles global keyboard presses for slide navigation and actions.
 * @param {KeyboardEvent} e - The keyboard event object.
 */
function handleKeyPress(e) {
  if (isSlideInputMode) return; // Don't interfere with input mode

  switch (e.key) {
    case 'ArrowLeft':
      prevSlide();
      break;
    case 'ArrowRight':
      // Shift + Right Arrow: Skip animations and go to next slide
      if (e.shiftKey) {
        skipAnimations = true;
        nextSlide();
        skipAnimations = false; // Reset flag immediately after use
      } else {
        nextSlide(); // Regular Right Arrow: Normal navigation (with animations)
      }
      break;
    case ' ': // Spacebar
      e.preventDefault(); // Prevent default scroll behavior
      skipAnimations = true;
      nextSlide();
      skipAnimations = false; // Reset flag
      break;
    case 'f':
    case 'F':
      e.preventDefault();
      if (!document.fullscreenElement) {
        enterFullscreen();
      } else {
        exitFullscreen();
      }
      break;
  }
}

// --- Event Listeners and Initial Setup ---

document.addEventListener('DOMContentLoaded', () => {
  // Event listeners for navigation and text size buttons
  document.getElementById('bigger-text').onclick = () => {
    currentTextSize = parseFloat((currentTextSize + 0.05).toFixed(2)); // Prevent float precision issues
    applyTextSize();
  };

  document.getElementById('smaller-text').onclick = () => {
    currentTextSize = parseFloat((currentTextSize - 0.05).toFixed(2)); // Prevent float precision issues
    applyTextSize();
  };

  document.getElementById('next').onclick = nextSlide;
  document.getElementById('prev').onclick = prevSlide;
  document.getElementById('print').onclick = printAllSlides;

  // Event listener for annotation toggle (assuming `toggleAllAnnotations` is defined elsewhere)
  const annotationToggle = document.getElementById('annotationToggle');
  if (annotationToggle) {
    annotationToggle.onclick = typeof toggleAllAnnotations === 'function' ? toggleAllAnnotations : () => console.warn('toggleAllAnnotations function not found.');
  } else {
    console.warn('Annotation toggle button not found.');
  }


  // Event listener for slide counter click to enable input mode
  const counterElement = document.getElementById(COUNTER_ID);
  if (counterElement) {
    counterElement.addEventListener('click', toggleSlideInput);
  } else {
    console.warn('Slide counter element not found.');
  }


  // Global keyboard navigation
  document.addEventListener('keydown', handleKeyPress);

  // Initial application of text size from localStorage
  applyTextSize();
});

// ===================================================================
// COPY BUTTON FUNCTIONALITY
// ===================================================================

/**
 * Initializes copy buttons for all code containers.
 * Call this function after the DOM is loaded and after any dynamic content changes.
 */
function initializeCopyButtons() {
  const codeContainers = document.querySelectorAll(CODE_CONTAINER_SELECTOR);

  codeContainers.forEach(container => {
    // Skip if button already exists to prevent duplicates
    if (container.querySelector(`.${COPY_BUTTON_CLASS}`)) return;

    const copyButton = createCopyButton();
    container.appendChild(copyButton);

    copyButton.addEventListener('click', () => {
      copyCodeFromContainer(container, copyButton);
    });
  });
}

/**
 * Creates a copy button element with SVG icons and text.
 * @returns {HTMLButtonElement} The created button element.
 */
function createCopyButton() {
  const button = document.createElement('button');
  button.className = COPY_BUTTON_CLASS;
  button.setAttribute('aria-label', 'Copy code to clipboard');
  button.innerHTML = `
    <svg class="copy-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 4V16C8 17.1046 8.89543 18 10 18H18C19.1046 18 20 17.1046 20 16V7.24264C20 6.97721 19.8946 6.7228 19.7071 6.53553L16.4645 3.29289C16.2772 3.10536 16.0228 3 15.7574 3H10C8.89543 3 8 3.89543 8 5Z" stroke="currentColor" stroke-width="2"/>
      <path d="M16 18V20C16 21.1046 15.1046 22 14 22H6C4.89543 22 4 21.1046 4 20V9C4 7.89543 4.89543 7 6 7H8" stroke="currentColor" stroke-width="2"/>
    </svg>
    <svg class="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span class="${COPY_TEXT_SPAN_CLASS}">Copy</span>
  `;
  return button;
}

/**
 * Copies code content from a given container to the clipboard.
 * Uses the modern Clipboard API with a fallback for older browsers.
 * @param {HTMLElement} container - The code container element.
 * @param {HTMLButtonElement} button - The copy button element to update its state.
 */
async function copyCodeFromContainer(container, button) {
  try {
    const codeElement = container.querySelector('pre code') || container.querySelector('code');
    if (!codeElement) {
      console.warn('No code element found in container for copying.');
      return;
    }

    let codeText = codeElement.textContent || codeElement.innerText;
    codeText = codeText.trim().replace(/\r\n/g, '\n'); // Normalize line endings

    // Use Clipboard API if available
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(codeText);
      showCopyFeedback(button, true); // True for success
    } else {
      // Fallback for older browsers
      fallbackCopyCode(codeText, button);
    }
  } catch (error) {
    console.error('Failed to copy code:', error);
    showCopyFeedback(button, false); // False for error
  }
}

/**
 * Fallback copy method for browsers without Clipboard API support.
 * @param {string} text - The text content to copy.
 * @param {HTMLButtonElement} button - The copy button element.
 */
function fallbackCopyCode(text, button) {
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed'; // Keep it off-screen
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select(); // Select the text

    document.execCommand('copy'); // Execute copy command
    document.body.removeChild(textarea); // Clean up

    showCopyFeedback(button, true);
  } catch (error) {
    console.error('Fallback copy failed:', error);
    showCopyFeedback(button, false);
  }
}

/**
 * Displays visual feedback on the copy button (success or error).
 * @param {HTMLButtonElement} button - The copy button element.
 * @param {boolean} success - True if copy was successful, false otherwise.
 */
function showCopyFeedback(button, success) {
  const textSpan = button.querySelector(`.${COPY_TEXT_SPAN_CLASS}`);

  if (success) {
    button.classList.add('copied');
    if (textSpan) textSpan.textContent = 'Copied!';
  } else {
    button.classList.add('error'); // Add an 'error' class for styling if desired
    if (textSpan) textSpan.textContent = 'Error';
    button.style.backgroundColor = 'rgba(211, 47, 47, 0.9)'; // Direct style for immediate feedback
  }

  // Reset feedback after a delay
  setTimeout(() => {
    button.classList.remove('copied', 'error');
    if (textSpan) textSpan.textContent = 'Copy';
    button.style.backgroundColor = ''; // Clear direct style
  }, 2000);
}

// Auto-initialize copy buttons when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure all DOM elements are rendered
  setTimeout(initializeCopyButtons, PRISM_HIGHLIGHT_DELAY);
});

// Observe DOM changes to initialize copy buttons for dynamically added code blocks
const domObserver = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        // Check if the added node is an element and contains a code container
        if (node.nodeType === Node.ELEMENT_NODE && node.querySelector(CODE_CONTAINER_SELECTOR)) {
          // Small delay to ensure inner content is rendered (e.g., by Prism)
          setTimeout(initializeCopyButtons, 50);
        }
      });
    }
  });
});

// Start observing the body for childList and subtree changes
domObserver.observe(document.body, {
  childList: true,
  subtree: true
});

// --- Code Block Auto-Sizing ---

/**
 * Adjusts font size of code blocks based on the number of lines to fit.
 */
function autoSizeCode() {
  document.querySelectorAll('.code-container pre code').forEach(codeBlock => {
    const lines = codeBlock.textContent.split('\n').filter(line => line.trim() !== '').length; // Count non-empty lines
    let fontSize;

    if (lines <= 10) fontSize = '1em';
    else if (lines <= 15) fontSize = '0.9em';
    else if (lines <= 20) fontSize = '0.8em';
    else fontSize = '0.75em';

    codeBlock.style.fontSize = fontSize;
  });
}

// Call after slides load for initial sizing
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(autoSizeCode, AUTO_SIZE_CODE_DELAY);
});


// --- Fullscreen Functionality ---

/**
 * Enters fullscreen mode for the document.
 */
function enterFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode for the document.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

// Listener for fullscreen state changes (e.g., if user exits with ESC)
document.addEventListener('fullscreenchange', () => {
  // You can add logic here to update UI for fullscreen status
  // e.g., if you have a button that toggles fullscreen, update its icon/text
});


// ===================================================================
// SLIDE ANIMATION BASE CLASS (for extensibility)
// ===================================================================

/**
 * Base class for defining slide-specific animations.
 * Subclasses must define a `slideId` getter and an `animate()` method.
 */
class SlideAnimation {
  constructor() {
    // Ensure window.slideAnimations exists for registration
    if (typeof window.slideAnimations === 'undefined') {
      window.slideAnimations = {};
    }
    this.register();
  }

  /**
   * Abstract getter for the slide's ID. Must be implemented by subclasses.
   * @throws {Error} If not implemented by a subclass.
   * @returns {string} The ID of the slide this animation applies to.
   */
  get slideId() {
    throw new Error('slideId getter must be implemented in subclass');
  }

  /**
   * Registers the animation instance with the global `window.slideAnimations` object.
   */
  register() {
    window.slideAnimations[this.slideId] = () => this.animate();
  }

  /**
   * Abstract method to define the animation steps. Must be implemented by subclasses.
   * @throws {Error} If not implemented by a subclass.
   * @returns {boolean} True if an animation step was executed, false if no more steps.
   */
  animate() {
    throw new Error('animate() method must be implemented in subclass');
  }
}