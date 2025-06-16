# Complete Guide to the Modular Educational Slide System

## Introduction: Your Role as Content Creator

### What You're Being Asked to Do
You are helping create educational slide presentations for programming courses. Your job is to:
- **Create new slide topics** that follow established patterns
- **Improve existing slide content** for clarity and engagement
- **Design interactive animations** that enhance learning
- **Build on the existing educational framework** while maintaining consistency

### What This Document Provides
This guide contains everything you need to understand and work with a custom web-based slide system specifically designed for programming education. Unlike traditional presentation tools, this system enables:
- Precise code highlighting and annotations
- Interactive demonstrations and simulations  
- Progressive disclosure of complex concepts
- Integration with visualization libraries

### How to Use This Guide
1. **Read the philosophy section** to understand the educational goals
2. **Study the technical structure** to understand how slides are built
3. **Review the animation system** to understand interactive elements
4. **Use the examples and templates** as starting points for new content
5. **Follow the best practices** to create effective educational experiences

### Your Output Should Be
When asked to create or modify slides, provide:
- **Complete HTML slide files** with proper structure and descriptive IDs
- **JavaScript animation functions** that enhance the educational flow
- **Suggestions for interactive elements** where they would aid learning
- **Recommendations for external libraries** (Plotly, Cytoscape, etc.) when appropriate

### Key Success Criteria
- **Educational effectiveness** - Does this help students understand the concept?
- **Technical correctness** - Does the code work within the system constraints?
- **Consistency** - Does this match the established patterns and style?
- **Progressivity** - Does information build logically from simple to complex?

---

## System Philosophy and Goals

### Why This System Exists
This is a **custom web-based presentation system specifically designed for programming education**. It was built to solve the limitations of traditional presentation tools like PowerPoint when teaching code-heavy subjects.

### Core Educational Principles
1. **Progressive Disclosure** - Reveal information step-by-step to manage cognitive load
2. **Interactive Learning** - Students actively engage with concepts rather than passively reading
3. **Multi-Modal Teaching** - Visual (highlighting), auditory (narration), and kinesthetic (interaction) 
4. **Authentic Context** - Use real syntax highlighting and actual code environments
5. **Immediate Feedback** - Interactive elements provide instant understanding

### Key Advantages Over PowerPoint
- **Precise Code Control** - Highlight exact code snippets with pixel-perfect positioning
- **Real Syntax Highlighting** - Uses Prism.js for authentic IDE-like appearance
- **Dynamic Interactivity** - Build working demos and simulations within slides
- **Version Control Friendly** - Text-based format works with git, enables collaboration
- **AI-Friendly** - Structured format perfect for LLM collaboration and content generation
- **Extensible** - Can integrate any web technology (visualizations, libraries, etc.)
- **Robust Animation System** - ID-based animations that don't break when slides are reordered

### Educational Goals
- **Build Understanding, Not Memorization** - Show *why* concepts matter, not just syntax
- **Bridge Theory and Practice** - Connect abstract concepts to concrete implementations
- **Encourage Exploration** - Interactive elements let students discover concepts
- **Support Different Learning Styles** - Visual, textual, and hands-on approaches
- **Reduce Cognitive Overload** - Information revealed when students are ready

## System Overview
This is a web-based presentation system designed for programming education that combines HTML slides with interactive JavaScript animations. Each topic is self-contained in a single file that includes both slide content and animation logic.

## File Structure and Architecture
```
project/
├── index.html              # Main template with navigation
├── style.css               # All styling
├── core.js                 # Navigation and section loading
├── animations.js           # Animation system and annotation toggles
└── sections/
    ├── title.html          # Title slide
    ├── containers.html     # Self-contained topic with animations
    ├── functions.html      # Another topic (example)
    └── memory.html         # Another topic (example)
```

## Creating a New Topic File

