
# LLM Guide to the Modular Slide System

## 1. Your Task: Content Creation

Your primary role is to create and modify educational slide presentations for programming courses. All slides and animations are defined in **modular topic files**.

**Your output must be a single, complete HTML file containing:**
* **HTML Structure:** All `<section>` slides with descriptive IDs.
* **Content:** Text, lists, and code blocks.
* **JavaScript Animations:** Class-based animations within a final `<script>` tag to control the progressive disclosure of information.

**Key Success Criteria:**
* **Educational Effectiveness:** The slide logically explains a concept.
* **Technical Correctness:** The HTML is well-formed and the JavaScript is correct.
* **Consistency:** The output matches the patterns and templates in this guide.
* **Progressivity:** Information builds from simple to complex.

## 2. System Philosophy

This is a custom web-based system designed for teaching programming. It uses progressive disclosure and interactivity to manage cognitive load and engage students. Unlike PowerPoint, it offers precise control over code, real syntax highlighting, and a robust animation system. You will be creating **modular topic files** that operate within this larger system.

## 3. File and Topic Structure

The project has a defined structure with shared core files and a directory for topic modules.

```
project/
├── index.html          # Main template that loads topics
├── style.css           # All shared styling
├── core.js             # Core navigation and SlideAnimation base class
└── sections/
    ├── topic-a.html    # A modular topic file
    └── topic-b.html    # Another modular topic file
```

Each topic is a single `.html` file containing all its slides and animation logic.

**Note: Each topic file is a module and requires the shared `core.js` and `style.css` files from the project root to render and function correctly.**

### Topic File Template
A new topic file must contain one or more `<section>` elements (slides) and a `<script>` tag at the end for the animation logic.

```html
<section class="slide two-column" id="section-concept-detail">
  </section>

<section class="slide two-column" id="section-concept-example">
  </section>

<script>
  // Animation classes (JavaScript)
</script>
```

### Slide ID Naming Convention
Slide IDs are critical for linking animations to slides. They **must** be unique and follow the `section-concept-detail` pattern.
* **Correct:** `containers-vector-initialization`, `memory-stack-vs-heap`
* **Incorrect:** `slide1`, `intro`, `example-slide`

## 4. Slide Layouts & Content

### Two-Column Layout (Most Common)
This is the standard layout for content slides.

```html
<section class="slide two-column" id="descriptive-slide-id">
  <div class="slide-header">
    <div class="left-header">
      <div class="berkeley-logo">Cal</div>
      <span>Course Name:</span>
    </div>
    <div class="right-header">
      <span>Slide Title</span>
    </div>
  </div>
  <div class="slide-body two-column">
    <div class="left-panel">
      </div>
    <div class="right-panel">
      </div>
  </div>
</section>
```

### Section Header Layout
Use this as the first slide of a new topic section.

```html
<section class="slide section-header">
  <div class="slide-header"></div>
  <div class="slide-body section-header">
    <div class="section-content">
      <h1 class="section-title">Main Topic Title</h1>
      <p class="section-subtitle">Optional brief description</p>
    </div>
  </div>
</section>
```

### Code Blocks
Use a `code-container` to wrap a `<pre><code class="language-cpp">` block. To make text highlightable by animations, wrap it in a `<span>` with a unique `id`.

```html
<div class="code-container">
  <pre><code class="language-cpp" id="main-code-block">
#include &lt;vector>

int main() {
    <span id="code-vector-declaration">std::vector&lt;int> numbers;</span>
    return 0;
}
  </code></pre>
  
  <div class="code-annotation" id="anno-vector-decl" style="opacity:0;">
    This is a dynamic vector.
  </div>
</div>
```

### Highlightable List Items
To make items in a list highlightable, wrap the text in a `<span>` with the class `.highlight-item`.

```html
<ul id="my-feature-list">
  <li><span class="highlight-item">This is the first feature.</span></li>
  <li><span class="highlight-item">This is the second feature.</span></li>
</ul>

<ul>
  <li>This item cannot be animated.</li>
</ul>
```

## 5. Animation System

The system uses a class-based, auto-registering architecture. For each slide that needs animation, you define a JavaScript class.

### The `SlideAnimation` Base Class
All animation classes must extend the `SlideAnimation` base class. It requires you to implement a `slideId` getter and an `animate` method. Registration is handled automatically when you instantiate the class.

```javascript
// Base class defined in core.js for reference
class SlideAnimation {
    constructor() { /* ... auto-registration logic ... */ }
    get slideId() { throw new Error('slideId getter must be implemented'); }
    register() { /* ... auto-registration logic ... */ }
    animate() { throw new Error('animate() method must be implemented'); }
}
```

### Animation Class Pattern
This is the required pattern for all animations.

