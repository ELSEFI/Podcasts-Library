// Common JavaScript functions for all pages

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');

    body.classList.toggle('dark-theme');

    if (body.classList.contains('dark-theme')) {
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
}

// Language change functionality
function changeLanguage(lang) {
    const body = document.body;
    const languageButton = document.getElementById('languageDropdown');

    if (lang === 'ar') {
        body.classList.add('rtl');
        body.setAttribute('dir', 'rtl');
        languageButton.innerHTML = '<i class="fas fa-globe"></i> AR';

        // Update text content to Arabic
        updateTextToArabic();
        localStorage.setItem('language', 'ar');
    } else {
        body.classList.remove('rtl');
        body.setAttribute('dir', 'ltr');
        languageButton.innerHTML = '<i class="fas fa-globe"></i> EN';

        // Update text content to English
        updateTextToEnglish();
        localStorage.setItem('language', 'en');
    }
}

// Update text to Arabic - Base function (to be customized per page)
function updateTextToArabic() {
    // Common elements
    document.querySelector('.navbar-brand span').textContent = 'مكتبة البودكاست';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    if (navLinks[0]) navLinks[0].textContent = 'الرئيسية';
    if (navLinks[1]) navLinks[1].textContent = 'ما هو البودكاست؟';
    if (navLinks[2]) navLinks[2].textContent = 'تواصل معنا';

    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const currentPlaceholder = searchInput.placeholder;
        if (currentPlaceholder.includes('Categories')) {
            searchInput.placeholder = 'البحث عن التصنيفات...';
        } else if (currentPlaceholder.includes('Technical')) {
            searchInput.placeholder = 'البحث عن بودكاست تقني...';
        } else if (currentPlaceholder.includes('Business')) {
            searchInput.placeholder = 'البحث عن بودكاست الأعمال...';
        } else {
            searchInput.placeholder = 'البحث عن بودكاست...';
        }
    }
}

// Update text to English - Base function (to be customized per page)
function updateTextToEnglish() {
    // Common elements
    document.querySelector('.navbar-brand span').textContent = 'Ur Podcasts';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    if (navLinks[0]) navLinks[0].textContent = 'Home';
    if (navLinks[1]) navLinks[1].textContent = 'What Is Podcast?';
    if (navLinks[2]) navLinks[2].textContent = 'Contact with us';

    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const currentPlaceholder = searchInput.placeholder;
        if (currentPlaceholder.includes('التصنيفات')) {
            searchInput.placeholder = 'Search For Categories..';
        } else if (currentPlaceholder.includes('تقني')) {
            searchInput.placeholder = 'Search For Technical Podcasts..';
        } else if (currentPlaceholder.includes('الأعمال')) {
            searchInput.placeholder = 'Search For Business Podcasts..';
        } else {
            searchInput.placeholder = 'Search For Podcast..';
        }
    }
}

// Page-specific Arabic translations
const pageTranslations = {
    'Technical': {
        ar: {
            title: 'البودكاستات التقنية',
            searchPlaceholder: 'البحث عن بودكاست تقني...'
        },
        en: {
            title: 'Technical Podcasts',
            searchPlaceholder: 'Search For Technical Podcasts..'
        }
    },
    'Business': {
        ar: {
            title: 'بودكاستات الأعمال',
            searchPlaceholder: 'البحث عن بودكاست الأعمال...'
        },
        en: {
            title: 'Business Podcasts',
            searchPlaceholder: 'Search For Business Podcasts..'
        }
    },
    'Categories': {
        ar: {
            title: 'التصنيفات',
            searchPlaceholder: 'البحث عن التصنيفات...'
        },
        en: {
            title: 'Categories',
            searchPlaceholder: 'Search For Categories..'
        }
    }
    // Add more page translations as needed
};

// Get page type from title or URL
function getPageType() {
    const title = document.title;
    if (title.includes('Technical')) return 'Technical';
    if (title.includes('Business')) return 'Business';
    if (title.includes('Categories') || title.includes('Library')) return 'Categories';
    return 'Default';
}

// Update page-specific content
function updatePageContent(lang) {
    const pageType = getPageType();
    const translations = pageTranslations[pageType];

    if (translations) {
        const pageTitle = document.querySelector('.headd, h1.headd');
        const searchInput = document.getElementById('searchInput');

        if (pageTitle && translations[lang]) {
            pageTitle.innerHTML = `<b>${translations[lang].title}</b>`;
        }

        if (searchInput && translations[lang]) {
            searchInput.placeholder = translations[lang].searchPlaceholder;
        }
    }
}

// Enhanced updateTextToArabic function
function updateTextToArabic() {
    // Common elements
    document.querySelector('.navbar-brand span').textContent = 'مكتبة البودكاست';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    if (navLinks[0]) navLinks[0].textContent = 'الرئيسية';
    if (navLinks[1]) navLinks[1].textContent = 'ما هو البودكاست؟';
    if (navLinks[2]) navLinks[2].textContent = 'تواصل معنا';

    // Page-specific content
    updatePageContent('ar');
}

// Enhanced updateTextToEnglish function
function updateTextToEnglish() {
    // Common elements
    document.querySelector('.navbar-brand span').textContent = 'Ur Podcasts';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    if (navLinks[0]) navLinks[0].textContent = 'Home';
    if (navLinks[1]) navLinks[1].textContent = 'What Is Podcast?';
    if (navLinks[2]) navLinks[2].textContent = 'Contact with us';

    // Page-specific content
    updatePageContent('en');
}

// Load saved preferences on page load
document.addEventListener('DOMContentLoaded', function () {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        const themeIcon = document.getElementById('themeIcon');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
    }

    // Load saved language
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'ar') {
        changeLanguage('ar');
    }

    // Initialize tooltips if Bootstrap is loaded
    if (typeof bootstrap !== 'undefined') {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
});