### Basic Structure
Each topic file should follow this pattern with **descriptive slide IDs**:
```html
<!-- Section header slide (optional) -->
<section class="slide section-header">
  <div class="slide-header">
    <div class="left-header">
      <div class="berkeley-logo">Cal</div>
      <span>Course Name:</span>
    </div>
    <div class="right-header">
      <span>Topic Area</span>
    </div>
  </div>
  <div class="slide-body section-header">
    <div class="section-content">
      <h1 class="section-title">Topic Title</h1>
      <p class="section-subtitle">Brief description</p>
    </div>
  </div>
</section>

<!-- Content slides with descriptive IDs -->
<section class="slide two-column" id="topic-concept-introduction">
  <!-- Slide content here -->
</section>

<section class="slide two-column" id="topic-advanced-examples">
  <!-- More slide content here -->
</section>

<!-- More slides... -->

<script>
// ID-based animation registration
const topicSlideAnimations = {
    'topic-concept-introduction': animateConceptIntro,
    'topic-advanced-examples': animateAdvancedExamples
};

// Merge into global system
if (typeof window.slideAnimations === 'undefined') {
    window.slideAnimations = {};
}
Object.assign(window.slideAnimations, topicSlideAnimations);

// Animation functions here
</script>
```

### Slide ID Naming Convention
Use descriptive, hierarchical IDs that follow this pattern:
- **`section-concept-detail`** format
- **Section prefix** (e.g., `containers`, `functions`, `memory`)
- **Concept description** (e.g., `std-array-intro`, `vector-loops`)
- **Specific detail** if needed (e.g., `access-methods`, `safety-features`)

**Examples:**
- `containers-std-array-intro`
- `containers-vector-initialization`
- `functions-parameter-passing`
- `memory-stack-vs-heap`

## Slide Layouts

### 1. Section Header
```html
<section class="slide section-header">
  <div class="slide-header"><!-- standard header --></div>
  <div class="slide-body section-header">
    <div class="section-content">
      <h1 class="section-title">Main Topic</h1>
      <p class="section-subtitle">Optional subtitle</p>
    </div>
  </div>
</section>
```

### 2. Two-Column Layout (most common)
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
      <!-- Text content, explanations, lists -->
    </div>
    <div class="right-panel">
      <!-- Code examples, diagrams -->
    </div>
  </div>
</section>
```

### 3. Title Slide
```html
<section class="slide title-slide">
  <div class="title-left">
    <h2>Lecture XX:</h2>
    <h1>Topic Title</h1>
    <img src="UC_SEAL_PLACEHOLDER" alt="UC Seal" class="uc-seal"/>
  </div>
  <div class="title-right">
    <div class="info">
      <p>Instructor Name</p>
      <p>University</p>
      <p><strong>Course Name</strong></p>
      <p>Course Code</p>
    </div>
    <img src="LOGO_PLACEHOLDER" alt="Logo" class="course-logo"/>
  </div>
</section>
```

## Code Blocks and Syntax Highlighting

### Basic Code Block
```html
<div class="code-container">
  <pre><code class="language-cpp" id="unique-code-id">
#include <iostream>

int main() {
    <span id="target-span">std::cout << "Hello";</span>
    return 0;
}
  </code></pre>
  
  <!-- Static annotations -->
  <div class="code-annotation" id="annotation-id" style="top: 20px; left: 50px;">
    Explanation text here
  </div>
