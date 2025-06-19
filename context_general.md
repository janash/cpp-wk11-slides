# LLM Guide to the Modular Slide System - Educational Content Creation

## 1. Your Task: Content Creation

Your primary role is to create and modify educational slide presentations for any subject. All slides and animations are defined in **modular topic files**.

**Your output must be a single, complete HTML file containing:**
* **HTML Structure:** All `<section>` slides with descriptive IDs.
* **Content:** Text, equations, diagrams, code blocks, interactive elements, and specialized content blocks.
* **JavaScript Animations:** Class-based animations within a final `<script>` tag to control the progressive disclosure of information.
* **Library Integration:** Include appropriate JavaScript libraries as needed for your topic.

**Key Success Criteria:**
* **Educational Effectiveness:** The slide logically explains a concept.
* **Technical Correctness:** The HTML is well-formed and the JavaScript is correct.
* **Consistency:** The output matches the patterns and templates in this guide.
* **Progressivity:** Information builds from simple to complex.
* **Interactive Elements:** Use appropriate libraries and visualizations for the subject matter.
* **Valid Content:** All code examples (when used) must be valid and runnable.

## 2. System Philosophy

This is a custom web-based system designed for teaching any subject. It uses progressive disclosure and interactivity to manage cognitive load and engage students. Unlike PowerPoint, it offers precise control over content highlighting, real-time visualizations, interactive diagrams, and a robust animation system. You will be creating **modular topic files** that operate within this larger system.

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
A new topic file must contain one or more `<section>` elements (slides) and a `<script>` tag at the end for the animation logic and any required libraries.

## 4. Slide Layouts & Content Types

### Two-Column Layout (Most Common)
This is the standard layout for content slides with explanation + visual elements.

```html
<section class="slide two-column" id="descriptive-slide-id">
  <div class="slide-header">
    <div class="left-header">
      <div class="berkeley-logo"><img src="./images/cal_logo_header.png"></div>
      <span>Course Name:</span>
    </div>
    <div class="right-header">
      <span>Slide Title</span>
    </div>
  </div>
  <div class="slide-body two-column">
    <div class="left-panel">
      <!-- Explanatory content, equations, text -->
    </div>
    <div class="right-panel">
      <!-- Visualizations, diagrams, code blocks, interactive elements -->
    </div>
  </div>
</section>
```

### One-Column Layout
Use for comparison tables, summaries, full-width visualizations, or content that needs complete horizontal space.

```html
<section class="slide one-column" id="descriptive-slide-id">
  <div class="slide-header">
    <div class="left-header">
      <div class="berkeley-logo"><img src="./images/cal_logo_header.png"></div>
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

### Tables for Comparisons
Use clean, styled tables for comparing concepts or features. All styling is handled by CSS.

```html
<table class="comparison-table">
  <thead>
    <tr>
      <th>Feature</th>
      <th>Option A</th>
      <th>Option B</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Size</td>
      <td>Fixed</td>
      <td>Dynamic</td>
    </tr>
    <tr>
      <td>Performance</td>
      <td>Fastest</td>
      <td>Very fast</td>
    </tr>
  </tbody>
</table>
```

## 5. Content Containers and Specialized Elements

### Mathematical Equations
Use MathJax or KaTeX for mathematical content. Equations can be targeted for highlighting.

```html
<div class="equation-container">
  <div class="equation-block" id="main-equation">
    $$<span id="eq-left">F</span> = <span id="eq-right">ma</span>$$
  </div>
  <div class="equation-annotation" id="anno-force" style="opacity:0;">
    F represents force in Newton's second law
  </div>
</div>
```

### Code Blocks (for Programming Topics)
When your topic involves programming, computational methods, or data analysis, use a `code-container` to wrap a `<pre><code class="language-X">` block. To make text highlightable by animations, wrap it in a `<span>` with a unique `id`.

**CRITICAL: All code must be valid and compilable. Never include emojis, special characters, or comments with non-ASCII characters in code blocks.**

```html
<div class="code-container">
  <pre><code class="language-python" id="calculation-code">
