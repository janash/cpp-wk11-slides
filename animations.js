// --- Generic Animation State & Helpers ---

let animationStep = 0;

function resetAnimations() {
    animationStep = 0;
    
    // Remove any highlight overlays created by the new highlightCode function
    document.querySelectorAll('.highlight-overlay').forEach(el => el.remove());

    // Reset other states
    document.querySelectorAll('.code-annotation.show').forEach(el => el.classList.remove('show'));
    document.querySelectorAll('.highlight').forEach(el => el.classList.remove('highlight'));
    
    const elementsToReset = ['#limitations-box', '#size-info', '#python-comparison', '#access-warning', '#map-warning'];
    elementsToReset.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) el.style.opacity = '0';
    });

     const bgToReset = ['#bracket-method', '#at-method'];
     bgToReset.forEach(selector => {
        const el = document.querySelector(selector);
        if(el) el.style.background = '';
     });
}

/**
 * NEW ROBUST VERSION: Highlights code by creating an absolutely positioned
 * overlay that sits BEHIND the text, avoiding any conflicts with PrismJS.
 */
function highlightCode(codeBlockId, textToFind, className = 'highlight-overlay') {
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
    overlay.style.backgroundColor = 'rgba(255, 215, 0, 0.4)';
    overlay.style.borderRadius = '3px';
    overlay.style.zIndex = '0'; // Sit behind the code text
    overlay.style.pointerEvents = 'none'; // Make it unclickable

    container.appendChild(overlay);
}


function positionAnnotation(codeBlockId, textToFind, annotationId) {
    // FIX: Changed 'codeId' to 'codeBlockId' to match the argument name.
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

// --- Other Helper Functions (Unchanged) ---

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

function showElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) element.style.opacity = '1';
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