</div>
```

### Supported Languages
- `language-cpp` - C++
- `language-python` - Python  
- `language-javascript` - JavaScript
- `language-bash` - Shell/Terminal
- `language-json` - JSON
- Any language supported by Prism.js

### Code Targeting for Animations
- Wrap targetable code in `<span id="unique-id">content</span>`
- Use semantic IDs: `array-declaration`, `loop-condition`, `function-call`
- Keep spans minimal - just the code you want to highlight

## CSS Classes and Styling System

### Slide Layout Classes
- **`.slide`** - Base class for all slides, provides fundamental slide styling
- **`.title-slide`** - Special layout for course title/intro slides
- **`.section-header`** - Layout for topic introduction slides (centered title)
- **`.two-column`** - Most common layout, splits slide into left text/right code panels

### Header Classes  
- **`.slide-header`** - Container for slide header area
- **`.left-header`** - Left side of header (course info)
- **`.right-header`** - Right side of header (slide title)
- **`.berkeley-logo`** - Styled university logo element

### Content Area Classes
- **`.slide-body`** - Main content area of slide
- **`.left-panel`** - Left column content (explanations, lists)
- **`.right-panel`** - Right column content (code, diagrams)
- **`.section-content`** - Content wrapper for section header slides

### Interactive Element Classes
- **`.highlight-item`** - **IMPORTANT**: Add this class to `<span>` elements you want to be highlightable by animations
  ```html
  <!-- Highlightable list item -->
  <li><span class="highlight-item">This can be highlighted</span></li>
  
  <!-- Non-highlightable list item -->
  <li>This cannot be highlighted by animations</li>
  ```
- **`.highlight`** - Applied by JavaScript when an item is currently highlighted
- **`.code-annotation`** - Positioning class for code annotations/callouts
- **`.code-container`** - Wrapper for code blocks to enable relative positioning

### Animation Classes (Applied by JavaScript)
- **`.show`** - Applied to `.code-annotation` elements to make them visible
- **`.highlight`** - Applied to `.highlight-item` elements during animations
- **`.highlight-overlay`** - Dynamically created overlays for code highlighting

### How to Make Elements Highlightable
To make text highlightable by the animation system, you need **both HTML structure AND JavaScript calls**:

#### Step 1: HTML Structure (Required)
```html
<!-- ✅ CORRECT - Can be highlighted -->
<ul id="my-list">
  <li><span class="highlight-item">Point 1</span></li>
  <li><span class="highlight-item">Point 2</span></li>
</ul>

<!-- ❌ INCORRECT - Cannot be highlighted -->
<ul id="my-list">
  <li>Point 1</li>
  <li>Point 2</li>
</ul>
```

#### Step 2: JavaScript Animation Call (Required)
```javascript
function animateSlide() {
    const steps = [
        () => highlightListItem('my-list', 0), // Highlights "Point 1"
        () => highlightListItem('my-list', 1)  // Highlights "Point 2"
    ];
    return runAnimationSteps(steps);
}
```

#### Step 3: CSS Styling (Automatic)
The system automatically applies the `.highlight` class when highlighting occurs. This class should be defined in your CSS to show the visual effect.

### Complete Highlighting Flow
1. **Element must have `highlight-item` class** - This makes it discoverable by the animation system
2. **Animation function must call `highlightListItem()`** - This triggers the highlighting
3. **CSS `.highlight` class provides visual feedback** - This shows the actual highlighting effect

### Removing Highlighting
To prevent an element from being highlighted:
- **Remove** the `highlight-item` class from the HTML
- The animation system will ignore that element even if JavaScript tries to highlight it
- Keep the text content and structure unchanged

### Typography Classes
- **`.section-title`** - Large title text for section headers
- **`.section-subtitle`** - Smaller subtitle text for section headers

### Utility Classes
- **`.annotation-element`** - Mark elements as annotation-related for global toggle
- **`.uc-seal`**, **`.msse-logo`** - Image sizing for institutional logos

### Code Highlighting Classes
- **`.language-cpp`**, **`.language-python`**, etc. - Language-specific syntax highlighting
- **`#unique-id`** - Unique IDs on code elements for precise targeting

### Example Class Usage
```html
<section class="slide two-column" id="arrays-memory-layout">
  <div class="slide-body two-column">
    <div class="left-panel">
      <!-- Highlightable list -->
      <ul id="benefits">
        <li><span class="highlight-item">Fast access</span></li>
        <li><span class="highlight-item">Memory efficient</span></li>
      </ul>
      
      <!-- Non-highlightable explanatory text -->
      <p>These are the main advantages of arrays.</p>
    </div>
    <div class="right-panel">
      <div class="code-container">
        <pre><code class="language-cpp" id="array-code">
int arr[5] = {1, 2, 3, 4, 5};
        </code></pre>
        <div class="code-annotation" id="arr-note">
          Fixed size array
        </div>
      </div>
    </div>
  </div>
</section>
```

### Annotation Boxes (appear/disappear)
```html
<div id="info-box" style="background: #e3f2fd; padding: 1em; border-radius: 8px; margin-top: 1em; opacity: 0; transition: opacity 0.5s;">
  <h4>Title:</h4>
  <p>Content that appears during animation</p>
</div>
```

### Interactive Buttons
```html
<button id="demo-button" style="padding: 5px 10px; background: #2e7d32; color: white; border: none; border-radius: 4px;">
  Click Me
</button>
```

