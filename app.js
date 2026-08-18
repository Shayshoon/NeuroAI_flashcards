/**
 * NeuroAI Interactive Flashcards Application
 * Handles LaTeX/Markdown rendering, spaced repetition status tracking,
 * filtering, search, 3D flip card animations, mousewheel scrolling,
 * CSV/JSON import & export, and grid navigation.
 */

// Global State
const state = {
    allCards: [],
    chapters: {},
    filteredCards: [],
    currentIndex: 0,
    isFlipped: false,
    isShuffled: false,
    selectedChapter: 'all',
    activeFilter: 'all', // 'all', 'unmastered', 'unseen', 'starred', 'review', 'mastered'
    searchQuery: '',
    progress: {
        starred: new Set(),
        mastered: new Set(),
        review: new Set()
    }
};

// DOM Elements
let elements = {};

function initDOMElements() {
    elements = {
        // Header & Stats
        statMastered: document.getElementById('stat-mastered-count'),
        statStarred: document.getElementById('stat-starred-count'),
        statTotal: document.getElementById('stat-total-count'),
        
        // Import & Export
        btnImportProgress: document.getElementById('btn-import-progress'),
        importFileInput: document.getElementById('import-file-input'),
        btnExportToggle: document.getElementById('btn-export-toggle'),
        exportMenu: document.getElementById('export-menu'),
        btnExportCSV: document.getElementById('btn-export-csv'),
        btnExportJSON: document.getElementById('btn-export-json'),

        // Filters & Toolbar
        chapterFilter: document.getElementById('chapter-filter'),
        searchInput: document.getElementById('search-input'),
        btnClearSearch: document.getElementById('btn-clear-search'),
        pillAll: document.getElementById('filter-all'),
        pillUnmastered: document.getElementById('filter-unmastered'),
        pillUnseen: document.getElementById('filter-unseen'),
        pillStarred: document.getElementById('filter-starred'),
        pillReview: document.getElementById('filter-review'),
        pillMastered: document.getElementById('filter-mastered'),
        countAll: document.getElementById('count-all'),
        countUnmastered: document.getElementById('count-unmastered'),
        countUnseen: document.getElementById('count-unseen'),
        countStarred: document.getElementById('count-starred'),
        countReview: document.getElementById('count-review'),
        countMastered: document.getElementById('count-mastered'),
        btnShuffle: document.getElementById('btn-shuffle'),
        btnResetOrder: document.getElementById('btn-reset-order'),
        
        // Card & Stage
        progressBar: document.getElementById('deck-progress-bar'),
        cardCounter: document.getElementById('active-card-counter'),
        flashcardContainer: document.getElementById('flashcard-container'),
        flashcard: document.getElementById('flashcard'),
        
        // Front Face
        frontChapterBadge: document.getElementById('front-chapter-badge'),
        frontExBadge: document.getElementById('front-ex-badge'),
        frontStatusBadge: document.getElementById('front-status-badge'),
        btnStarFront: document.getElementById('btn-star-front'),
        btnCopyFront: document.getElementById('btn-copy-front'),
        questionContent: document.getElementById('question-content'),
        
        // Back Face
        backChapterBadge: document.getElementById('back-chapter-badge'),
        backExBadge: document.getElementById('back-ex-badge'),
        btnStarBack: document.getElementById('btn-star-back'),
        btnCopyBack: document.getElementById('btn-copy-back'),
        solutionContent: document.getElementById('solution-content'),
        btnMarkReview: document.getElementById('btn-mark-review'),
        btnMarkMastered: document.getElementById('btn-mark-mastered'),
        btnMarkUnseen: document.getElementById('btn-mark-unseen'),
        
        // Navigation
        btnPrev: document.getElementById('btn-prev'),
        btnFlip: document.getElementById('btn-flip'),
        btnNext: document.getElementById('btn-next'),
        
        // Grid Modal
        btnOpenGrid: document.getElementById('btn-open-grid'),
        btnCloseGrid: document.getElementById('btn-close-grid'),
        gridModal: document.getElementById('grid-modal'),
        gridCardsContainer: document.getElementById('grid-cards-container'),
        
        // Toast
        toast: document.getElementById('toast')
    };
}

// Storage Keys
const STORAGE_KEY = 'neuroai_flashcards_progress_v1';

/**
 * Load user progress from localStorage
 */
function loadProgress() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            if (Array.isArray(data.starred)) state.progress.starred = new Set(data.starred);
            if (Array.isArray(data.mastered)) state.progress.mastered = new Set(data.mastered);
            if (Array.isArray(data.review)) state.progress.review = new Set(data.review);
        }
    } catch (e) {
        console.warn('Could not load user progress from storage:', e);
    }
}

