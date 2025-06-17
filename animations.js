// --- Generic Animation State & Helpers ---

let animationStep = 0;

// Global state for annotations
let annotationsVisible = true;

// Toggle function
function toggleAllAnnotations() {
    const toggleButton = document.getElementById('annotationToggle');
    const toggleText = toggleButton.querySelector('.toggle-text');
    const toggleIcon = toggleButton.querySelector('.toggle-icon');
    
    annotationsVisible = !annotationsVisible;
    
    if (annotationsVisible) {
        // Show all annotations
        showAllAnnotations();
        toggleButton.classList.remove('annotations-hidden');
        toggleText.textContent = 'Hide Annotations';
        toggleIcon.textContent = '👁️';
    } else {
        // Hide all annotations
        hideAllAnnotations();
        toggleButton.classList.add('annotations-hidden');
        toggleText.textContent = 'Show Annotations';
        toggleIcon.textContent = '🙈';
    }
}

function showAllAnnotations() {
    // Show all code annotations
    document.querySelectorAll('.code-annotation').forEach(annotation => {
        annotation.classList.add('show');
    });
    
    // Show all highlight overlays
    document.querySelectorAll('.highlight-overlay').forEach(overlay => {
        overlay.style.opacity = '1';
    });
    
    // Show other annotation elements if they exist
    const annotationElements = [
        '#limitations-box', 
        '#size-info', 
        '#python-comparison', 
        '#access-warning', 
        '#map-warning'
    ];
    
    annotationElements.forEach(selector => {
        const el = document.querySelector(selector);
        if (el && el.classList.contains('annotation-element')) {
            el.style.opacity = '1';
        }
    });
}

function hideAllAnnotations() {
    // Hide all code annotations
    document.querySelectorAll('.code-annotation').forEach(annotation => {
        annotation.classList.remove('show');
    });
    
    // Hide all highlight overlays
    document.querySelectorAll('.highlight-overlay').forEach(overlay => {
        overlay.style.opacity = '0';
    });
    
    // Hide other annotation elements if they exist
    const annotationElements = [
        '#limitations-box', 
        '#size-info', 
        '#python-comparison', 
        '#access-warning', 
        '#map-warning'
    ];
    
    annotationElements.forEach(selector => {
        const el = document.querySelector(selector);
        if (el && el.classList.contains('annotation-element')) {
            el.style.opacity = '0';
        }
    });
}

// Enhanced resetAnimations function that respects the toggle state
function resetAnimations() {
    animationStep = 0;
    
    // Remove highlight overlays
    document.querySelectorAll('.highlight-overlay').forEach(el => el.remove());

    // Reset states based on current toggle state
    if (annotationsVisible) {
        // If annotations should be visible, reset to show state
        document.querySelectorAll('.code-annotation').forEach(el => el.classList.remove('show'));
        document.querySelectorAll('.highlight').forEach(el => el.classList.remove('highlight'));
        
        const elementsToReset = ['#limitations-box', '#size-info', '#python-comparison', '#access-warning', '#map-warning'];
        elementsToReset.forEach(selector => {
            const el = document.querySelector(selector);
            if (el) el.style.opacity = '0';
        });
    } else {
        // If annotations should be hidden, keep them hidden
        hideAllAnnotations();
    }

    const bgToReset = ['#bracket-method', '#at-method'];
    bgToReset.forEach(selector => {
        const el = document.querySelector(selector);
        if(el) el.style.background = '';
    });
}

// Robust event listener attachment for annotation toggle button
function attachAnnotationToggle() {
    const toggleButton = document.getElementById('annotationToggle');
    if (toggleButton) {
        toggleButton.onclick = toggleAllAnnotations;
        console.log('Annotation toggle button attached');
    } else {
        console.log('Annotation toggle button not found');
    }
}

// Try to attach the button event listener
document.addEventListener('DOMContentLoaded', function() {
    // Try immediately
    attachAnnotationToggle();
    
    // Also try after a short delay in case button loads later
    setTimeout(attachAnnotationToggle, 100);
});

// Optional keyboard shortcut
document.addEventListener('keydown', function(e) {
    if (e.key === 'a' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        toggleAllAnnotations();
    }
});