## Animation System Deep Dive

### How the Animation Engine Works

#### Global Animation State
The system uses a global `animationStep` counter to track progress through each slide's animation sequence:

```javascript
let animationStep = 0;  // Tracks current step in animation sequence

function resetAnimations() {
    animationStep = 0;  // Reset when changing slides
    // Clear all highlights and annotations
    document.querySelectorAll('.highlight-overlay').forEach(el => el.remove());
    document.querySelectorAll('.code-annotation.show').forEach(el => el.classList.remove('show'));
    // ... more cleanup
}
```

#### Animation Execution Flow
1. **User presses next/right arrow**
2. **System checks if current slide has animations** via slide ID lookup
3. **If animations exist**, calls the animation function instead of advancing slide
4. **Animation function returns `true`** if more steps remain, `false` if complete
5. **When animation complete**, next press advances to next slide

#### Core Animation Functions

##### `runAnimationSteps(steps)`
The heart of the animation system:
```javascript
function runAnimationSteps(steps) {
    if (animationStep < steps.length) {
        if (typeof steps[animationStep] === 'function') {
            steps[animationStep]();  // Execute current step
        }
        animationStep++;  // Move to next step
        return true;   // More steps remaining
    }
    return false;  // Animation complete
}
```

##### Animation Function Pattern
Every slide animation follows this pattern:
```javascript
function animateMySlide() {
    const steps = [
        () => {
            // Step 1: Do something
            highlightCode('code-id', 'target-text');
        },
        () => {
            // Step 2: Do something else  
            showElement('info-box');
        },
        () => {
            // Step 3: Final step
            highlightListItem('list-id', 0);
        }
    ];
    return runAnimationSteps(steps);  // MUST return this
}
```

#### Integration with Navigation
In `core.js`, the navigation system uses ID-based animation lookup:
```javascript
function nextSlide() { 
    const slides = getSlides();
    
    // Check for animations using slide ID (NEW ROBUST SYSTEM)
    if (typeof slideAnimations !== 'undefined') {
        const currentSlide = slides[current];
        const slideId = currentSlide ? currentSlide.id : null;
        
        // Try ID-based lookup first (new system)
        if (slideId && slideAnimations[slideId]) {
            if (slideAnimations[slideId]()) {
                return; // Animation has more steps, don't advance slide
            }
        }
        // Fallback to numeric index (old system) for backwards compatibility
        else if (slideAnimations[current]) {
            if (slideAnimations[current]()) {
                return; // Animation has more steps, don't advance slide
            }
        }
    }
    
    // No animations or animation complete - advance to next slide
    if (current < slides.length - 1) { 
        current++; 
        showSlide(current); 
    }
}
```

#### Animation Registration (ID-Based System)
Each topic must register its animations using descriptive slide IDs:

```javascript
// ID-based animations (RECOMMENDED - robust and maintainable)
const topicSlideAnimations = {
    'containers-std-array-intro': animateArrayIntroSlide,
    'containers-vector-initialization': animateVectorInitSlide,
    'containers-map-safety': animateMapSafetySlide
};

// Merge into global system (REQUIRED)
if (typeof window.slideAnimations === 'undefined') {
    window.slideAnimations = {};
}
Object.assign(window.slideAnimations, topicSlideAnimations);
```

**Key Benefits of ID-Based System:**
- **Order Independent** - Slides can be reordered without breaking animations
- **Self-Documenting** - Animation names clearly indicate which slide they target
- **Maintainable** - Easy to find and update specific slide animations
- **Collision Resistant** - Unique IDs prevent animation conflicts between sections
- **Future-Proof** - Adding new slides or sections won't affect existing animations

#### Legacy Numeric Index System (Deprecated)
The old system is still supported for backwards compatibility but **not recommended**:
```javascript
// OLD SYSTEM - fragile, breaks when slides are reordered
const topicSlideAnimations = {
    1: animateFirstSlide,    // What if a new slide is inserted before this?
    2: animateSecondSlide,   // Indices become incorrect
    3: animateThirdSlide     // Hard to maintain
};
```

**Problems with Numeric System:**
- Breaks when slides are reordered
- Hard to determine which animation belongs to which slide
- Index calculation errors are common
- Difficult to maintain across multiple sections