/**
 * Save user progress to localStorage
 */
function saveProgress() {
    try {
        const data = {
            starred: Array.from(state.progress.starred),
            mastered: Array.from(state.progress.mastered),
            review: Array.from(state.progress.review)
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.warn('Could not save user progress to storage:', e);
    }
    updateStatsAndCounts();
}

/**
 * Initialize Chapter Selector Options
 */
function initChapterDropdown() {
    if (!state.chapters || !elements.chapterFilter) return;
    
    // Group exercise counts by chapter
    const counts = {};
    state.allCards.forEach(c => {
        counts[c.chapter] = (counts[c.chapter] || 0) + 1;
    });

    // Clear any existing options except the first one
    while (elements.chapterFilter.options.length > 1) {
        elements.chapterFilter.remove(1);
    }

    // Populate dropdown
    Object.keys(state.chapters).sort((a, b) => Number(a) - Number(b)).forEach(chNum => {
        const title = state.chapters[chNum];
        const count = counts[chNum] || 0;
        const opt = document.createElement('option');
        opt.value = chNum;
        opt.textContent = `Ch ${chNum}: ${title} (${count})`;
        elements.chapterFilter.appendChild(opt);
    });
}

/**
 * Render Markdown + Math with KaTeX
 */
function renderMarkdownAndMath(content, targetEl) {
    if (!targetEl) return;
    if (!content) {
        targetEl.innerHTML = '<p class="empty-state">No content available.</p>';
        return;
    }

    try {
        // Parse markdown with marked if available
        if (typeof marked !== 'undefined' && marked.parse) {
            marked.setOptions({
                breaks: true,
                gfm: true
            });
            targetEl.innerHTML = marked.parse(content);
        } else {
            targetEl.textContent = content;
        }

        // Render KaTeX formulas if available
        if (typeof renderMathInElement === 'function') {
            renderMathInElement(targetEl, {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '$', right: '$', display: false },
                    { left: '\\[', right: '\\]', display: true },
                    { left: '\\(', right: '\\)', display: false }
                ],
                throwOnError: false,
                ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
            });
        }
    } catch (err) {
        console.error('Error rendering content:', err);
        targetEl.innerText = content;
    }
}

/**
 * Apply filters (chapter, search, study pill) and update filteredCards
 */
function applyFilters(preserveCurrentCard = false) {
    const currentCardId = state.filteredCards[state.currentIndex]?.id;
    
    let list = [...state.allCards];

    // 1. Chapter Filter
    if (state.selectedChapter !== 'all') {
        const chNum = parseInt(state.selectedChapter, 10);
        list = list.filter(c => c.chapter === chNum);
    }

    // 2. Search Query Filter
    if (state.searchQuery.trim()) {
        const q = state.searchQuery.toLowerCase().trim();
        list = list.filter(c => {
            return (c.question && c.question.toLowerCase().includes(q)) ||
                   (c.solution && c.solution.toLowerCase().includes(q)) ||
                   (c.chapterTitle && c.chapterTitle.toLowerCase().includes(q)) ||
                   (c.exercise && c.exercise.toLowerCase().includes(q));
        });
    }

    // 3. Study Pill Filter
    if (state.activeFilter === 'unmastered') {
        list = list.filter(c => !state.progress.mastered.has(c.id));
    } else if (state.activeFilter === 'unseen') {
        list = list.filter(c => !state.progress.mastered.has(c.id) && !state.progress.review.has(c.id));
    } else if (state.activeFilter === 'starred') {
        list = list.filter(c => state.progress.starred.has(c.id));
    } else if (state.activeFilter === 'review') {
        list = list.filter(c => state.progress.review.has(c.id));
    } else if (state.activeFilter === 'mastered') {
        list = list.filter(c => state.progress.mastered.has(c.id));
    }

    // 4. Shuffle if active
    if (state.isShuffled) {
        list.sort(() => Math.random() - 0.5);
    }

    state.filteredCards = list;

    // Maintain position or reset to 0
    if (preserveCurrentCard && currentCardId) {
        const foundIdx = state.filteredCards.findIndex(c => c.id === currentCardId);
        state.currentIndex = foundIdx >= 0 ? foundIdx : 0;
    } else {
        state.currentIndex = 0;
    }

    renderCurrentCard();
    updateStatsAndCounts();
}

/**
 * Render Current Active Flashcard
 */