import numpy as np

<span id="data-setup">data = np.array([1, 2, 3, 4, 5])</span>
<span id="mean-calc">mean_value = np.mean(data)</span>
<span id="result-output">print(f"Mean: {mean_value}")</span>
  </code></pre>
  
  <div class="code-annotation" id="anno-setup" style="opacity:0;">
    Setting up the data array
  </div>
</div>
```

### Interactive Visualizations
Use appropriate libraries for your content:

```html
<div class="visualization-container">
  <div id="interactive-plot" style="width: 100%; height: 400px;">
    <!-- Plotly, D3.js, or other visualizations will be inserted here -->
  </div>
  <div class="viz-controls">
    <button id="animate-btn">Animate</button>
    <button id="reset-btn">Reset</button>
  </div>
</div>
```

### Network Diagrams
For showing relationships, processes, or network structures:

```html
<div class="network-container">
  <div id="network-diagram" style="width: 100%; height: 400px;">
    <!-- Cytoscape.js or similar network visualization -->
  </div>
  <div class="network-annotation" id="anno-node" style="opacity:0;">
    Each node represents a key component
  </div>
</div>
```

### Diagrams and Schematics
For static or animated diagrams:

```html
<div class="diagram-container">
  <svg id="concept-diagram" width="500" height="400">
    <!-- SVG content or D3.js generated content -->
  </svg>
  <div class="diagram-annotation" id="anno-process" style="opacity:0;">
    This shows the key process step
  </div>
</div>
```

### Data Displays
For experimental data, measurements, or statistical information:

```html
<div class="data-container">
  <div id="chart-display" style="width: 100%; height: 300px;">
    <!-- Chart.js, Plotly, or other chart library content -->
  </div>
</div>
```

## 6. Animation System

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
class ConceptIntroAnimation extends SlideAnimation {
    get slideId() {
        return 'concept-introduction';
    }

    animate() {
        const steps = [
            () => highlightEquation('main-equation', 'F'), // Highlight equation part
            () => {
                positionAnnotation('main-equation', 'F', 'force-annotation');
                showElement('force-annotation');
            },
            () => updateVisualization('interactive-plot'), // Custom function for updating visualization
        ];
        return runAnimationSteps(steps);
    }
}

// Instantiation (this makes the animation live)
new ConceptIntroAnimation();
```

### Available Animation Functions
Use these helper functions inside your `animate` method's `steps` array:

* `runAnimationSteps(steps)`: The function that executes the animation sequence. Your `animate` method must return its result.
* `highlightCode('codeBlockId', 'textToFind')`: Highlights a string within a code block (for programming topics).
* `highlightEquation('equationId', 'textToFind')`: Highlights part of a mathematical equation.
* `highlightText('elementId', 'textToFind')`: Highlights text within any element.
* `positionAnnotation('elementId', 'textToFind', 'annotationId')`: Positions an annotation element next to text, equations, or code.
* `showElement('elementId')`: Fades in a hidden element (like an annotation).
* `highlightBackground('elementId', 'color')`: Changes the background color of an element.
* `animateVisualization('vizId', 'animationType')`: Triggers animations in visualizations or interactive diagrams.

## 7. JavaScript Libraries for Educational Content

### Choose Appropriate Libraries Based on Your Topic:

**Interactive Data Visualization:**
```html
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
```

**Network Diagrams and Relationship Maps:**
```html
<script src="https://unpkg.com/cytoscape@3.23.0/dist/cytoscape.min.js"></script>
```

**3D Visualizations (Molecular Models, Geometric Shapes):**
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/controls/OrbitControls.js"></script>
```

**Mathematical Equations:**
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.js"></script>
```

**General Data Visualization and Charts:**
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
```

**Interactive Simulations:**
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"></script>
```

