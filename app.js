// DOM Elements
const totalQuantityInput = document.getElementById('totalQuantity');
const perBoxInput = document.getElementById('perBox');
const minPerRowInput = document.getElementById('minPerRow');
const maxPerRowInput = document.getElementById('maxPerRow');
const calculateBtn = document.getElementById('calculateBtn');
const resultsSection = document.getElementById('results');

// Result Elements
const totalBoxesEl = document.getElementById('totalBoxes');
const totalRowsEl = document.getElementById('totalRows');
const boxesPerRowEl = document.getElementById('boxesPerRow');
const lastRowBoxesEl = document.getElementById('lastRowBoxes');
const detailedBreakdownEl = document.getElementById('detailedBreakdown');
const visualizationEl = document.getElementById('visualization');
const remainingAlertEl = document.getElementById('remainingAlert');
const remainingItemsEl = document.getElementById('remainingItems');
const remainingSuggestionEl = document.getElementById('remainingSuggestion');

// Event Listeners
calculateBtn.addEventListener('click', calculate);

// Allow Enter key to trigger calculation
[totalQuantityInput, perBoxInput, minPerRowInput, maxPerRowInput].forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculate();
        }
    });

    // Real-time validation and formatting
    input.addEventListener('input', (e) => {
        if (e.target.value < 0) {
            e.target.value = 0;
        }
    });
});

// Auto-focus first input on load
window.addEventListener('load', () => {
    totalQuantityInput.focus();
});

/**
 * Main calculation function
 */