function renderCurrentCard() {
    // Reset flip state smoothly
    setFlipped(false);

    if (state.filteredCards.length === 0) {
        if (elements.cardCounter) elements.cardCounter.textContent = '0 cards found';
        if (elements.progressBar) elements.progressBar.style.width = '0%';
        if (elements.frontChapterBadge) elements.frontChapterBadge.textContent = 'No Cards';
        if (elements.frontExBadge) elements.frontExBadge.textContent = '-';
        if (elements.frontStatusBadge) {
            elements.frontStatusBadge.textContent = '';
            elements.frontStatusBadge.className = 'badge status-pill';
        }
        if (elements.questionContent) {
            elements.questionContent.innerHTML = `
                <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
                    <p style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">No flashcards match your filter</p>
                    <p style="font-size: 0.9rem;">Try clearing the search or switching study pills.</p>
                </div>
            `;
        }
        if (elements.solutionContent) elements.solutionContent.innerHTML = '';
        if (elements.btnPrev) elements.btnPrev.disabled = true;
        if (elements.btnNext) elements.btnNext.disabled = true;
        if (elements.btnFlip) elements.btnFlip.disabled = true;
        return;
    }

    if (elements.btnFlip) elements.btnFlip.disabled = false;
    const card = state.filteredCards[state.currentIndex];
    const total = state.filteredCards.length;
    const currentNum = state.currentIndex + 1;

    // Update Counter & Progress
    if (elements.cardCounter) elements.cardCounter.textContent = `Exercise ${currentNum} of ${total}`;
    if (elements.progressBar) elements.progressBar.style.width = `${(currentNum / total) * 100}%`;

    // Badges
    const chTitle = card.chapterTitle || state.chapters[card.chapter] || `Chapter ${card.chapter}`;
    if (elements.frontChapterBadge) elements.frontChapterBadge.textContent = `Ch ${card.chapter}: ${chTitle}`;
    if (elements.frontExBadge) elements.frontExBadge.textContent = `Exercise ${card.exercise}`;

    if (elements.backChapterBadge) elements.backChapterBadge.textContent = `Ch ${card.chapter}: ${chTitle}`;
    if (elements.backExBadge) elements.backExBadge.textContent = `Exercise ${card.exercise}`;

    // Status Badge
    let statusText = 'Unseen';
    let statusClass = 'badge status-pill';
    if (state.progress.mastered.has(card.id)) {
        statusText = 'Mastered';
        statusClass += ' status-mastered';
    } else if (state.progress.review.has(card.id)) {
        statusText = 'Needs Review';
        statusClass += ' status-review';
    }
    if (elements.frontStatusBadge) {
        elements.frontStatusBadge.textContent = statusText;
        elements.frontStatusBadge.className = statusClass;
    }

    // Star Tool Buttons
    const isStarred = state.progress.starred.has(card.id);
    if (elements.btnStarFront) elements.btnStarFront.classList.toggle('is-starred', isStarred);
    if (elements.btnStarBack) elements.btnStarBack.classList.toggle('is-starred', isStarred);

    // Render Question & Solution
    renderMarkdownAndMath(card.question, elements.questionContent);
    renderMarkdownAndMath(card.solution, elements.solutionContent);

    // Scroll to top
    if (elements.questionContent) elements.questionContent.scrollTop = 0;
    if (elements.solutionContent) elements.solutionContent.scrollTop = 0;

    // Navigation Buttons State
    if (elements.btnPrev) elements.btnPrev.disabled = state.currentIndex === 0;
    if (elements.btnNext) elements.btnNext.disabled = state.currentIndex === total - 1;
}

/**
 * Set Card Flip State
 */
function setFlipped(flipped) {
    state.isFlipped = flipped;
    if (!elements.flashcard) return;
    if (flipped) {
        elements.flashcard.classList.add('is-flipped');
    } else {
        elements.flashcard.classList.remove('is-flipped');
    }
}

/**
 * Toggle Card Flip State
 */
function toggleFlip() {
    if (state.filteredCards.length === 0) return;
    setFlipped(!state.isFlipped);
}

/**
 * Navigate Cards
 */
function goToCard(index) {
    if (index >= 0 && index < state.filteredCards.length) {
        state.currentIndex = index;
        renderCurrentCard();
    }
}

function prevCard() {
    if (state.currentIndex > 0) {
        goToCard(state.currentIndex - 1);
    }
}

function nextCard() {
    if (state.currentIndex < state.filteredCards.length - 1) {
        goToCard(state.currentIndex + 1);
    }
}

/**
 * Update Top Stats & Pill Counts
 */