**Computational and Statistical Analysis:**
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/ml-matrix/6.10.4/ml-matrix.min.js"></script>
```

## 8. Generic Example: Educational Topic Flow

This shows a typical 3-slide progression from introduction to comparison. Use this as your template for topic structure.

```html
<!-- Slide 1: Section Header -->
<section class="slide section-header">
  <div class="slide-header"></div>
  <div class="slide-body section-header">
    <div class="section-content">
      <h1 class="section-title">Topic Name</h1>
      <p class="section-subtitle">Brief description of the concept</p>
    </div>
  </div>
</section>

<!-- Slide 2: Concept Introduction -->
<section class="slide two-column" id="concept-introduction">
  <div class="slide-header">
    <div class="left-header">
      <div class="berkeley-logo"><img src="./images/cal_logo_header.png"></div>
      <span>Course Name:</span>
    </div>
    <div class="right-header">
      <span>Concept Introduction</span>
    </div>
  </div>
  <div class="slide-body two-column">
    <div class="left-panel">
      <h4>Key Concept</h4>
      <p>Explanation of the fundamental idea:</p>
      <ul>
        <li><span id="concept-point-1">First important aspect</span></li>
        <li><span id="concept-point-2">Second important aspect</span></li>
        <li><span id="concept-point-3">Third important aspect</span></li>
      </ul>
      
      <div class="equation-container" style="margin-top: 2em;">
        <h5>Key Relationship:</h5>
        <div class="equation-block" id="main-relationship">
          <!-- Mathematical formula, diagram, or code example -->
        </div>
        <div class="equation-annotation" id="anno-relationship" style="opacity:0;">
          This represents the core relationship
        </div>
      </div>
    </div>
    <div class="right-panel">
      <div class="visualization-container">
        <div id="concept-visualization" style="width: 100%; height: 350px; border: 1px solid #ccc;">
          <!-- Interactive visualization, diagram, or chart -->
        </div>
        <div class="viz-controls" style="margin-top: 10px; text-align: center;">
          <button id="show-detail">Show Details</button>
          <button id="animate-concept">Animate</button>
          <button id="reset-view">Reset</button>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Slide 3: Comparison or Summary -->
<section class="slide one-column" id="concept-comparison">
  <div class="slide-header">
    <div class="left-header">
      <div class="berkeley-logo"><img src="./images/cal_logo_header.png"></div>
      <span>Course Name:</span>
    </div>
    <div class="right-header">
      <span>Concept Comparison</span>
    </div>
  </div>
  <div class="slide-body one-column">
    <div class="table-container">
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Aspect</th>
            <th>Approach A</th>
            <th>Approach B</th>
          </tr>
        </thead>
        <tbody>
          <tr id="comparison-row-1">
            <td>Characteristic 1</td>
            <td>Value A1</td>
            <td>Value B1</td>
          </tr>
          <tr id="comparison-row-2">
            <td>Characteristic 2</td>
            <td>Value A2</td>
            <td>Value B2</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<script>
// Include appropriate libraries here based on your content

// Custom visualization or interaction functions
function createVisualization() {
    // Implementation depends on your chosen library
    // Could be Plotly, Cytoscape, D3, Three.js, etc.
}

class ConceptIntroductionAnimation extends SlideAnimation {
    get slideId() {
        return 'concept-introduction';
    }

    animate() {
        const steps = [
            () => {
                highlightBackground('concept-point-1', '#e3f2fd');
            },
            () => {
                highlightBackground('concept-point-2', '#f3e5f5');
            },
            () => {
                showElement('anno-relationship');
            }
        ];
        return runAnimationSteps(steps);
    }
}

class ConceptComparisonAnimation extends SlideAnimation {
    get slideId() {
        return 'concept-comparison';
    }

    animate() {
        const steps = [
            () => highlightBackground('comparison-row-1', '#e8f5e8'),
            () => highlightBackground('comparison-row-2', '#fff3e0')
        ];
        return runAnimationSteps(steps);
    }
}

