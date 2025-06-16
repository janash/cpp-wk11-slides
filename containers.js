// Container section specific animations with precise positioning
const slideAnimations = {
    // Note: Slide indices are 0-based. "Slide 3" is at index 2.
    2: animateReviewSlide,
    3: animateArrayIntroSlide,
    4: animateArrayAccessSlide,
    5: animateVectorIntroSlide,
    6: animateVectorInitSlide,
    7: animatePushBackSlide,
    8: animateVectorAccessSlide,
    9: animateVectorLoopSlide,
    10: animateComparisonSlide,
    11: animateMapIntroSlide,
    12: animateMapSafetySlide,
    13: animateSummarySlide
};

// --- CORRECTED ANIMATION FUNCTIONS ---

function animateReviewSlide() {
    const steps = [
        () => {
            // Corrected to match the code in index.html
            highlightCode('c-array-code', 'int arr[5]');
            positionAnnotation('c-array-code', 'int arr[5]', 'array-annotation');
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
            // Corrected 'double' to 'int'
            highlightCode('std-array-code', 'std::array<int, 5>');
            positionAnnotation('std-array-code', 'std::array<int, 5>', 'template-annotation');
        },
        () => {
            highlightListItem('array-benefits', 2);
            highlightCode('std-array-code', '.size()');
            positionAnnotation('std-array-code', '.size()', 'methods-annotation');
        },
        () => {
            highlightListItem('array-benefits', 3);
        },
        () => {
            highlightListItem('array-benefits', 4);
        }
    ];
    return runAnimationSteps(steps);
}

function animateArrayAccessSlide() {
    const steps = [
        () => {
            highlightBackground('bracket-method', '#ffebee');
            // Corrected 'masses[2]' to 'safe_array[0]'
            highlightCode('access-code', 'safe_array[0]');
            positionAnnotation('access-code', 'safe_array[0]', 'unsafe-annotation');
        },
        () => {
            highlightBackground('at-method', '#e8f5e8');
            // Corrected 'masses.at(3)' to 'safe_array.at(0)'
            highlightCode('access-code', 'safe_array.at(0)');
            positionAnnotation('access-code', 'safe_array.at(0)', 'safe-annotation');
        }
    ];
    return runAnimationSteps(steps);
}

function animateVectorIntroSlide() {
    const steps = [
        () => highlightListItem('vector-features', 0),
        () => {
            highlightListItem('vector-features', 1);
             // Corrected to match index.html
            highlightCode('vector-code', '#include <vector>');
        },
        () => {
            highlightListItem('vector-features', 2);
            // Corrected to match index.html
            highlightCode('vector-code', 'std::vector<int> numbers;');
            positionAnnotation('vector-code', 'std::vector<int> numbers;', 'empty-annotation');
        },
        () => {
            highlightCode('vector-code', 'numbers.push_back(42);');
            positionAnnotation('vector-code', 'numbers.push_back(42);', 'pushback-annotation');
        },
        () => showElement('vector-demo')
    ];
    return runAnimationSteps(steps);
}

function animateVectorInitSlide() {
    const steps = [
        () => {
            highlightListItem('init-methods', 0);
            // Corrected to match index.html
            highlightCode('init-code', 'std::vector<int> empty_vec;');
            positionAnnotation('init-code', 'std::vector<int> empty_vec;', 'empty-vec-annotation');
        },
        () => {
            highlightListItem('init-methods', 1);
            // Corrected to match index.html
            highlightCode('init-code', '{98.6, 99.1, 97.8}');
            positionAnnotation('init-code', '{98.6, 99.1, 97.8}', 'init-list-annotation');
        },
        () => {
            highlightListItem('init-methods', 2);
            // Corrected to match index.html
            highlightCode('init-code', 'scores(10, 0)');
            positionAnnotation('init-code', 'scores(10, 0)', 'size-default-annotation');
        },
        () => {
            highlightListItem('init-methods', 3);
            showElement('size-info');
            highlightCode('init-code', 'size_t i');
            positionAnnotation('init-code', 'size_t i', 'size-t-annotation');
        }
    ];
    return runAnimationSteps(steps);
}

function animatePushBackSlide() {
    const steps = [
        () => highlightListItem('pushback-features', 0),
        () => {
            highlightListItem('pushback-features', 1);
            highlightCode('pushback-code', 'numbers.size()');
            positionAnnotation('pushback-code', 'numbers.size()', 'initial-annotation');
        },
        () => {
            highlightListItem('pushback-features', 2);
            highlightCode('pushback-code', 'numbers.push_back(10);');
            positionAnnotation('pushback-code', 'numbers.push_back(10);', 'grow-annotation');
        },
        () => {
             highlightCode('pushback-code', 'for(int i = 0; i < numbers.size(); i++)');
             positionAnnotation('pushback-code', 'for(int i = 0; i < numbers.size(); i++)', 'range-annotation');
        }
    ];
    return runAnimationSteps(steps);
}