1.  **Define a class** that extends `SlideAnimation`.
2.  **Implement `slideId`** to return the target slide's ID.
3.  **Implement `animate`** to define the sequence of animation steps.
4.  **Instantiate the class** at the end of the script with `new`.

```javascript
// Class definition
class VectorIntroAnimation extends SlideAnimation {
    get slideId() {
        return 'containers-vector-intro';
    }

    animate() {
        const steps = [
            () => highlightListItem('features-list', 0), // Highlight first list item
            () => highlightCode('vector-code', 'std::vector'), // Highlight code
            () => showElement('vector-annotation') // Show an annotation
        ];
        return runAnimationSteps(steps);
    }
}

// Instantiation (this makes the animation live)
new VectorIntroAnimation();
```

### Available Animation Functions
Use these helper functions inside your `animate` method's `steps` array.

* `runAnimationSteps(steps)`: The function that executes the animation sequence. Your `animate` method must return its result.
* `highlightListItem('listId', index)`: Highlights a specific item in a list (0-indexed).
* `highlightCode('codeBlockId', 'textToFind')`: Highlights a string within a code block.
* `positionAnnotation('codeBlockId', 'textToFind', 'annotationId')`: Positions an annotation element next to a string in a code block.
* `showElement('elementId')`: Fades in a hidden element (like an annotation).
* `highlightBackground('elementId', 'color')`: Changes the background color of an element.

## 6. Best Practices & Troubleshooting

### Best Practices
* **One concept per slide.** Don't overload a single slide.
* **Link text to code.** When discussing a concept in the left panel, highlight the corresponding code in the right panel.
* **Progressive Reveal:** Introduce concepts one by one. Each step in an animation should reveal only one new piece of information.
* **Naming Conventions:**
    * Slide IDs: `section-concept-detail` (e.g., `containers-vector-methods`).
    * Animation Classes: `[Concept]Animation` (e.g., `VectorMethodsAnimation`).

### Troubleshooting
If an animation is not working, check the following:
1.  **Was the class instantiated?** Ensure `new YourAnimationClass();` is at the end of your script.
2.  **Is the Slide ID correct?** The string from the `slideId` getter must *exactly* match the `<section>` ID in the HTML.
3.  **Are the element IDs correct?** Check that IDs used in functions like `highlightListItem` and `highlightCode` match the HTML element IDs.
4.  **Check the browser console.** Look for errors like `slideId getter must be defined` or other JavaScript exceptions.

## 7. Complete Example Topic File

This is a complete, working example of a single-slide topic file. Use this as your template.

```html
<section class="slide two-column" id="containers-vector-intro">
  <div class="slide-header">
    <div class="left-header">
      <div class="berkeley-logo">Cal</div>
      <span>C++ Fundamentals:</span>
    </div>
    <div class="right-header">
      <span>Introduction to std::vector</span>
    </div>
  </div>
  <div class="slide-body two-column">
    <div class="left-panel">
      <h4>std::vector</h4>
      <p>A dynamic array with key features:</p>
      <ul id="vector-features">
        <li><span class="highlight-item">Automatically manages its own memory.</span></li>
        <li><span class="highlight-item">Can grow or shrink in size.</span></li>
        <li><span class="highlight-item">Provides fast, random access to elements.</span></li>
      </ul>
    </div>
    <div class="right-panel">
      <div class="code-container">
        <pre><code class="language-cpp" id="vector-example-code">
#include &lt;vector>
#include &lt;iostream>

int main() {
    <span id="v-decl">std::vector&lt;int> numbers;</span>
    <span id="v-push">numbers.push_back(10);</span>
    <span id="v-push-2">numbers.push_back(20);</span>

    <span id="v-access">std::cout &lt;&lt; numbers[0];</span>
    return 0;
}
        </code></pre>
        <div class="code-annotation" id="anno-decl" style="opacity:0;">
          Declaration of a vector of integers.
        </div>
        <div class="code-annotation" id="anno-push" style="opacity:0;">
          Adds an element to the end.
        </div>
      </div>
    </div>
  </div>
</section>

<script>
class VectorIntroAnimation extends SlideAnimation {
    get slideId() {
        return 'containers-vector-intro';
    }

    animate() {
        const steps = [
            () => {
                highlightListItem('vector-features', 0);
                highlightCode('vector-example-code', 'std::vector<int> numbers;');
                positionAnnotation('vector-example-code', 'std::vector<int> numbers;', 'anno-decl');
                showElement('anno-decl');
            },
            () => {
                highlightListItem('vector-features', 1);
                highlightCode('vector-example-code', 'numbers.push_back(10);');
                positionAnnotation('vector-example-code', 'numbers.push_back(10);', 'anno-push');
                showElement('anno-push');
            },
            () => {
                highlightCode('vector-example-code', 'numbers.push_back(20);');
            },
            () => {
                highlightListItem('vector-features', 2);
                highlightCode('vector-example-code', 'std::cout << numbers[0];');
            }
        ];
        return runAnimationSteps(steps);
    }
}

// IMPORTANT: Instantiate the class to register the animation
new VectorIntroAnimation();
</script>
```

