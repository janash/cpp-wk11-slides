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
* **Compilable Code:** All code examples must be valid and runnable - no emojis or non-ASCII characters.

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

### Two-Column Layout (Most Common)
This is the standard layout for content slides with explanation + code examples.

## 8. Single Slide Example

For reference, here's a complete single-slide example:
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

### One-Column Layout
Use for comparison tables, summaries, or content that needs full width.

```html
<section class="slide one-column" id="descriptive-slide-id">
  <div class="slide-header">
    <div class="left-header">
      <div class="berkeley-logo"><img src="../cal_logo_header.png"></div>
      <span>Course Name:</span>
    </div>
    <div class="right-header">
      <span>Slide Title</span>
    </div>
  </div>
  <div class="slide-body one-column">
    <!-- Full-width content -->
  </div>
</section>
```

### Tables for Comparisons
Use clean, styled tables for comparing concepts or features.

```html
<table style="width: 100%; border-collapse: collapse; margin-bottom: 2em; font-size: 1.1em;">
  <thead>
    <tr style="background: #003262; color: white;">
      <th style="padding: 12px; border: 1px solid #ccc; text-align: left;">Feature</th>
      <th style="padding: 12px; border: 1px solid #ccc; text-align: left;">Option A</th>
      <th style="padding: 12px; border: 1px solid #ccc; text-align: left;">Option B</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; border: 1px solid #ccc; font-weight: bold;">Size</td>
      <td style="padding: 10px; border: 1px solid #ccc;">Fixed</td>
      <td style="padding: 10px; border: 1px solid #ccc;">Dynamic</td>
    </tr>
    <tr style="background: #f5f5f5;">
      <td style="padding: 10px; border: 1px solid #ccc; font-weight: bold;">Performance</td>
      <td style="padding: 10px; border: 1px solid #ccc;">Fastest</td>
      <td style="padding: 10px; border: 1px solid #ccc;">Very fast</td>
    </tr>
  </tbody>
</table>
```
This is the standard layout for content slides.

```html
<section class="slide two-column" id="descriptive-slide-id">
  <div class="slide-header">
    <div class="left-header">
      <div class="berkeley-logo"><img src="../cal_logo_header.png"></div>
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

**CRITICAL: All code must be valid and compilable. Never include emojis, special characters, or comments with non-ASCII characters in code blocks.**

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

## 5. Animation System

The system uses a class-based, auto-registering architecture. For each slide that needs animation, you define a JavaScript class.

### The `SlideAnimation` Base Class
All animation classes must extend the `SlideAnimation` base class. It requires you to implement a `slideId` getter and an `animate` method. Registration is handled automatically when you instantiate the class.

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
            () => highlightCode('vector-code', 'std::vector'), // Highlight code
            () => {
                positionAnnotation('vector-code', 'std::vector', 'vector-annotation');
                showElement('vector-annotation');
            }
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
* `highlightCode('codeBlockId', 'textToFind')`: Highlights a string within a code block.
* `positionAnnotation('codeBlockId', 'textToFind', 'annotationId')`: Positions an annotation element next to a string in a code block.
* `showElement('elementId')`: Fades in a hidden element (like an annotation).
* `highlightBackground('elementId', 'color')`: Changes the background color of an element.

## 6. Best Practices & Troubleshooting

### Best Practices
* **One concept per slide.** Don't overload a single slide.
* **Focus on code highlighting.** Use code highlighting and annotations to guide attention to specific concepts.
* **Progressive Reveal:** Introduce concepts one by one. Each step in an animation should reveal only one new piece of information.
* **Working code examples:** All code must be complete, compilable, and runnable by students.
* **Naming Conventions:**
    * Slide IDs: `section-concept-detail` (e.g., `containers-vector-methods`).
    * Animation Classes: `[Concept]Animation` (e.g., `VectorMethodsAnimation`).

### Troubleshooting
If an animation is not working, check the following:
1.  **Was the class instantiated?** Ensure `new YourAnimationClass();` is at the end of your script.
2.  **Is the Slide ID correct?** The string from the `slideId` getter must *exactly* match the `<section>` ID in the HTML.
3.  **Are the element IDs correct?** Check that IDs used in functions like `highlightCode` match the HTML element IDs.
4.  **Check the browser console.** Look for errors like `slideId getter must be defined` or other JavaScript exceptions.

## 7. Minimal Example: Complete Topic Flow

This shows a typical 3-slide progression from introduction to comparison. Use this as your template for topic structure.

```html
<!-- Slide 1: Section Header -->
<section class="slide section-header">
  <div class="slide-header"></div>
  <div class="slide-body section-header">
    <div class="section-content">
      <h1 class="section-title">C++ Variables</h1>
      <p class="section-subtitle">Declaration, initialization, and types</p>
    </div>
  </div>