function animateVectorAccessSlide() {
    const steps = [
        () => highlightListItem('vector-access', 0),
        () => {
            highlightListItem('vector-access', 1);
            highlightCode('vector-access-code', 'data[0]');
            positionAnnotation('vector-access-code', 'data[0]', 'unsafe-vec-annotation');
        },
        () => {
            highlightListItem('vector-access', 2);
            highlightCode('vector-access-code', 'data.at(0)');
            positionAnnotation('vector-access-code', 'data.at(0)', 'safe-vec-annotation');
        },
        () => {
             highlightCode('vector-access-code', 'data.front()');
             positionAnnotation('vector-access-code', 'data.front()', 'convenience-annotation');
        },
        () => showElement('access-warning')
    ];
    return runAnimationSteps(steps);
}


function animateVectorLoopSlide() {
    const steps = [
        () => {
            highlightListItem('loop-methods', 0);
            // Corrected 'masses' to 'numbers'
            highlightCode('loop-code', 'for(int i = 0; i < numbers.size(); i++)');
            positionAnnotation('loop-code', 'for(int i = 0; i < numbers.size(); i++)', 'traditional-annotation');
        },
        () => {
            highlightListItem('loop-methods', 1);
            // Corrected 'masses' to 'numbers'
            highlightCode('loop-code', 'for(size_t i = 0; i < numbers.size(); i++)');
            positionAnnotation('loop-code', 'for(size_t i = 0; i < numbers.size(); i++)', 'sizet-annotation');
        },
        () => {
            highlightListItem('loop-methods', 2);
            // Corrected to an existing line of code
            highlightCode('loop-code', 'numbers[i] *= 2;');
            positionAnnotation('loop-code', 'numbers[i] *= 2;', 'modify-annotation');
        },
        () => showElement('python-comparison')
    ];
    return runAnimationSteps(steps);
}

function animateComparisonSlide() {
    const steps = [
        () => {
            highlightCode('comparison-code', 'std::array<double, 3>');
            positionAnnotation('comparison-code', 'std::array<double, 3>', 'fixed-annotation');
        },
        () => {
            highlightCode('comparison-code', 'measurements.push_back(next_value);');
            positionAnnotation('comparison-code', 'measurements.push_back(next_value);', 'dynamic-annotation');
        },
        () => {
            highlightCode('comparison-code', 'std::cin >> n;');
            positionAnnotation('comparison-code', 'std::cin >> n;', 'runtime-annotation');
        }
    ];
    return runAnimationSteps(steps);
}


function animateMapIntroSlide() {
    const steps = [
        () => highlightListItem('map-features', 0),
        () => {
            highlightListItem('map-features', 1);
            highlightCode('map-code', '#include <map>');
        },
        () => {
            highlightListItem('map-features', 2);
            // Corrected to match index.html
            highlightCode('map-code', 'std::map<std::string, int>');
            positionAnnotation('map-code', 'std::map<std::string, int>', 'map-template-annotation');
        },
        () => {
            highlightListItem('map-features', 3);
            // Corrected to match index.html
            highlightCode('map-code', 'ages["Alice"] = 25;');
            positionAnnotation('map-code', 'ages["Alice"] = 25;', 'map-insert-annotation');
        },
        () => {
            // Corrected to match index.html
            highlightCode('map-code', 'ages["Alice"]');
            positionAnnotation('map-code', 'ages["Alice"]', 'map-access-annotation');
        }
    ];
    return runAnimationSteps(steps);
}

function animateMapSafetySlide() {
    const steps = [
        () => {
            highlightListItem('map-operations', 0);
            highlightCode('map-safety-code', 'scores.find("test3")');
            positionAnnotation('map-safety-code', 'scores.find("test3")', 'find-annotation');
        },
        () => {
            highlightListItem('map-operations', 1);
            highlightCode('map-safety-code', 'scores.at("test4")');
            positionAnnotation('map-safety-code', 'scores.at("test4")', 'at-safe-annotation');
        },
         () => {
            highlightListItem('map-operations', 2);
            highlightCode('map-safety-code', 'scores["test3"]');
            positionAnnotation('map-safety-code', 'scores["test3"]', 'create-annotation');
        },
        () => showElement('map-warning')
    ];
    return runAnimationSteps(steps);
}

function animateSummarySlide() {
    const steps = [
        () => {
            highlightCode('summary-code', 'std::array<int, 3>');
            positionAnnotation('summary-code', 'std::array<int, 3>', 'fixed-final-annotation');
        },
        () => {
            highlightCode('summary-code', 'measurements.push_back(temp);');
            positionAnnotation('summary-code', 'measurements.push_back(temp);', 'dynamic-final-annotation');
        },
        () => {
            highlightCode('summary-code', 'inventory["apples"] = 42;');
            positionAnnotation('summary-code', 'inventory["apples"] = 42;', 'keyvalue-final-annotation');
        },
        () => {
            highlightCode('summary-code', '.size()');
            positionAnnotation('summary-code', '.size()', 'common-final-annotation');
        }
    ];
    return runAnimationSteps(steps);
}