// Setup interactive elements
function setupDemo() {
    const showDetailBtn = document.getElementById('show-detail');
    const animateBtn = document.getElementById('animate-concept');
    const resetBtn = document.getElementById('reset-view');
    
    if (showDetailBtn) {
        showDetailBtn.onclick = () => {
            // Custom interaction logic
        };
    }
}

// Register animations
new ConceptIntroductionAnimation();
new ConceptComparisonAnimation();

// Initialize after DOM loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        createVisualization();
        setupDemo();
    }, 500);
});
</script>
```

**Flow Pattern:**
1. **Section header** - Introduces the topic
2. **Two-column concept** - Explains with visualization/code and animations  
3. **One-column comparison** - Summarizes with a table or full-width content

This 3-slide pattern works for most educational concepts and shows all the key elements working together.

## 9. Animation Patterns

### Content Highlighting with Annotations
Target specific elements and show explanatory annotations:

```javascript
() => {
    highlightText('content-element-id', 'text-to-find');
    positionAnnotation('content-element-id', 'text-to-find', 'annotation-id');
    showElement('annotation-id');
}
```

### Code Highlighting with Annotations (Programming Topics)
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

### Visualization + Explanation Pattern
```javascript
animate() {
    const steps = [
        () => {
            highlightText('concept-text', 'key concept');
            showElement('concept-explanation');
        },
        () => {
            animateVisualization('main-chart', 'highlight-data');
            showElement('data-explanation');
        }
    ];
    return runAnimationSteps(steps);
}
```

## 10. Interactive Demo Setup

For slides with interactive elements (buttons, clickable demos), add setup functions:

```javascript
class MySlideAnimation extends SlideAnimation {
    get slideId() {
        return 'my-slide-id';
    }
    
    animate() {
        const steps = [
            () => highlightText('demo-text', 'important concept'),
            // ... other steps
        ];
        return runAnimationSteps(steps);
    }
}

// Interactive demo variables (if needed)
let demoState = {};
let currentValue = 0;

function setupInteractiveDemo() {
    const button = document.getElementById('demo-button');
    const resetButton = document.getElementById('reset-button');
    
    if (button && resetButton) {
        button.onclick = function() {
            // Demo interaction logic
            currentValue += 1;
            updateDemoDisplay();
        };
        
        resetButton.onclick = function() {
            currentValue = 0;
            updateDemoDisplay();
        };
    }
}