// Modified highlightCode function with color support (backward compatible)
function highlightCode(codeBlockId, textToFind, color = 'rgba(255, 215, 0, 0.4)', className = 'highlight-overlay') {
    // Only highlight if annotations are visible
    if (!annotationsVisible) return;
    
    const codeBlock = document.getElementById(codeBlockId);
    if (!codeBlock || !textToFind) return;

    // Helper to find node and offset of a character index
    const findChildNodeAndOffset = (container, overallCharIndex) => {
        const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
        let currentNode = walker.nextNode();
        let accumulatedLength = 0;
        while (currentNode) {
            const nodeLength = currentNode.textContent.length;
            if (accumulatedLength + nodeLength >= overallCharIndex) {
                return { node: currentNode, offset: overallCharIndex - accumulatedLength };
            }
            accumulatedLength += nodeLength;
            currentNode = walker.nextNode();
        }
        return null;
    };

    const fullText = codeBlock.textContent;
    const startIndex = fullText.indexOf(textToFind);
    if (startIndex === -1) return;
    const endIndex = startIndex + textToFind.length;

    const startPosition = findChildNodeAndOffset(codeBlock, startIndex);
    const endPosition = findChildNodeAndOffset(codeBlock, endIndex);

    if (!startPosition || !endPosition) return;

    const range = document.createRange();
    range.setStart(startPosition.node, startPosition.offset);
    range.setEnd(endPosition.node, endPosition.offset);

    const targetRect = range.getBoundingClientRect();
    if (targetRect.width === 0 && targetRect.height === 0) return;

    const container = codeBlock.closest('.code-container');
    const containerRect = container.getBoundingClientRect();

    // Create and position the highlight overlay element
    const overlay = document.createElement('div');
    overlay.className = className;
    overlay.style.position = 'absolute';
    overlay.style.top = `${targetRect.top - containerRect.top}px`;
    overlay.style.left = `${targetRect.left - containerRect.left}px`;
    overlay.style.width = `${targetRect.width}px`;
    overlay.style.height = `${targetRect.height}px`;
    overlay.style.backgroundColor = color; // Use the provided color (defaults to yellow)
    overlay.style.borderRadius = '3px';
    overlay.style.zIndex = '0';
    overlay.style.pointerEvents = 'none';

    container.appendChild(overlay);
}

function positionAnnotation(codeBlockId, textToFind, annotationId) {
    // Only show annotations if they're supposed to be visible
    if (!annotationsVisible) return;
    
    const codeBlock = document.getElementById(codeBlockId);
    const annotation = document.getElementById(annotationId);
    if (!codeBlock || !annotation || !textToFind) return;

    const walker = document.createTreeWalker(codeBlock, NodeFilter.SHOW_TEXT);
    let fullText = '';
    const nodeMap = [];
    let node;
    while(node = walker.nextNode()) {
        nodeMap.push({ node: node, start: fullText.length, end: fullText.length + node.textContent.length });
        fullText += node.textContent;
    }

    const startIndex = fullText.indexOf(textToFind);
    if (startIndex === -1) return;

    const range = document.createRange();
    let foundStart = false;

    for (const item of nodeMap) {
        if (!foundStart && startIndex >= item.start && startIndex < item.end) {
            range.setStart(item.node, startIndex - item.start);
            foundStart = true;
        }
        if (foundStart && (startIndex + textToFind.length) <= item.end) {
            range.setEnd(item.node, (startIndex + textToFind.length) - item.start);
            break;
        }
    }
    
    const targetRect = range.getBoundingClientRect();
    if (targetRect.width === 0 && targetRect.height === 0) return;
    
    const container = codeBlock.closest('.code-container');
    const containerRect = container.getBoundingClientRect();

    const left = targetRect.left - containerRect.left + (targetRect.width / 2) - (annotation.offsetWidth / 2);
    const top = targetRect.top - containerRect.top - annotation.offsetHeight - 10; // 10px above

    annotation.style.left = left + 'px';
    annotation.style.top = top + 'px';
    annotation.classList.add('show');
}

// --- Other Helper Functions (Enhanced) ---

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightListItem(listId, index) {
    const list = document.getElementById(listId);
    if (list) {
        const items = list.querySelectorAll('.highlight-item');
        if (items[index]) items[index].classList.add('highlight');
    }
}

// Enhanced showElement function that respects annotation visibility
function showElement(elementId) {
    const element = document.getElementById(elementId);
    if (element && annotationsVisible) {
        element.style.opacity = '1';
    }
    // If annotations are hidden, don't show the element
}

function runAnimationSteps(steps) {
    if (animationStep < steps.length) {
        if (typeof steps[animationStep] === 'function') {
            steps[animationStep]();
        }
        animationStep++;
        return true; 
    }
    return false;
}

function highlightBackground(elementId, color) {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.background = color;
    element.style.transition = 'background 0.3s ease';
  }
}