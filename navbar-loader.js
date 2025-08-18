// Navbar loader and functionality
document.addEventListener('DOMContentLoaded', function () {
    // Load navbar
    loadNavbar();

    // Set active page after navbar is loaded
    setTimeout(() => {
        setActivePage();
    }, 100);
});

function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            // Insert navbar at the beginning of body
            document.body.insertAdjacentHTML('afterbegin', data);

            // Initialize navbar functionality after loading
            initializeNavbarFunctionality();
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
        });
}

function setActivePage() {
    // Get current page name
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Remove active class from all links
    document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
        link.classList.remove('active');
    });

    // Set active class based on current page
    if (currentPage === 'index.html' || currentPage === '') {
        const homeLink = document.getElementById('home-link');
        if (homeLink) homeLink.classList.add('active');
    } else {
        // Map page names to link IDs
        const pageMapping = {
            'Business.html': 'business-link',
            'Technical.html': 'technical-link',
            'Science.html': 'science-link',
            'Social.html': 'social-link',
            'Education and culture.html': 'education-link',
            'Self-development.html': 'self-development-link',
            'sports.html': 'sports-link',
            'News & Media.html': 'news-link',
            'Health & Wellness.html': 'health-link',
            'Art & Entertainment.html': 'art-link',
            'Personal.html': 'personal-link',
            'General.html': 'general-link'
        };

        const linkId = pageMapping[currentPage];
        if (linkId) {
            const activeLink = document.getElementById(linkId);
            if (activeLink) activeLink.classList.add('active');
        }
    }
}

function initializeNavbarFunctionality() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    if (themeToggle && themeIcon) {
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        applyTheme(savedTheme);

        themeToggle.addEventListener('click', function () {
            const currentTheme = document.body.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Language toggle functionality
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', function () {
            const currentLang = document.documentElement.lang || 'en';
            const newLang = currentLang === 'en' ? 'ar' : 'en';
            document.documentElement.lang = newLang;
            localStorage.setItem('language', newLang);

            // You can add more language switching logic here
            console.log('Language switched to:', newLang);
        });
    }

    // Modern Inline Search functionality
    const searchToggleBtn = document.getElementById('searchToggleBtn');
    const searchInputInline = document.getElementById('searchInputInline');

    if (searchToggleBtn && searchInputInline) {
        let isSearchExpanded = false;

        searchToggleBtn.addEventListener('click', function () {
            if (!isSearchExpanded) {
                // Expand search
                searchInputInline.style.display = 'block';
                setTimeout(() => {
                    searchInputInline.classList.add('expanded');
                    searchInputInline.focus();
                }, 10);
                searchToggleBtn.innerHTML = '<i class="fas fa-times"></i>';
                isSearchExpanded = true;
            } else {
                // Collapse search
                collapseSearch();
            }
        });

        searchInputInline.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                performInlineSearch();
            }
        });

        searchInputInline.addEventListener('input', function () {
            // Real-time search as user types
            if (this.value.trim()) {
                performInlineSearch();
            } else {
                clearSearchHighlights();
            }
        });

        // Close search when clicking outside
        document.addEventListener('click', function (e) {
            if (isSearchExpanded && !searchToggleBtn.contains(e.target) && !searchInputInline.contains(e.target)) {
                collapseSearch();
            }
        });

        function collapseSearch() {
            searchInputInline.classList.remove('expanded');
            setTimeout(() => {
                searchInputInline.style.display = 'none';
                searchInputInline.value = '';
                clearSearchHighlights();
            }, 400);
            searchToggleBtn.innerHTML = '<i class="fas fa-search"></i>';
            isSearchExpanded = false;
        }
    }
}

function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    const themeIcon = document.getElementById('themeIcon');

    if (themeIcon) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            document.body.classList.add('dark-theme');
        } else {
            themeIcon.className = 'fas fa-moon';
            document.body.classList.remove('dark-theme');
        }
    }
}

function performInlineSearch() {
    const searchInputInline = document.getElementById('searchInputInline');
    if (searchInputInline) {
        const searchTerm = searchInputInline.value.trim();
        if (searchTerm) {
            console.log('Searching for:', searchTerm);
            // Filter and highlight podcast items
            filterAndHighlightPodcasts(searchTerm);
        }
    }
}