function updateDemoDisplay() {
    const display = document.getElementById('demo-display');
    if (display) {
        display.textContent = `Current value: ${currentValue}`;
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
<div id="interactive-demo" style="margin-top: 2em;">
  <h4>Interactive Demo:</h4>
  <div id="demo-state">
    <p>Status: <span id="demo-display">Ready</span></p>
  </div>
  <div id="demo-visualization" style="min-height: 200px; border: 1px solid #ccc; padding: 20px; margin: 10px 0;">
    <!-- Interactive content area -->
  </div>
  <button id="demo-button" style="padding: 5px 10px; background: #2e7d32; color: white; border: none; border-radius: 4px; margin: 5px;">
    Action
  </button>
  <button id="reset-button" style="padding: 5px 10px; background: #d32f2f; color: white; border: none; border-radius: 4px; margin: 5px;">
    Reset
  </button>
</div>
```

## 11. Content Targeting Requirements

### When to Use Each Layout:
- **Two-column:** Explanation + visualizations/code/diagrams, concept + implementation
- **One-column:** Comparison tables, summaries, full-width visualizations, section headers
- **Section header:** First slide of a new major topic

### Table vs. Two-Column:
- **Tables:** When comparing 3+ items or multiple features
- **Two-column:** When showing one concept with supporting visual/code example

For animations to work with any content, wrap targetable text in `<span>` elements with unique IDs:

```html
<div class="content-container">
  <p>This explains <span id="key-concept">the fundamental principle</span> and shows 
  <span id="application">how it applies</span> in practice.</p>
</div>
```

Then target these spans in animations:
```javascript
() => highlightText('content-container', 'fundamental principle')
() => highlightText('content-container', 'how it applies')
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

## 13. Additional Content Styling Classes

The system includes predefined CSS classes for common slide content patterns. Use these instead of inline styles to maintain consistent font sizing and follow the framework's design principles.

### File Display Patterns (for Programming Topics)
For showing multiple files or code examples:

```html
<!-- File with header -->
<h5 class="file-header">filename.py</h5>
<div class="file-content">
  <div class="code-container">
    <pre><code class="language-python">
      # code here
    </code></pre>
  </div>
</div>

<!-- Different file types -->
<h5 class="file-header blue">config.yaml</h5>      <!-- Blue for configuration -->
<h5 class="file-header orange">main.py</h5>        <!-- Orange for source -->
<h5 class="file-header green">example.py</h5>      <!-- Green for examples -->
```

### Information Boxes
For explanations, warnings, and highlights:

```html
<!-- Info boxes -->
<div class="info-box">
  <h4 class="box-header blue">Key Concept</h4>
  <p>Explanation text here</p>
</div>

<div class="info-box green">
  <h4 class="box-header green">Benefits</h4>
  <ul><li>Advantage 1</li></ul>
</div>

<div class="info-box orange">
  <h4 class="box-header orange">Warning</h4>
  <p>Important note</p>
</div>

<div class="info-box red">
  <h4 class="box-header red">Problem</h4>
  <p>Issue description</p>
</div>
```

### Problem/Solution Containers
For showing issues and their solutions:

```html
<!-- Problem demonstration -->
<div class="problem-box">
  <h5 class="box-header red">Challenge</h5>
  <p>Description of the problem or challenge</p>
</div>

<!-- Solution demonstration -->
<div class="solution-box">
  <h5 class="box-header green">Solution</h5>
  <p>Explanation of how to address it</p>
</div>

<!-- Examples -->
<div class="example-box">
  <h5 class="box-header blue">Example</h5>
  <p>Concrete example or application</p>
</div>
```

## 14. Best Practices & Troubleshooting

### Best Practices
* **One concept per slide.** Don't overload a single slide.
* **Progressive Reveal:** Introduce concepts one by one. Each step in an animation should reveal only one new piece of information.
* **Choose appropriate libraries:** Use Plotly for interactive data visualization, Cytoscape for network diagrams, Three.js for 3D models, etc.
* **Working examples:** All code (when used) must be complete, valid, and runnable by students.
* **Naming Conventions:**
    * Slide IDs: `topic-concept-detail` (e.g., `thermodynamics-first-law`, `ecosystem-food-webs`).
    * Animation Classes: `[Concept]Animation` (e.g., `ThermodynamicsAnimation`, `FoodWebAnimation`).

### Troubleshooting
If an animation is not working, check the following:
1.  **Was the class instantiated?** Ensure `new YourAnimationClass();` is at the end of your script.
2.  **Is the Slide ID correct?** The string from the `slideId` getter must *exactly* match the `<section>` ID in the HTML.
3.  **Are the element IDs correct?** Check that IDs used in functions like `highlightText` match the HTML element IDs.
4.  **Check the browser console.** Look for errors like `slideId getter must be defined` or other JavaScript exceptions.

### Slide ID Naming Convention
Slide IDs are critical for linking animations to slides. They **must** be unique and follow the `topic-concept-detail` pattern.
* **Correct:** `physics-newton-laws`, `biology-cell-division`, `chemistry-periodic-trends`
* **Incorrect:** `slide1`, `intro`, `example-slide`

### Critical Rules
- **Never use inline styles** for colors, backgrounds, or containers when predefined classes exist
- **Always use predefined classes** for consistency
- **Content automatically maintains proper sizing** within any container
- **Color scheme**: Blue (headers/info), Orange (source/warnings), Green (examples/solutions), Red (problems/errors)
- **Library selection**: Choose the most interactive and appropriate libraries for your content type

This system gives you complete flexibility to create engaging, interactive educational content for any subject while maintaining consistency and educational effectiveness.