function calculate() {
    // Get input values
    const totalQuantity = parseInt(totalQuantityInput.value) || 0;
    const perBox = parseInt(perBoxInput.value) || 0;
    const minPerRow = parseInt(minPerRowInput.value) || 20;
    const maxPerRow = parseInt(maxPerRowInput.value) || 23;

    // Validation
    if (totalQuantity <= 0) {
        showError('총 떡 수량을 입력해주세요.');
        totalQuantityInput.focus();
        return;
    }

    if (perBox <= 0) {
        showError('파란상자 당 떡 개수를 입력해주세요.');
        perBoxInput.focus();
        return;
    }

    if (minPerRow <= 0 || maxPerRow <= 0) {
        showError('한 줄당 상자 개수를 올바르게 입력해주세요.');
        return;
    }

    if (minPerRow > maxPerRow) {
        showError('최소값이 최대값보다 클 수 없습니다.');
        return;
    }

    // Calculate total boxes needed
    const totalBoxes = Math.floor(totalQuantity / perBox);
    const remainingItems = totalQuantity % perBox;

    if (totalBoxes === 0) {
        showError(`상자를 만들 수 없습니다. 최소 ${perBox}개의 떡이 필요합니다.`);
        return;
    }

    // Find optimal distribution
    const distribution = findOptimalDistribution(totalBoxes, minPerRow, maxPerRow);

    // Display results
    displayResults({
        totalQuantity,
        perBox,
        totalBoxes,
        remainingItems,
        distribution,
        minPerRow,
        maxPerRow
    });

    // Show results section with animation
    resultsSection.classList.remove('hidden');
    setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

/**
 * Find optimal distribution of boxes across rows
 */
function findOptimalDistribution(totalBoxes, minPerRow, maxPerRow) {
    let bestDistribution = null;
    let bestScore = -1;

    // Try each possible boxes per row in the range
    for (let boxesPerRow = minPerRow; boxesPerRow <= maxPerRow; boxesPerRow++) {
        const fullRows = Math.floor(totalBoxes / boxesPerRow);
        const lastRowBoxes = totalBoxes % boxesPerRow;

        // Calculate total rows
        const totalRows = lastRowBoxes > 0 ? fullRows + 1 : fullRows;

        // Calculate score (prefer distributions where last row is also within range or full)
        let score = 0;

        // Perfect distribution (no remainder)
        if (lastRowBoxes === 0) {
            score = 1000;
        }
        // Last row within acceptable range
        else if (lastRowBoxes >= minPerRow && lastRowBoxes <= maxPerRow) {
            score = 900 + lastRowBoxes; // Prefer fuller last rows
        }
        // Last row exists but outside range
        else {
            // Prefer last row to be as full as possible
            score = lastRowBoxes;
        }

        // Prefer fewer total rows (secondary criteria)
        score -= totalRows * 0.1;

        if (score > bestScore) {
            bestScore = score;
            bestDistribution = {
                boxesPerRow,
                fullRows,
                lastRowBoxes,
                totalRows
            };
        }
    }

    return bestDistribution;
}

/**
 * Display calculation results
 */
function displayResults(data) {
    const { totalQuantity, perBox, totalBoxes, remainingItems, distribution } = data;
    const { boxesPerRow, fullRows, lastRowBoxes, totalRows } = distribution;

    // Update summary metrics
    totalBoxesEl.textContent = totalBoxes.toLocaleString();
    totalRowsEl.textContent = totalRows.toLocaleString();
    boxesPerRowEl.textContent = boxesPerRow.toLocaleString();
    lastRowBoxesEl.textContent = lastRowBoxes > 0 ? lastRowBoxes.toLocaleString() : boxesPerRow.toLocaleString();

    // Generate detailed breakdown
    generateDetailedBreakdown(data);

    // Show remaining items alert if applicable
    if (remainingItems > 0) {
        remainingAlertEl.classList.remove('hidden');
        remainingItemsEl.textContent = remainingItems.toLocaleString();

        const boxesNeeded = perBox - remainingItems;
        remainingSuggestionEl.textContent = `추가로 ${boxesNeeded.toLocaleString()}개만 더 있으면 한 상자를 더 만들 수 있습니다.`;
    } else {
        remainingAlertEl.classList.add('hidden');
    }

    // Generate visualization
    generateVisualization(distribution, perBox);
}

/**
 * Generate detailed breakdown
 */
function generateDetailedBreakdown(data) {
    const { totalQuantity, perBox, totalBoxes, distribution } = data;
    const { boxesPerRow, fullRows, lastRowBoxes, totalRows } = distribution;

    let html = '<div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-5 border border-gray-200">';
    html += '<h4 class="font-bold text-gray-800 mb-4 text-lg">상세 배치</h4>';
    html += '<div class="space-y-3 text-sm md:text-base">';

    // Full rows
    if (fullRows > 0) {
        const fullRowsQuantity = fullRows * boxesPerRow * perBox;
        html += `
            <div class="flex items-center justify-between p-3 bg-white rounded-xl">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <span class="font-bold text-blue-700">${fullRows}</span>
                    </div>
                    <div>
                        <div class="font-semibold text-gray-800">완전한 줄</div>
                        <div class="text-xs text-gray-500">각 줄당 ${boxesPerRow.toLocaleString()}상자</div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="font-bold text-gray-800">${(fullRows * boxesPerRow).toLocaleString()} 상자</div>
                    <div class="text-xs text-gray-500">${fullRowsQuantity.toLocaleString()}개</div>
                </div>
            </div>
        `;
    }

    // Last row (if different)
    if (lastRowBoxes > 0) {
        const lastRowQuantity = lastRowBoxes * perBox;
        html += `
            <div class="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-orange-200">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                        <span class="font-bold text-orange-700">1</span>
                    </div>
                    <div>
                        <div class="font-semibold text-gray-800">마지막 줄</div>
                        <div class="text-xs text-gray-500">${lastRowBoxes.toLocaleString()}상자</div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="font-bold text-gray-800">${lastRowBoxes.toLocaleString()} 상자</div>
                    <div class="text-xs text-gray-500">${lastRowQuantity.toLocaleString()}개</div>
                </div>
            </div>
        `;
    }

    // Total summary
    html += `
        <div class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white mt-4">
            <div class="font-bold text-lg">총 합계</div>
            <div class="text-right">
                <div class="font-bold text-2xl">${totalBoxes.toLocaleString()} 상자</div>
                <div class="text-sm text-blue-100">${(totalBoxes * perBox).toLocaleString()}개 (총 ${totalQuantity.toLocaleString()}개 중)</div>
            </div>
        </div>
    `;

    html += '</div></div>';
    detailedBreakdownEl.innerHTML = html;
}

/**
 * Generate visual representation
 */
function generateVisualization(distribution, perBox) {
    const { boxesPerRow, fullRows, lastRowBoxes } = distribution;
    let html = '';

    const maxBoxesToShow = 10; // Limit visualization for performance

    // Generate rows
    for (let row = 0; row < distribution.totalRows; row++) {
        const isLastRow = row === distribution.totalRows - 1;
        const boxesInThisRow = isLastRow && lastRowBoxes > 0 ? lastRowBoxes : boxesPerRow;
        const showLimited = boxesInThisRow > maxBoxesToShow;
        const boxesToDisplay = showLimited ? maxBoxesToShow : boxesInThisRow;

        html += `
            <div class="flex items-center space-x-2 p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
                <div class="flex-shrink-0 w-16 text-center">
                    <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        ${isLastRow && lastRowBoxes > 0 ? '마지막' : `${row + 1}줄`}
                    </div>
                    <div class="text-lg font-bold ${isLastRow && lastRowBoxes > 0 ? 'text-orange-600' : 'text-blue-600'}">
                        ${boxesInThisRow}
                    </div>
                </div>
                <div class="flex-1 flex flex-wrap gap-1.5 items-center">
                    ${Array.from({ length: boxesToDisplay }, (_, i) => `
                        <div class="group relative">
                            <div class="w-8 h-8 md:w-10 md:h-10 ${isLastRow && lastRowBoxes > 0 ? 'bg-gradient-to-br from-orange-400 to-orange-600' : 'bg-gradient-to-br from-blue-400 to-blue-600'} rounded-lg shadow-md transform hover:scale-110 transition-transform cursor-pointer flex items-center justify-center">
                                <svg class="w-4 h-4 md:w-5 md:h-5 text-white opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                </svg>
                            </div>
                            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                                ${perBox}개
                            </div>
                        </div>
                    `).join('')}
                    ${showLimited ? `
                        <div class="flex items-center px-3 py-1 bg-gray-200 rounded-lg">
                            <span class="text-sm font-semibold text-gray-600">+${boxesInThisRow - maxBoxesToShow}개</span>
                        </div>
                    ` : ''}
                </div>
                <div class="flex-shrink-0 text-right">
                    <div class="text-xs text-gray-500">총</div>
                    <div class="text-sm font-bold text-gray-700">${(boxesInThisRow * perBox).toLocaleString()}개</div>
                </div>
            </div>
        `;
    }

    visualizationEl.innerHTML = html;
}

/**
 * Show error message
 */
function showError(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 animate-slide-up flex items-center max-w-md';
    toast.innerHTML = `
        <svg class="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class="font-medium">${message}</span>
    `;

    document.body.appendChild(toast);

    // Add vibration feedback on mobile
    if ('vibrate' in navigator) {
        navigator.vibrate(200);
    }

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(-20px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Format number with thousands separator
 */
function formatNumber(num) {
    return num.toLocaleString('ko-KR');
}

// PWA: Register service worker for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable PWA
        // navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
}

// Add haptic feedback for better mobile UX
calculateBtn.addEventListener('touchstart', () => {
    if ('vibrate' in navigator) {
        navigator.vibrate(10);
    }
});

// Auto-save inputs to localStorage
function saveInputs() {
    localStorage.setItem('suradang_totalQuantity', totalQuantityInput.value);
    localStorage.setItem('suradang_perBox', perBoxInput.value);
    localStorage.setItem('suradang_minPerRow', minPerRowInput.value);
    localStorage.setItem('suradang_maxPerRow', maxPerRowInput.value);
}

function loadInputs() {
    const saved = {
        totalQuantity: localStorage.getItem('suradang_totalQuantity'),
        perBox: localStorage.getItem('suradang_perBox'),
        minPerRow: localStorage.getItem('suradang_minPerRow'),
        maxPerRow: localStorage.getItem('suradang_maxPerRow')
    };

    if (saved.totalQuantity) totalQuantityInput.value = saved.totalQuantity;
    if (saved.perBox) perBoxInput.value = saved.perBox;
    if (saved.minPerRow) minPerRowInput.value = saved.minPerRow;
    if (saved.maxPerRow) maxPerRowInput.value = saved.maxPerRow;
}

// Load saved inputs on page load
loadInputs();

// Save inputs on change
[totalQuantityInput, perBoxInput, minPerRowInput, maxPerRowInput].forEach(input => {
    input.addEventListener('change', saveInputs);
});