</section>

<!-- Slide 2: Concept Introduction -->
<section class="slide two-column" id="variables-declaration">
  <div class="slide-header">
    <div class="left-header">
      <div class="berkeley-logo"><img src="../cal_logo_header.png"></div>
      <span>C++ Fundamentals:</span>
    </div>
    <div class="right-header">
      <span>Variable Declaration</span>
    </div>
  </div>
  <div class="slide-body two-column">
    <div class="left-panel">
      <h4>Variable Basics</h4>
      <p>Variables store data with a specific type:</p>
      <ul>
        <li>Must declare type before use</li>
        <li>Can initialize with a value</li>
        <li>Type determines what operations are allowed</li>
      </ul>
    </div>
    <div class="right-panel">
      <div class="code-container">
<pre><code class="language-cpp" id="var-code">
#include &lt;iostream&gt;

int main() {
    <span id="int-decl">int age = 25;</span>
    <span id="double-decl">double temperature = 98.6;</span>
    <span id="string-decl">std::string name = "Alice";</span>
    
    <span id="output">std::cout &lt;&lt; "Age: " &lt;&lt; age;</span>
    return 0;
}
</code></pre>
        <div class="code-annotation" id="anno-int" style="opacity:0;">
          Integer variable with initialization
        </div>
        <div class="code-annotation" id="anno-double" style="opacity:0;">
          Floating-point number
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Slide 3: Comparison Table -->
<section class="slide one-column" id="variables-types-comparison">
  <div class="slide-header">
    <div class="left-header">
      <div class="berkeley-logo"><img src="../cal_logo_header.png"></div>
      <span>C++ Fundamentals:</span>
    </div>
    <div class="right-header">
      <span>Variable Types Comparison</span>
    </div>
  </div>
  <div class="slide-body one-column">
    <div style="max-width: 800px; margin: 0 auto;">
      <table style="width: 100%; border-collapse: collapse; font-size: 1.1em;">
        <thead>
          <tr style="background: #003262; color: white;">
            <th style="padding: 12px; border: 1px solid #ccc; text-align: left;">Type</th>
            <th style="padding: 12px; border: 1px solid #ccc; text-align: left;">Purpose</th>
            <th style="padding: 12px; border: 1px solid #ccc; text-align: left;">Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 10px; border: 1px solid #ccc; font-weight: bold;">int</td>
            <td style="padding: 10px; border: 1px solid #ccc;">Whole numbers</td>
            <td style="padding: 10px; border: 1px solid #ccc;">42, -17, 0</td>
          </tr>
          <tr style="background: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ccc; font-weight: bold;">double</td>
            <td style="padding: 10px; border: 1px solid #ccc;">Decimal numbers</td>
            <td style="padding: 10px; border: 1px solid #ccc;">3.14, -2.5, 98.6</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ccc; font-weight: bold;">string</td>
            <td style="padding: 10px; border: 1px solid #ccc;">Text data</td>
            <td style="padding: 10px; border: 1px solid #ccc;">"Hello", "Alice"</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<script>
