// Container section specific animations with precise positioning
const slideAnimations = {
    // Note: Slide indices are 0-based. "Slide 3" is at index 2.
    2: animateReviewSlide,
    3: animateArrayIntroSlide,
    4: animateArrayAccessSlide,
    5: animateVectorIntroSlide,
    6: animateVectorInitSlide,
    // Slide 7 (Adding Elements) and 8 (Vector Access) are similar to original
    // Slide 9 is now the new Vector Loops slide
    9: animateVectorLoopSlide, 
    // Slide 10 is the comparison, Slide 11 is the map intro
    11: animateMapIntroSlide,
    // Add other animation functions as needed
};

function animateReviewSlide() {
    const steps = [
        () => {
            highlightCode('c-array-code', 'double atom_masses[5]');
            positionAnnotation('c-array-code', 'double atom_masses[5]', 'array-annotation');
        },
        () => {
            highlightCode('c-array-code', 'i < 5');
            positionAnnotation('c-array-code', 'i < 5', 'loop-annotation');
        },
        () => showElement('limitations-box')
    ];
    return runAnimationSteps(steps);
}

function animateArrayIntroSlide() {
    const steps = [
        () => {
            highlightListItem('array-benefits', 0);
            highlightCode('std-array-code', '#include <array>');
            positionAnnotation('std-array-code', '#include <array>', 'include-annotation');
        },
        () => {
            highlightListItem('array-benefits', 1);
            highlightCode('std-array-code', 'std::array<double, 5>');
            positionAnnotation('std-array-code', 'std::array<double, 5>', 'template-annotation');
        },
        () => {
            highlightListItem('array-benefits', 2);
            highlightCode('std-array-code', '.size()');
            positionAnnotation('std-array-code', '.size()', 'methods-annotation');
        },
        () => {
            highlightListItem('array-benefits', 3);
        }
    ];
    return runAnimationSteps(steps);
}

function animateArrayAccessSlide() {
    const steps = [
        () => {
            highlightBackground('bracket-method', '#ffebee');
            highlightCode('access-code', 'masses[2]');
            positionAnnotation('access-code', 'masses[2]', 'unsafe-annotation');
        },
        () => {
            highlightBackground('at-method', '#e8f5e8');
            highlightCode('access-code', 'masses.at(3)');
            positionAnnotation('access-code', 'masses.at(3)', 'safe-annotation');
        }
    ];
    return runAnimationSteps(steps);
}

function animateVectorIntroSlide() {
    const steps = [
        () => {
            highlightListItem('vector-features', 0);
        },
        () => {
            highlightListItem('vector-features', 1);
            highlightCode('vector-code', 'std::vector<double> bond_lengths;');
            positionAnnotation('vector-code', 'std::vector<double> bond_lengths;', 'empty-annotation');
        },
        () => {
            highlightListItem('vector-features', 2);
            highlightCode('vector-code', 'push_back');
            positionAnnotation('vector-code', 'push_back', 'pushback-annotation');
        },
        () => {
            highlightListItem('vector-features', 3);
            showElement('vector-demo');
        }
    ];
    return runAnimationSteps(steps);
}

function animateVectorInitSlide() {
    const steps = [
        () => {
            highlightListItem('init-methods', 0);
            highlightCode('init-code', 'std::vector<int> atomic_numbers;');
            positionAnnotation('init-code', 'std::vector<int> atomic_numbers;', 'empty-vec-annotation');
        },
        () => {
            highlightListItem('init-methods', 1);
            highlightCode('init-code', '{273.15, 298.15, 373.15}');
            positionAnnotation('init-code', '{273.15, 298.15, 373.15}', 'init-list-annotation');
        },
        () => {
            highlightListItem('init-methods', 2);
            highlightCode('init-code', 'residue_charges(20, 0)');
            positionAnnotation('init-code', 'residue_charges(20, 0)', 'size-default-annotation');
        },
        () => {
            showElement('size-info');
            highlightCode('init-code', 'for(size_t i = 0;');
            positionAnnotation('init-code', 'for(size_t i = 0;', 'size-t-annotation');
        }
    ];
    return runAnimationSteps(steps);
}

function animateVectorLoopSlide() {
    const steps = [
        () => {
            highlightListItem('loop-methods', 0);
            positionAnnotation('loop-code', 'for (int i = 0; i < masses.size(); i++)', 'traditional-annotation');
            highlightCode('loop-code', 'for (int i = 0; i < masses.size(); i++)');
        },
        () => {
            highlightListItem('loop-methods', 1);
            positionAnnotation('loop-code', 'for (size_t i = 0; i < masses.size(); i++)', 'sizet-annotation');
            highlightCode('loop-code', 'for (size_t i = 0; i < masses.size(); i++)');
        },
        () => {
            highlightListItem('loop-methods', 2);
            positionAnnotation('loop-code', 'for (double mass : masses)', 'range-based-annotation');
            highlightCode('loop-code', 'for (double mass : masses)');
        },
        () => showElement('python-comparison')
    ];
    return runAnimationSteps(steps);
}

function animateMapIntroSlide() {
    const mapData = [
        { key: '"ALA"', value: '89.094' },
        { key: '"GLY"', value: '75.067' },
        { key: '"CYS"', value: '121.159' }
    ];
    const steps = [
        () => {
            highlightListItem('map-features', 0);
            highlightCode('map-code', '#include <map>');
        },
        () => {
            highlightListItem('map-features', 1);
            positionAnnotation('map-code', 'std::map<std::string, double>', 'map-template-annotation');
            highlightCode('map-code', 'std::map<std::string, double>');
        },
        () => {
            highlightListItem('map-features', 2);
            positionAnnotation('map-code', 'amino_masses["ALA"] = 89.094;', 'map-insert-annotation');
            highlightCode('map-code', 'amino_masses["ALA"] = 89.094;');
            updateMapVisualization(mapData.slice(0, 1));
        },
        () => {
            positionAnnotation('map-code', 'if (amino_masses.count("TRP"))', 'map-access-annotation');
            highlightCode('map-code', 'if (amino_masses.count("TRP"))');
            updateMapVisualization(mapData);
        }
    ];
    return runAnimationSteps(steps);
}

// Interactive demo helper (specific to this section)
function setupPushBackDemo() {
    let demoVector = [];
    const pushButton = document.getElementById('add-element');
    const container = document.getElementById('vector-boxes');
    if (pushButton && container) {
        pushButton.onclick = () => {
            const newElement = document.createElement('div');
            newElement.style.width = '30px';
            newElement.style.height = '30px';
            newElement.style.background = '#003262';
            newElement.style.color = 'white';
            newElement.style.display = 'flex';
            newElement.style.alignItems = 'center';
            newElement.style.justifyContent = 'center';
            newElement.style.borderRadius = '4px';
            newElement.textContent = demoVector.length + 1;
            demoVector.push(newElement.textContent);
            container.appendChild(newElement);
        };
    }
}
// Call the setup function when the slide is shown, perhaps in the animation function itself
// or by modifying the core slide logic if needed. For simplicity, we can call it in its animation function.
function animateVectorIntroSlide_withDemo() {
    setupPushBackDemo(); // Call setup when the slide animates
    // ... rest of the animateVectorIntroSlide steps
}

// Map visualization helper (specific to this section)
function updateMapVisualization(data) {
    const container = document.getElementById('map-pairs');
    if (container) {
        container.innerHTML = data.map(pair =>
            `<div><span style="color:#d32f2f;">${pair.key}</span> → ${pair.value}</div>`
        ).join('');
    }
}