function updateStatsAndCounts() {
    const totalAll = state.allCards.length;
    const masteredAll = state.progress.mastered.size;
    const starredAll = state.progress.starred.size;

    if (elements.statTotal) elements.statTotal.textContent = totalAll;
    if (elements.statMastered) elements.statMastered.textContent = masteredAll;
    if (elements.statStarred) elements.statStarred.textContent = starredAll;

    // Determine counts in currently selected chapter
    let chapterSubset = state.allCards;
    if (state.selectedChapter !== 'all') {
        const chNum = parseInt(state.selectedChapter, 10);
        chapterSubset = state.allCards.filter(c => c.chapter === chNum);
    }

    const countAllInSubset = chapterSubset.length;
    const countMasteredInSubset = chapterSubset.filter(c => state.progress.mastered.has(c.id)).length;
    const countUnmasteredInSubset = countAllInSubset - countMasteredInSubset;
    const countStarredInSubset = chapterSubset.filter(c => state.progress.starred.has(c.id)).length;
    const countReviewInSubset = chapterSubset.filter(c => state.progress.review.has(c.id)).length;
    const countUnseenInSubset = chapterSubset.filter(c => !state.progress.mastered.has(c.id) && !state.progress.review.has(c.id)).length;

    if (elements.countAll) elements.countAll.textContent = countAllInSubset;
    if (elements.countUnmastered) elements.countUnmastered.textContent = countUnmasteredInSubset;
    if (elements.countUnseen) elements.countUnseen.textContent = countUnseenInSubset;
    if (elements.countStarred) elements.countStarred.textContent = countStarredInSubset;
    if (elements.countReview) elements.countReview.textContent = countReviewInSubset;
    if (elements.countMastered) elements.countMastered.textContent = countMasteredInSubset;
}

/**
 * Show Toast Notification
 */
let toastTimeout = null;
function showToast(message) {
    if (!elements.toast) return;
    elements.toast.textContent = message;
    elements.toast.classList.add('show');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 2200);
}

/**
 * Toggle Star / Bookmark
 */
function toggleStarCurrent() {
    const card = state.filteredCards[state.currentIndex];
    if (!card) return;

    if (state.progress.starred.has(card.id)) {
        state.progress.starred.delete(card.id);
        showToast(`Removed ⭐ from Exercise ${card.exercise}`);
    } else {
        state.progress.starred.add(card.id);
        showToast(`Starred ⭐ Exercise ${card.exercise}`);
    }
    saveProgress();
    
    const isStarred = state.progress.starred.has(card.id);
    if (elements.btnStarFront) elements.btnStarFront.classList.toggle('is-starred', isStarred);
    if (elements.btnStarBack) elements.btnStarBack.classList.toggle('is-starred', isStarred);
}

/**
 * Mark Status (Review / Mastered / Unseen)
 */
function markStatus(status) {
    const card = state.filteredCards[state.currentIndex];
    if (!card) return;

    if (status === 'mastered') {
        state.progress.mastered.add(card.id);
        state.progress.review.delete(card.id);
        showToast(`Marked Exercise ${card.exercise} as Mastered! 🎉`);
    } else if (status === 'review') {
        state.progress.review.add(card.id);
        state.progress.mastered.delete(card.id);
        showToast(`Marked Exercise ${card.exercise} for Review 🔄`);
    } else if (status === 'unseen') {
        state.progress.mastered.delete(card.id);
        state.progress.review.delete(card.id);
        showToast(`Reset Exercise ${card.exercise} to Unseen ⚪`);
    }

    saveProgress();
    renderCurrentCard();

    // If marked mastered or review, auto advance to next card after brief delay
    if (status !== 'unseen') {
        setTimeout(() => {
            if (state.currentIndex < state.filteredCards.length - 1) {
                nextCard();
            }
        }, 350);
    }
}

/**
 * Helper to trigger browser file download
 */