#### Annotation System Integration
Animations work closely with the annotation toggle system:
```javascript
// resetAnimations() respects annotation visibility
function resetAnimations() {
    animationStep = 0;
    
    if (annotationsVisible) {
        // Reset but keep annotations available
        document.querySelectorAll('.code-annotation').forEach(el => el.classList.remove('show'));
    } else {
        // Keep annotations hidden
        hideAllAnnotations();
    }
}
```

## Available Animation Functions

### Core Functions
- `runAnimationSteps(steps)` - Execute array of animation steps
- `resetAnimations()` - Reset all animations (called on slide change)

### Code Highlighting
- `highlightCode('codeBlockId', 'textToFind', 'className')` - Highlight specific text in code
- `positionAnnotation('codeBlockId', 'textToFind', 'annotationId')` - Position annotation near code

### List Highlighting  
- `highlightListItem('listId', index)` - Highlight specific list item (0-based)

### Element Control
- `showElement('elementId')` - Fade in element (sets opacity: 1)
- `highlightBackground('elementId', 'color')` - Change background color

### Code Examples
```javascript
// Highlight a function call and show annotation
() => {
    highlightCode('main-code', 'std::vector<int>');
    positionAnnotation('main-code', 'std::vector<int>', 'vector-annotation');
}

// Highlight second list item
() => highlightListItem('benefits-list', 1),

// Show explanation box
() => showElement('explanation-box'),

// Change background color of element
() => highlightBackground('unsafe-method', '#ffebee')
```

## Interactive Demo Setup
```javascript
// Add interactive functionality
function setupInteractiveDemo() {
    const button = document.getElementById('demo-button');
    if (button) {
        button.onclick = function() {
            // Your interactive logic here
            console.log('Button clicked!');
        };
    }
}

// Initialize after DOM loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(setupInteractiveDemo, 500);
});
```

## External Libraries

### Available Libraries
The system supports importing additional JavaScript libraries for enhanced visualizations:

#### Data Visualization
```javascript
// Plotly.js for complex charts
// Add to your script section:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/plotly.js/2.26.0/plotly.min.js"></script>

// Create interactive plots
function createPlotlyChart() {
    const data = [{
        x: ['Array', 'Vector', 'Map'],
        y: [1, 3, 2],
        type: 'bar'
    }];
    Plotly.newPlot('chart-div', data);
}
```

#### Network Diagrams
```javascript
// Cytoscape.js for graphs and networks
// <script src="https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.26.0/cytoscape.min.js"></script>

function createNetworkDiagram() {
    const cy = cytoscape({
        container: document.getElementById('network-container'),
        elements: [
            { data: { id: 'a' } },
            { data: { id: 'b' } },
            { data: { id: 'ab', source: 'a', target: 'b' } }
        ]
    });
}
```

#### Mathematical Visualization
```javascript
// D3.js for custom visualizations
// <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>

// Chart.js for simpler charts
// <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.min.js"></script>
```

#### 3D Graphics
```javascript
// Three.js for 3D visualizations
// <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

function create3DVisualization() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    // ... Three.js setup
}
```

### When to Use External Libraries
- **Plotly**: Complex charts, statistical plots, 3D data visualization
- **Cytoscape**: Network graphs, tree structures, algorithm visualization  
- **D3.js**: Custom interactive visualizations, data binding
- **Chart.js**: Simple charts and graphs
- **Three.js**: 3D graphics, spatial concepts, complex animations
- **Anime.js**: Advanced animations beyond CSS transitions

## Best Practices

### Content Organization
1. **Start with conceptual overview** (bullet points, explanations)
2. **Show concrete examples** (code demonstrations)
3. **Build complexity gradually** (simple → complex examples)
4. **Include interactive elements** where beneficial
5. **End with practical applications** or comparisons

### Animation Guidelines
1. **Reveal information progressively** - don't show everything at once
2. **Match animations to pedagogical flow** - highlight what you're discussing
3. **Use consistent timing** - not too fast, not too slow
4. **Provide visual feedback** - animations should feel responsive
5. **Support the narrative** - animations should enhance, not distract