class VariableDeclarationAnimation extends SlideAnimation {
    get slideId() {
        return 'variables-declaration';
    }

    animate() {
        const steps = [
            () => {
                highlightCode('var-code', 'int age = 25;');
                positionAnnotation('var-code', 'int age = 25;', 'anno-int');
                showElement('anno-int');
            },
            () => {
                highlightCode('var-code', 'double temperature = 98.6;');
                positionAnnotation('var-code', 'double temperature = 98.6;', 'anno-double');
                showElement('anno-double');
            },
            () => {
                highlightCode('var-code', 'std::cout << "Age: " << age;');
            }
        ];
        return runAnimationSteps(steps);
    }
}

// Register animation
new VariableDeclarationAnimation();
</script>
```

**Flow Pattern:**
1. **Section header** - Introduces the topic
2. **Two-column concept** - Explains with code example and animations  
3. **One-column comparison** - Summarizes with a table

This 3-slide pattern works for most programming concepts and shows all the key elements working together.

```html
<section class="slide two-column" id="containers-vector-intro">
  <div class="slide-header">
    <div class="left-header">
      <div class="berkeley-logo"><img src="../cal_logo_header.png"></div>
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
      <ul>
        <li>Automatically manages its own memory</li>
        <li>Can grow or shrink in size</li>
        <li>Provides fast, random access to elements</li>
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
                highlightCode('vector-example-code', 'std::vector<int> numbers;');
                positionAnnotation('vector-example-code', 'std::vector<int> numbers;', 'anno-decl');
                showElement('anno-decl');
            },
            () => {
                highlightCode('vector-example-code', 'numbers.push_back(10);');
                positionAnnotation('vector-example-code', 'numbers.push_back(10);', 'anno-push');
                showElement('anno-push');
            },
            () => {
                highlightCode('vector-example-code', 'numbers.push_back(20);');
            },
            () => {
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

## 9. Animation Patterns

### Code Highlighting with Annotations
Target specific spans in your code blocks and show explanatory annotations:

```javascript
() => {
    highlightCode('code-block-id', 'text-to-find');
    positionAnnotation('code-block-id', 'text-to-find', 'annotation-id');
    showElement('annotation-id');
}
```

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

## 9. Interactive Demo Setup

For slides with interactive elements (buttons, clickable demos), add setup functions:

```javascript
class MySlideAnimation extends SlideAnimation {
    get slideId() {
        return 'my-slide-id';
    }
    
    animate() {
        const steps = [
            () => highlightCode('demo-code', 'push_back'),
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

### Interactive Demo HTML Structure
```html
<div id="pushback-demo" style="margin-top: 2em;">
  <h4>Interactive Demo:</h4>
  <div id="vector-state">
    <p>Vector: <span id="vector-contents">[]</span></p>
    <p>Size: <span id="vector-size">0</span></p>
  </div>
  <div id="vector-visualization" style="display: flex; gap: 4px; margin: 10px 0; min-height: 40px; align-items: center;">
    <div id="vector-boxes" style="display: flex; gap: 4px;"></div>
  </div>
  <button id="demo-button" style="padding: 5px 10px; background: #2e7d32; color: white; border: none; border-radius: 4px; margin: 5px;">
    push_back(42)
  </button>
  <button id="demo-reset" style="padding: 5px 10px; background: #d32f2f; color: white; border: none; border-radius: 4px; margin: 5px;">
    Reset
  </button>
</div>
```

## 11. Code Block Targeting Requirements

### When to Use Each Layout:
- **Two-column:** Explanation + code examples, concept + implementation
- **One-column:** Comparison tables, summaries, section headers
- **Section header:** First slide of a new major topic

### Table vs. Two-Column:
- **Tables:** When comparing 3+ items or multiple features
- **Two-column:** When showing one concept with code example

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

## 12. Multiple Animation Classes Per File

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

// Register all animations
new FirstSlideAnimation();
new SecondSlideAnimation();
```