function downloadFile(content, fileName, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Export progress as CSV file
 */
function exportProgressCSV() {
    const headers = ['id', 'chapter', 'exercise', 'chapter_title', 'status', 'starred'];
    const rows = state.allCards.map(c => {
        let status = 'unseen';
        if (state.progress.mastered.has(c.id)) status = 'mastered';
        else if (state.progress.review.has(c.id)) status = 'review';
        const starred = state.progress.starred.has(c.id) ? 'true' : 'false';
        const titleSafe = `"${(c.chapterTitle || '').replace(/"/g, '""')}"`;
        return [c.id, c.chapter, c.exercise, titleSafe, status, starred].join(',');
    });
    
    const csvContent = [headers.join(','), ...rows].join('\r\n');
    downloadFile(csvContent, 'neuroai_progress.csv', 'text/csv;charset=utf-8;');
    showToast('Exported progress to neuroai_progress.csv! 📥');
}

/**
 * Export progress as JSON file
 */
function exportProgressJSON() {
    const exportData = {
        exportedAt: new Date().toISOString(),
        totalCards: state.allCards.length,
        mastered: Array.from(state.progress.mastered),
        review: Array.from(state.progress.review),
        starred: Array.from(state.progress.starred),
        detailed: state.allCards.map(c => ({
            id: c.id,
            chapter: c.chapter,
            exercise: c.exercise,
            status: state.progress.mastered.has(c.id) ? 'mastered' : (state.progress.review.has(c.id) ? 'review' : 'unseen'),
            starred: state.progress.starred.has(c.id)
        }))
    };
    
    const jsonContent = JSON.stringify(exportData, null, 2);
    downloadFile(jsonContent, 'neuroai_progress.json', 'application/json;charset=utf-8;');
    showToast('Exported progress to neuroai_progress.json! 📥');
}

/**
 * Parse CSV line with quotes support
 */
function parseCSVLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"' && (i === 0 || line[i - 1] !== '\\')) {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            values.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    values.push(current.trim());
    return values.map(v => v.replace(/^"|"$/g, '').replace(/""/g, '"'));
}

/**
 * Import progress from user file (.csv, .json, .txt)
 */
function importProgressFromFile(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const content = e.target.result;
            let importedMastered = 0;
            let importedReview = 0;
            let importedStarred = 0;

            const newStarred = new Set();
            const newMastered = new Set();
            const newReview = new Set();

            const cardIdMap = new Map();
            state.allCards.forEach(c => {
                cardIdMap.set(c.id, c);
                cardIdMap.set(c.exercise, c);
                cardIdMap.set(`ex-${c.chapter}-${c.exerciseNum}`, c);
            });

            // Try parsing as JSON first
            let isJSON = false;
            try {
                const parsed = JSON.parse(content);
                isJSON = true;
                
                // Case A: { mastered: [...], review: [...], starred: [...] }
                if (Array.isArray(parsed.mastered) || Array.isArray(parsed.review) || Array.isArray(parsed.starred)) {
                    (parsed.mastered || []).forEach(id => {
                        const card = cardIdMap.get(id);
                        if (card) { newMastered.add(card.id); importedMastered++; }
                    });
                    (parsed.review || []).forEach(id => {
                        const card = cardIdMap.get(id);
                        if (card) { newReview.add(card.id); importedReview++; }
                    });
                    (parsed.starred || []).forEach(id => {
                        const card = cardIdMap.get(id);
                        if (card) { newStarred.add(card.id); importedStarred++; }
                    });
                }
                // Case B: Array of objects [{ id: 'ex-1-1', status: 'mastered', starred: true }]
                else if (Array.isArray(parsed)) {
                    parsed.forEach(item => {
                        const card = cardIdMap.get(item.id) || cardIdMap.get(item.exercise);
                        if (card) {
                            if (item.status === 'mastered') { newMastered.add(card.id); importedMastered++; }
                            else if (item.status === 'review') { newReview.add(card.id); importedReview++; }
                            if (item.starred) { newStarred.add(card.id); importedStarred++; }
                        }
                    });
                }
            } catch (err) {
                isJSON = false;
            }

            // If not JSON, parse as CSV or structured Text
            if (!isJSON) {
                const lines = content.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
                if (lines.length === 0) {
                    showToast('Imported file is empty.');
                    return;
                }

                // Header check
                let headerRow = parseCSVLine(lines[0]);
                const idIdx = headerRow.findIndex(h => /^(id|exercise_id|key)$/i.test(h));
                const exIdx = headerRow.findIndex(h => /^(exercise|ex|number)$/i.test(h));
                const statusIdx = headerRow.findIndex(h => /^(status|state|mastery)$/i.test(h));
                const starredIdx = headerRow.findIndex(h => /^(starred|star|bookmark|bookmarked)$/i.test(h));

                const startLine = (idIdx >= 0 || statusIdx >= 0 || exIdx >= 0) ? 1 : 0;

                for (let i = startLine; i < lines.length; i++) {
                    const parts = parseCSVLine(lines[i]);
                    if (parts.length < 2) continue;

                    const idVal = idIdx >= 0 ? parts[idIdx] : parts[0];
                    const exVal = exIdx >= 0 ? parts[exIdx] : (parts.length > 2 ? parts[2] : '');
                    const statusVal = statusIdx >= 0 ? parts[statusIdx]?.toLowerCase() : (parts.length > 4 ? parts[4]?.toLowerCase() : parts[1]?.toLowerCase());
                    const starredVal = starredIdx >= 0 ? parts[starredIdx]?.toLowerCase() : (parts.length > 5 ? parts[5]?.toLowerCase() : '');

                    const card = cardIdMap.get(idVal) || cardIdMap.get(exVal);
                    if (card) {
                        if (statusVal === 'mastered') {
                            newMastered.add(card.id);
                            importedMastered++;
                        } else if (statusVal === 'review' || statusVal === 'needs review') {
                            newReview.add(card.id);
                            importedReview++;
                        }

                        if (starredVal === 'true' || starredVal === '1' || starredVal === 'yes' || starredVal === 'starred') {
                            newStarred.add(card.id);
                            importedStarred++;
                        }
                    }
                }
            }

            state.progress.starred = newStarred;
            state.progress.mastered = newMastered;
            state.progress.review = newReview;

            saveProgress();
            applyFilters(true);
            showToast(`Progress imported: ${importedMastered} Mastered, ${importedReview} Review, ${importedStarred} Starred! ✅`);
        } catch (err) {
            console.error('Error importing file:', err);
            showToast('Failed to import progress file. Please check file format.');
        }
    };
    reader.readAsText(file);
}