## 8. Additional Animation Functions & Patterns

### Code Highlighting with Annotations
To highlight code and show annotations, target specific spans in your code blocks:

```javascript
() => {
    highlightCode('code-block-id', 'text-to-find');
    positionAnnotation('code-block-id', 'text-to-find', 'annotation-id');
    showElement('annotation-id');
}
```

The `positionAnnotation` function automatically positions an annotation next to the highlighted text.

### Background Highlighting
Change element background colors for emphasis:

```javascript
() => highlightBackground('element-id', '#ffebee') // Light red background
() => highlightBackground('safe-method', '#e8f5e8') // Light green background
```

### Hidden Elements Pattern
Elements that will be shown during animation should start hidden:

```html
<div id="info-box" style="opacity: 0; transition: opacity 0.5s;">
  <h4>Additional Info:</h4>
  <p>This appears during animation</p>
</div>
```

## 9. Interactive Demo Setup

For slides with interactive elements (buttons, clickable demos), add setup functions:

```javascript
class MySlideAnimation extends SlideAnimation {
    get slideId() {
        return 'my-slide-id';
    }
    
    animate() {
        const steps = [
            () => highlightListItem('features', 0),
            // ... other steps
        ];
        return runAnimationSteps(steps);
    }
}

// Interactive demo variables (if needed)
let demoState = [];
let currentValue = 42;

function setupInteractiveDemo() {
    const button = document.getElementById('demo-button');
    const resetButton = document.getElementById('reset-button');
    
    if (button && resetButton) {
        button.onclick = function() {
            // Demo interaction logic
            demoState.push(currentValue);
            currentValue += 10;
            updateDemoDisplay();
        };
        
        resetButton.onclick = function() {
            demoState = [];
            currentValue = 42;
            updateDemoDisplay();
        };
    }
}

function updateDemoDisplay() {
    const display = document.getElementById('demo-display');
    if (display) {
        display.textContent = '[' + demoState.join(', ') + ']';
    }
}

// Register animation
new MySlideAnimation();

// Setup demo after DOM loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(setupInteractiveDemo, 500);
});
```

## 10. Code Block Targeting Requirements

For animations to work with code blocks, wrap targetable text in `<span>` elements with unique IDs:

```html
<div class="code-container">
  <pre><code class="language-cpp" id="example-code">
#include &lt;iostream>

int main() {
    <span id="var-declaration">int x = 10;</span>
    <span id="output-statement">std::cout &lt;&lt; x;</span>
    return 0;
}
  </code></pre>
</div>
```

Then target these spans in animations:
```javascript
() => highlightCode('example-code', 'int x = 10;')
() => highlightCode('example-code', 'std::cout << x;')
```

## 11. Multiple Animation Classes Per File

A single topic file can have multiple animated slides. Create one class per slide:

```javascript
class FirstSlideAnimation extends SlideAnimation {
    get slideId() { return 'topic-first-slide'; }
    animate() { /* ... */ }
}

class SecondSlideAnimation extends SlideAnimation {
    get slideId() { return 'topic-second-slide'; }
    animate() { /* ... */ }
}

class ThirdSlideAnimation extends SlideAnimation {
    get slideId() { return 'topic-third-slide'; }
    animate() { /* ... */ }
}

// Register all animations
new FirstSlideAnimation();
new SecondSlideAnimation();
new ThirdSlideAnimation();
```

## 12. Common Animation Patterns

### Progressive List Highlighting
```javascript
animate() {
    const steps = [
        () => highlightListItem('my-list', 0),
        () => highlightListItem('my-list', 1),
        () => highlightListItem('my-list', 2)
    ];
    return runAnimationSteps(steps);
}
```

### Code + Explanation Pattern
```javascript
animate() {
    const steps = [
        () => {
            highlightCode('code-block', 'function_name()');
            showElement('function-explanation');
        },
        () => {
            highlightCode('code-block', 'variable = value');
            showElement('variable-explanation');
        }
    ];
    return runAnimationSteps(steps);
}
```

### Combined Code and List Pattern
```javascript
animate() {
    const steps = [
        () => {
            highlightListItem('features', 0);
            highlightCode('example-code', 'std::vector<int>');
            positionAnnotation('example-code', 'std::vector<int>', 'vector-annotation');
        },
        () => {
            highlightListItem('features', 1);
            highlightCode('example-code', 'push_back(value)');
        }
    ];
    return runAnimationSteps(steps);
}
```