### Code Examples
1. **Use realistic examples** - not just toy code
2. **Include common pitfalls** - show what can go wrong
3. **Demonstrate best practices** - show the right way
4. **Progressive complexity** - start simple, add features
5. **Consistent formatting** - use same style throughout

### Slide ID Guidelines
1. **Use descriptive names** - `containers-vector-intro` not `slide-5`
2. **Follow naming convention** - `section-concept-detail`
3. **Be consistent** - same pattern across all sections
4. **Avoid generic names** - `intro`, `overview`, `example` are too vague
5. **Make them unique** - prefix with section name to avoid collisions

### Accessibility
1. **Semantic HTML** - proper heading structure, alt text
2. **High contrast** - ensure readability
3. **Keyboard navigation** - don't rely only on mouse
4. **Screen reader friendly** - meaningful element names
5. **Responsive design** - works on different screen sizes

## Troubleshooting

### Common Issues
1. **Animation not working**: 
   - Check slide ID matches animation registration exactly
   - Ensure slide has a unique, descriptive ID
   - Verify animation function is properly defined
2. **Code highlighting fails**: 
   - Verify text matches exactly, check for HTML entities
   - Ensure Prism.js is loading after slide content
   - Check for timing issues with dynamic content
3. **Annotation positioning**: 
   - Ensure target text exists in code block
   - Check annotation element has correct ID
   - Verify timing - annotations may need delays
4. **Interactive elements not responding**: 
   - Check element IDs are unique and correct
   - Verify event listeners are properly attached
   - Ensure elements exist when script runs

### Debugging Tips
1. **Use browser console** - check for JavaScript errors and console logs
2. **Inspect elements** - verify IDs and classes are correct
3. **Test step by step** - comment out animation steps to isolate issues
4. **Check timing** - some elements may need delays to be ready
5. **Verify slide IDs** - ensure they match animation registration exactly

### Migration from Numeric to ID-Based System
If updating old slides:
1. **Add descriptive IDs** to all animated slides
2. **Update animation registration** to use slide IDs
3. **Test each slide** to ensure animations work correctly
4. **Remove old numeric registrations** once ID-based system is working

## Example Topic Template

```html
<section class="slide section-header">
  <div class="slide-header">
    <div class="left-header">
      <div class="berkeley-logo">Cal</div>
      <span>Python for Molecular Sciences:</span>
    </div>
    <div class="right-header">
      <span>Advanced Topic</span>
    </div>
  </div>
  <div class="slide-body section-header">
    <div class="section-content">
      <h1 class="section-title">New Topic</h1>
      <p class="section-subtitle">Subtitle description</p>
    </div>
  </div>
</section>

<section class="slide two-column" id="newtopic-concept-introduction">
  <div class="slide-header">
    <div class="left-header">
      <div class="berkeley-logo">Cal</div>
      <span>Python for Molecular Sciences:</span>
    </div>
    <div class="right-header">
      <span>First Concept</span>
    </div>
  </div>
  <div class="slide-body two-column">
    <div class="left-panel">
      <ul id="concept-list">
        <li><span class="highlight-item">First point</span></li>
        <li><span class="highlight-item">Second point</span></li>
        <li><span class="highlight-item">Third point</span></li>
      </ul>
    </div>
    <div class="right-panel">
      <div class="code-container">
        <pre><code class="language-cpp" id="example-code">
#include <iostream>

int main() {
    <span id="example-target">// Example code here</span>
    return 0;
}
        </code></pre>
        <div class="code-annotation" id="example-annotation" style="top: 60px; left: 100px;">
          Explanation of the code
        </div>
      </div>
    </div>
  </div>
</section>

<section class="slide two-column" id="newtopic-advanced-examples">
  <div class="slide-header">
    <div class="left-header">
      <div class="berkeley-logo">Cal</div>
      <span>Python for Molecular Sciences:</span>
    </div>
    <div class="right-header">
      <span>Advanced Examples</span>
    </div>
  </div>
  <div class="slide-body two-column">
    <div class="left-panel">
      <ul id="advanced-concepts">
        <li><span class="highlight-item">Advanced concept 1</span></li>
        <li><span class="highlight-item">Advanced concept 2</span></li>
      </ul>
    </div>
    <div class="right-panel">
      <div class="code-container">
        <pre><code class="language-cpp" id="advanced-code">
// More complex example
class Example {
    <span id="method-target">void method() { }</span>
};
        </code></pre>
      </div>
    </div>
  </div>
</section>

<script>
// ID-based animation registration (RECOMMENDED)
const newTopicAnimations = {
    'newtopic-concept-introduction': animateConceptIntroduction,
    'newtopic-advanced-examples': animateAdvancedExamples
};

// Merge into global system
if (typeof window.slideAnimations === 'undefined') {
    window.slideAnimations = {};
}
Object.assign(window.slideAnimations, newTopicAnimations);

function animateConceptIntroduction() {
    const steps = [
        () => {
            highlightListItem('concept-list', 0);
            highlightCode('example-code', '// Example code here');
            positionAnnotation('example-code', '// Example code here', 'example-annotation');
        },
        () => {
            highlightListItem('concept-list', 1);
        },
        () => {
            highlightListItem('concept-list', 2);
        }
    ];
    return runAnimationSteps(steps);
}

function animateAdvancedExamples() {
    const steps = [
        () => {
            highlightListItem('advanced-concepts', 0);
            highlightCode('advanced-code', 'void method() { }');
        },
        () => {
            highlightListItem('advanced-concepts', 1);
        }
    ];
    return runAnimationSteps(steps);
}
</script>
```