/**
 * Copy Content to Clipboard
 */
function copyCardContent(type) {
    const card = state.filteredCards[state.currentIndex];
    if (!card) return;

    const textToCopy = type === 'question' ? card.question : card.solution;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showToast(`Copied ${type} markdown to clipboard!`);
        }).catch(() => {
            showToast('Failed to copy to clipboard.');
        });
    } else {
        showToast('Clipboard not supported in this browser context.');
    }
}

/**
 * Build & Open Grid Modal
 */
function openGridModal() {
    if (!elements.gridCardsContainer || !elements.gridModal) return;
    elements.gridCardsContainer.innerHTML = '';
    
    // Group cards by chapter
    const byChapter = {};
    state.allCards.forEach(c => {
        if (!byChapter[c.chapter]) byChapter[c.chapter] = [];
        byChapter[c.chapter].push(c);
    });

    Object.keys(byChapter).sort((a, b) => Number(a) - Number(b)).forEach(chNum => {
        const cards = byChapter[chNum];
        const chTitle = state.chapters[chNum] || `Chapter ${chNum}`;
        
        const section = document.createElement('div');
        section.className = 'modal-chapter-section';
        
        const heading = document.createElement('h3');
        heading.innerHTML = `<span>Chapter ${chNum}:</span> <span>${chTitle}</span>`;
        section.appendChild(heading);

        const grid = document.createElement('div');
        grid.className = 'modal-cards-grid';

        cards.forEach(c => {
            const item = document.createElement('div');
            item.className = 'grid-exercise-item';
            
            const isCurrent = state.filteredCards[state.currentIndex]?.id === c.id;
            if (isCurrent) item.classList.add('is-active');

            let statusLabel = 'Unseen';
            if (state.progress.mastered.has(c.id)) {
                statusLabel = '✅ Mastered';
                item.classList.add('is-mastered');
            } else if (state.progress.review.has(c.id)) {
                statusLabel = '🔄 Review';
                item.classList.add('is-review');
            }
            if (state.progress.starred.has(c.id)) {
                statusLabel += ' ⭐';
            }

            item.innerHTML = `
                <span class="grid-exercise-title">Ex ${c.exercise}</span>
                <span class="grid-exercise-status">${statusLabel}</span>
            `;

            item.addEventListener('click', () => {
                if (state.selectedChapter !== 'all' && state.selectedChapter !== String(c.chapter)) {
                    state.selectedChapter = 'all';
                    if (elements.chapterFilter) elements.chapterFilter.value = 'all';
                }
                state.activeFilter = 'all';
                updatePillUI('all');
                
                applyFilters();
                const targetIdx = state.filteredCards.findIndex(fc => fc.id === c.id);
                if (targetIdx >= 0) {
                    goToCard(targetIdx);
                }
                closeGridModal();
            });

            grid.appendChild(item);
        });

        section.appendChild(grid);
        elements.gridCardsContainer.appendChild(section);
    });

    elements.gridModal.style.display = 'flex';
}

function closeGridModal() {
    if (elements.gridModal) elements.gridModal.style.display = 'none';
}

/**
 * Update Pill UI Active state
 */