function filterAndHighlightPodcasts(searchTerm) {
    const podcastItems = document.querySelectorAll('.photos, .podcast-item');
    const searchTermLower = searchTerm.toLowerCase();
    let foundItems = 0;

    // Clear previous highlights
    clearSearchHighlights();

    podcastItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        const isVisible = text.includes(searchTermLower);

        if (isVisible) {
            foundItems++;
            item.style.display = 'block';
            // Highlight matching text
            highlightText(item, searchTerm);
            // Add a subtle glow effect
            item.style.boxShadow = '0 0 15px rgba(0, 123, 255, 0.5)';
            item.style.transform = 'scale(1.02)';
            item.style.transition = 'all 0.3s ease';
        } else {
            item.style.display = 'none';
        }
    });

    // Show search results count
    showSearchResultsCount(foundItems, searchTerm);
}

function highlightText(element, searchTerm) {
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    const textNodes = [];
    let node;

    while (node = walker.nextNode()) {
        textNodes.push(node);
    }

    textNodes.forEach(textNode => {
        const text = textNode.textContent;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        if (regex.test(text)) {
            const highlightedText = text.replace(regex, '<span class="search-highlight">$1</span>');
            const span = document.createElement('span');
            span.innerHTML = highlightedText;
            textNode.parentNode.replaceChild(span, textNode);
        }
    });
}

function clearSearchHighlights() {
    // Remove all highlights
    const highlights = document.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        parent.normalize();
    });

    // Reset all podcast items
    const podcastItems = document.querySelectorAll('.photos, .podcast-item');
    podcastItems.forEach(item => {
        item.style.display = 'block';
        item.style.boxShadow = '';
        item.style.transform = '';
    });

    // Hide search results count
    hideSearchResultsCount();
}

function showSearchResultsCount(count, searchTerm) {
    // Remove existing count if any
    hideSearchResultsCount();

    // Create search results indicator
    const resultsDiv = document.createElement('div');
    resultsDiv.id = 'searchResultsCount';
    resultsDiv.className = 'alert alert-info mt-3';
    resultsDiv.innerHTML = `
        <i class="fas fa-search me-2"></i>
        Found ${count} result${count !== 1 ? 's' : ''} for "${searchTerm}"
        <button type="button" class="btn-close float-end" onclick="clearSearchAndCollapse()"></button>
    `;

    // Insert after main heading
    const mainHeading = document.querySelector('.headd');
    if (mainHeading) {
        mainHeading.parentNode.insertBefore(resultsDiv, mainHeading.nextSibling);
    }
}

function hideSearchResultsCount() {
    const existing = document.getElementById('searchResultsCount');
    if (existing) {
        existing.remove();
    }
}

function clearSearchAndCollapse() {
    clearSearchHighlights();
    const searchInputInline = document.getElementById('searchInputInline');
    const searchToggleBtn = document.getElementById('searchToggleBtn');

    if (searchInputInline && searchToggleBtn) {
        searchInputInline.classList.remove('expanded');
        setTimeout(() => {
            searchInputInline.style.display = 'none';
            searchInputInline.value = '';
        }, 400);
        searchToggleBtn.innerHTML = '<i class="fas fa-search"></i>';
    }
}

// Filter functionality for podcast categories
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const podcastCards = document.querySelectorAll('.podcast-card');

    if (filterButtons.length === 0) return; // Not a category page

    filterButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // Show/hide podcast cards based on filter
            podcastCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.3s ease';
                } else {
                    card.style.display = 'none';
                }
            });

            // Update results count
            updateResultsCount();
        });
    });

    // Initial count
    updateResultsCount();
}

function updateResultsCount() {
    const visibleCards = document.querySelectorAll('.podcast-card[style*="block"], .podcast-card:not([style*="none"])');
    const resultsCount = document.getElementById('results-count');

    if (resultsCount) {
        resultsCount.textContent = visibleCards.length;
    }
}

// Initialize filters when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeFilters();
});