## System Benefits Summary

This educational slide system provides:

### For Educators
- **Robust animation system** that doesn't break when content is reordered
- **Real syntax highlighting** for authentic code presentation
- **Progressive disclosure** to manage cognitive load effectively
- **Interactive demonstrations** that engage students actively
- **Version control compatibility** for collaborative development
- **AI-friendly structure** for automated content generation and updates

### For Students
- **Multi-modal learning** through visual, textual, and interactive elements
- **Self-paced exploration** with clickable animations and demos
- **Authentic code examples** with proper IDE-like syntax highlighting
- **Immediate feedback** through interactive elements
- **Reduced cognitive overload** with step-by-step information revelation

### For Developers
- **Maintainable codebase** with descriptive IDs and clear structure
- **Modular architecture** allowing independent topic development
- **Extensible framework** supporting external libraries and custom interactions
- **Robust animation system** using ID-based registration instead of fragile indices
- **Consistent patterns** that make creating new content straightforward

## Advanced Features

### Custom Animation Timing
For more complex animations, you can add delays and custom timing:

```javascript
function animateComplexSlide() {
    const steps = [
        () => {
            highlightCode('code-block', 'first-line');
        },
        () => {
            // Custom delay before next step
            setTimeout(() => {
                showElement('explanation-box');
            }, 500);
        },
        () => {
            highlightListItem('feature-list', 0);
        }
    ];
    return runAnimationSteps(steps);
}
```
### Integration with External Libraries
You can combine the animation system with external libraries for enhanced visualizations:

```javascript
function animateWithVisualization() {
    const steps = [
        () => {
            // Standard slide animation
            highlightCode('algorithm-code', 'sort-function');
        },
        () => {
            // Trigger external library visualization
            createSortingVisualization();
            showElement('visualization-container');
        },
        () => {
            // Continue with slide content
            highlightListItem('algorithm-steps', 0);
        }
    ];
    return runAnimationSteps(steps);
}

function createSortingVisualization() {
    // Use D3.js, Plotly, or other library
    const data = [64, 34, 25, 12, 22, 11, 90];
    // ... visualization code
}
```

### Multi-Step Interactive Demos
Create sophisticated interactive demonstrations:

```javascript
function animateInteractiveDemo() {
    let demoState = { step: 0 };
    
    const steps = [
        () => {
            setupInteractiveDemo(demoState);
            showElement('demo-container');
        },
        () => {
            highlightCode('demo-code', 'user-interaction');
            enableDemoInteraction(demoState);
        },
        () => {
            showElement('results-explanation');
        }
    ];
    return runAnimationSteps(steps);
}

function setupInteractiveDemo(state) {
    const button = document.getElementById('demo-button');
    button.onclick = () => {
        // Update demo state
        state.step++;
        updateDemoVisualization(state);
    };
}
```

### Conditional Animations
Create animations that adapt based on content or user interaction:

```javascript
function animateConditionalSlide() {
    const codeType = document.getElementById('code-selector').value;
    
    const steps = [
        () => {
            if (codeType === 'cpp') {
                highlightCode('cpp-code', 'std::vector');
            } else {
                highlightCode('python-code', 'list()');
            }
        },
        () => {
            // Common animation regardless of condition
            showElement('explanation-box');
        }
    ];
    return runAnimationSteps(steps);
}
```

## Performance Considerations

### Efficient Animation Management
- **Minimal DOM manipulation** - animations reuse existing elements when possible
- **Cleanup on slide change** - `resetAnimations()` prevents memory leaks
- **Lazy loading** - external libraries loaded only when needed
- **Optimized highlighting** - reuse highlight overlays rather than creating new ones

### Memory Management
```javascript
// Good: Reuse elements
function highlightCode(codeId, text) {
    let overlay = document.getElementById(`${codeId}-overlay`);
    if (!overlay) {
        overlay = createHighlightOverlay(codeId);
    }
    positionOverlay(overlay, text);
}

// Avoid: Creating new elements every time
function highlightCode(codeId, text) {
    const overlay = document.createElement('div'); // Creates new element each time
    // ... rest of function
}
```

### Responsive Design Considerations
Ensure animations work across different screen sizes:

```css
/* Responsive annotation positioning */
.code-annotation {
    position: absolute;
    /* Use relative units when possible */
    font-size: 0.8em;
}

@media (max-width: 768px) {
    .code-annotation {
        font-size: 0.7em;
        /* Adjust positioning for smaller screens */
    }
}
```

## Content Creation Workflow

### 1. Planning Phase
- **Define learning objectives** for the topic
- **Identify key concepts** that need emphasis
- **Plan animation sequence** to support pedagogical flow
- **Choose appropriate interactions** (demos, visualizations, etc.)

### 2. Structure Creation
- **Create section header slide** with topic overview
- **Design content slides** with descriptive IDs
- **Plan code examples** that build complexity progressively
- **Identify highlightable elements** for animations

### 3. Animation Development
- **Write animation functions** following established patterns
- **Test each animation step** individually
- **Ensure smooth transitions** between concepts
- **Add interactive elements** where they enhance learning

### 4. Testing and Refinement
- **Test on different screen sizes** and devices
- **Verify accessibility** with keyboard navigation
- **Check animation timing** for optimal pacing
- **Gather feedback** from students or colleagues

## Getting Started Checklist

When creating a new topic, follow this checklist:

### HTML Structure
- [ ] Add descriptive ID to each animated slide (`section-concept-detail` format)
- [ ] Use `highlight-item` class for text that should be highlightable
- [ ] Include unique IDs for code blocks and interactive elements
- [ ] Add semantic HTML structure with proper headings

### Animation Setup
- [ ] Create animation functions following the established pattern
- [ ] Register animations using slide IDs (not numeric indices)
- [ ] Test each animation step individually
- [ ] Ensure `runAnimationSteps()` is properly returned

### Content Quality
- [ ] Start with conceptual overview before diving into code
- [ ] Use realistic, practical code examples
- [ ] Build complexity progressively
- [ ] Include interactive elements where they enhance learning

### Testing
- [ ] Test on different screen sizes
- [ ] Verify keyboard navigation works
- [ ] Check that Prism syntax highlighting is working
- [ ] Ensure animations don't break when slides are reordered

## Conclusion

This educational slide system represents a significant advancement over traditional presentation tools for programming education. By combining the flexibility of web technologies with a robust, ID-based animation system, it enables educators to create truly engaging, interactive learning experiences.

The system's strength lies in its balance of power and maintainability. While it provides sophisticated animation capabilities and supports complex interactive demonstrations, it maintains a clear, consistent structure that makes content creation and maintenance straightforward.

As you create content with this system, remember that the technology serves the pedagogy—every animation, interaction, and visual element should have a clear educational purpose. The goal is not just to impress students with flashy effects, but to genuinely enhance their understanding of complex programming concepts.

The ID-based animation system ensures that your educational content will remain robust and maintainable as it grows and evolves, allowing you to focus on what matters most: creating effective learning experiences for your students.