function updatePillUI(filterName) {
    if (!elements.pillAll) return;
    [elements.pillAll, elements.pillUnmastered, elements.pillUnseen, elements.pillStarred, elements.pillReview, elements.pillMastered].forEach(p => {
        if (p) p.classList.toggle('active', p.dataset.filter === filterName);
    });
}

/**
 * Setup Mouse Wheel Scrolling Listener
 * Ensures mousewheel scrolls the active card face smoothly across all browsers
 */
function setupWheelScrolling() {
    if (!elements.flashcardContainer) return;
    
    elements.flashcardContainer.addEventListener('wheel', (e) => {
        const activeContent = state.isFlipped ? elements.solutionContent : elements.questionContent;
        if (!activeContent) return;

        const { scrollTop, scrollHeight, clientHeight } = activeContent;
        const maxScroll = scrollHeight - clientHeight;
        
        if (maxScroll > 0) {
            activeContent.scrollTop += e.deltaY;
            // Prevent outer page scrolling while scrolling inside the card
            e.preventDefault();
        }
    }, { passive: false });
}

/**
 * Attach All Event Listeners
 */
function initEventListeners() {
    // Card Flip Click Event
    if (elements.flashcard) {
        elements.flashcard.addEventListener('click', (e) => {
            if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input')) {
                return;
            }
            // Do not flip if user is selecting text
            const selection = window.getSelection();
            if (selection && selection.toString().length > 0) {
                return;
            }
            // If clicking inside the content text area, let user select text without flip
            if (e.target.closest('.card-body-scroll') && !e.target.closest('.flip-prompt')) {
                return;
            }
            toggleFlip();
        });
    }

    // Mousewheel scrolling handler
    setupWheelScrolling();

    // Navigation buttons
    if (elements.btnFlip) elements.btnFlip.addEventListener('click', toggleFlip);
    if (elements.btnPrev) elements.btnPrev.addEventListener('click', prevCard);
    if (elements.btnNext) elements.btnNext.addEventListener('click', nextCard);

    // Chapter filter
    if (elements.chapterFilter) {
        elements.chapterFilter.addEventListener('change', (e) => {
            state.selectedChapter = e.target.value;
            applyFilters();
        });
    }

    // Search bar
    if (elements.searchInput) {
        elements.searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value;
            if (elements.btnClearSearch) {
                elements.btnClearSearch.style.display = state.searchQuery ? 'block' : 'none';
            }
            applyFilters();
        });
    }

    if (elements.btnClearSearch) {
        elements.btnClearSearch.addEventListener('click', () => {
            if (elements.searchInput) elements.searchInput.value = '';
            state.searchQuery = '';
            elements.btnClearSearch.style.display = 'none';
            applyFilters();
        });
    }

    // Study Filter Pills
    [elements.pillAll, elements.pillUnmastered, elements.pillUnseen, elements.pillStarred, elements.pillReview, elements.pillMastered].forEach(pill => {
        if (pill) {
            pill.addEventListener('click', () => {
                const filter = pill.dataset.filter;
                state.activeFilter = filter;
                updatePillUI(filter);
                applyFilters();
            });
        }
    });

    // Shuffle & Reset Order
    if (elements.btnShuffle) {
        elements.btnShuffle.addEventListener('click', () => {
            state.isShuffled = true;
            if (elements.btnResetOrder) elements.btnResetOrder.style.display = 'inline-flex';
            applyFilters();
            showToast('Deck shuffled! 🔀');
        });
    }

    if (elements.btnResetOrder) {
        elements.btnResetOrder.addEventListener('click', () => {
            state.isShuffled = false;
            elements.btnResetOrder.style.display = 'none';
            applyFilters();
            showToast('Deck order restored 📋');
        });
    }

    // Tool buttons: Star / Bookmark
    if (elements.btnStarFront) {
        elements.btnStarFront.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleStarCurrent();
        });
    }
    if (elements.btnStarBack) {
        elements.btnStarBack.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleStarCurrent();
        });
    }

    // Tool buttons: Copy
    if (elements.btnCopyFront) {
        elements.btnCopyFront.addEventListener('click', (e) => {
            e.stopPropagation();
            copyCardContent('question');
        });
    }
    if (elements.btnCopyBack) {
        elements.btnCopyBack.addEventListener('click', (e) => {
            e.stopPropagation();
            copyCardContent('solution');
        });
    }

    // Self-Assessment buttons on back of card
    if (elements.btnMarkReview) {
        elements.btnMarkReview.addEventListener('click', (e) => {
            e.stopPropagation();
            markStatus('review');
        });
    }
    if (elements.btnMarkMastered) {
        elements.btnMarkMastered.addEventListener('click', (e) => {
            e.stopPropagation();
            markStatus('mastered');
        });
    }
    if (elements.btnMarkUnseen) {
        elements.btnMarkUnseen.addEventListener('click', (e) => {
            e.stopPropagation();
            markStatus('unseen');
        });
    }

    // Import Progress
    if (elements.btnImportProgress && elements.importFileInput) {
        elements.btnImportProgress.addEventListener('click', () => {
            elements.importFileInput.value = '';
            elements.importFileInput.click();
        });

        elements.importFileInput.addEventListener('change', (e) => {
            const file = e.target.files?.[0];
            if (file) importProgressFromFile(file);
        });
    }

    // Export Progress Dropdown & Actions
    if (elements.btnExportToggle && elements.exportMenu) {
        elements.btnExportToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = elements.exportMenu.style.display === 'flex';
            elements.exportMenu.style.display = isOpen ? 'none' : 'flex';
        });

        if (elements.btnExportCSV) {
            elements.btnExportCSV.addEventListener('click', (e) => {
                e.stopPropagation();
                elements.exportMenu.style.display = 'none';
                exportProgressCSV();
            });
        }

        if (elements.btnExportJSON) {
            elements.btnExportJSON.addEventListener('click', (e) => {
                e.stopPropagation();
                elements.exportMenu.style.display = 'none';
                exportProgressJSON();
            });
        }

        document.addEventListener('click', () => {
            if (elements.exportMenu) elements.exportMenu.style.display = 'none';
        });
    }

    // Grid Modal
    if (elements.btnOpenGrid) elements.btnOpenGrid.addEventListener('click', openGridModal);
    if (elements.btnCloseGrid) elements.btnCloseGrid.addEventListener('click', closeGridModal);
    if (elements.gridModal) {
        elements.gridModal.addEventListener('click', (e) => {
            if (e.target === elements.gridModal) closeGridModal();
        });
    }

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        if (elements.searchInput && document.activeElement === elements.searchInput) {
            if (e.key === 'Escape') {
                elements.searchInput.blur();
            }
            return;
        }

        if (e.key === 'Escape') {
            if (elements.gridModal && elements.gridModal.style.display === 'flex') {
                closeGridModal();
                return;
            }
            if (elements.exportMenu && elements.exportMenu.style.display === 'flex') {
                elements.exportMenu.style.display = 'none';
                return;
            }
        }

        if (e.key === 'ArrowRight' || e.key === 'j' || e.key === 'J') {
            nextCard();
        } else if (e.key === 'ArrowLeft' || e.key === 'k' || e.key === 'K') {
            prevCard();
        } else if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Enter') {
            e.preventDefault();
            toggleFlip();
        } else if (e.key === 'b' || e.key === 'B' || e.key === 'f' || e.key === 'F') {
            toggleStarCurrent();
        } else if (e.key === '1') {
            if (state.isFlipped) markStatus('review');
        } else if (e.key === '2') {
            if (state.isFlipped) markStatus('mastered');
        } else if (e.key === '0' || e.key === 'u' || e.key === 'U') {
            if (state.isFlipped) markStatus('unseen');
        } else if (e.key === 's' || e.key === 'S') {
            if (elements.btnShuffle) elements.btnShuffle.click();
        } else if (e.key === 'g' || e.key === 'G') {
            if (elements.gridModal && elements.gridModal.style.display === 'flex') {
                closeGridModal();
            } else {
                openGridModal();
            }
        }
    });
}

/**
 * Main Application Startup
 */
function init() {
    initDOMElements();

    const loadedCards = (typeof flashcardsData !== 'undefined') ? flashcardsData : (window.flashcardsData || []);
    const loadedChapters = (typeof chaptersData !== 'undefined') ? chaptersData : (window.chaptersData || {});

    if (!Array.isArray(loadedCards) || loadedCards.length === 0) {
        console.error('Flashcards data is missing or empty.', { loadedCards, loadedChapters });
        if (elements.questionContent) {
            elements.questionContent.innerHTML = `
                <div style="padding: 2rem; color: #f87171; text-align: center;">
                    <h3>Flashcards Data Missing</h3>
                    <p style="margin-top: 0.5rem; color: var(--text-muted);">Please verify that <code>data.js</code> is loaded properly.</p>
                </div>
            `;
        }
        return;
    }

    state.allCards = loadedCards;
    state.chapters = loadedChapters;
    
    loadProgress();
    initChapterDropdown();
    initEventListeners();
    applyFilters();
}

// Start once DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
