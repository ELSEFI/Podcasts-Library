// Language Manager - Powerful translation system
// language-manager.js

class LanguageManager {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = window.translations || {};
        this.observers = [];
        // Don't auto-initialize, wait for manual call
    }

    init() {
        // Wait for navbar to be loaded first
        if (document.getElementById('languageToggle')) {
            this.initializeTranslationSystem();
        } else {
            // Wait for navbar to load
            setTimeout(() => {
                this.init();
            }, 100);
        }
    }

    initializeTranslationSystem() {
        // Load saved language
        const savedLang = localStorage.getItem('language') || 'en';
        this.setLanguage(savedLang, false);

        // Initialize language toggle
        this.initLanguageToggle();

        // Observe DOM changes for dynamic content
        this.observeDOM();

        console.log('Language system initialized successfully');
    }

    initLanguageToggle() {
        const languageToggle = document.getElementById('languageToggle');
        if (languageToggle) {
            console.log('Language toggle found, adding event listener');
            languageToggle.addEventListener('click', () => {
                const newLang = this.currentLanguage === 'en' ? 'ar' : 'en';
                console.log(`Switching language from ${this.currentLanguage} to ${newLang}`);
                this.setLanguage(newLang);
            });
        } else {
            console.error('Language toggle button not found!');
        }
    }

    setLanguage(lang, save = true) {
        console.log(`Setting language to: ${lang}`);

        if (!this.translations[lang]) {
            console.warn(`Language ${lang} not found`);
            return;
        }

        this.currentLanguage = lang;

        // Update HTML attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

        // Update body classes
        document.body.classList.toggle('rtl', lang === 'ar');
        document.body.classList.toggle('ltr', lang === 'en');

        console.log(`Language attributes updated: lang=${lang}, dir=${document.documentElement.dir}`);

        // Translate all content
        this.translatePage();

        // Update language toggle button
        this.updateLanguageToggle();

        // Save to localStorage
        if (save) {
            localStorage.setItem('language', lang);
        }

        // Notify observers
        this.notifyObservers(lang);

        console.log(`Language successfully changed to: ${lang}`);
    }

    translatePage() {
        console.log('Starting page translation...');

        // Translate elements with data-translate attribute
        this.translateElements();

        // Translate placeholders
        this.translatePlaceholders();

        // Translate select options
        this.translateSelectOptions();

        // Translate specific sections
        this.translateHeroSection();
        this.translateCategoriesSection();
        this.translateWhatIsPodcastSection();
        this.translateStatsSection();

        console.log('Page translation completed');
    }

    translateElements() {
        const elements = document.querySelectorAll('[data-translate]');
        console.log(`Found ${elements.length} elements with data-translate attribute`);

        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getTranslation(key);

            if (translation) {
                if (element.placeholder !== undefined) {
                    element.placeholder = translation;
                    console.log(`Translated placeholder for ${key}: ${translation}`);
                } else {
                    // Preserve HTML structure while updating text
                    const children = Array.from(element.children);
                    element.textContent = translation;
                    children.forEach(child => element.appendChild(child));
                    console.log(`Translated text for ${key}: ${translation}`);
                }
            } else {
                console.warn(`No translation found for key: ${key}`);
            }
        });
    }

    translatePlaceholders() {
        const inputs = document.querySelectorAll('input[data-translate-placeholder], textarea[data-translate-placeholder]');
        inputs.forEach(input => {
            const key = input.getAttribute('data-translate-placeholder');
            const translation = this.getTranslation(key);
            if (translation) {
                input.placeholder = translation;
            }
        });
    }

    translateSelectOptions() {
        // Contact form subject options
        const subjectSelect = document.getElementById('subject');
        if (subjectSelect) {
            const options = subjectSelect.querySelectorAll('option[value]');
            options.forEach(option => {
                const value = option.value;
                let translationKey = '';

                switch (value) {
                    case 'general':
                        translationKey = 'generalInquiry';
                        break;
                    case 'podcast-submission':
                        translationKey = 'podcastSubmission';
                        break;
                    case 'technical-support':
                        translationKey = 'technicalSupport';
                        break;
                    case 'partnership':
                        translationKey = 'partnership';
                        break;
                    case 'feedback':
                        translationKey = 'feedback';
                        break;
                }

                if (translationKey) {
                    const translation = this.getTranslation(translationKey);
                    if (translation) {
                        option.textContent = translation;
                    }
                }
            });
        }
    }

    translateHeroSection() {
        // Hero title
        const heroTitle = document.querySelector('.hero-section h1, .hero-section .display-2, .hero-section .display-3');
        if (heroTitle && !heroTitle.hasAttribute('data-translate')) {
            heroTitle.textContent = this.getTranslation('heroTitle');
        }

        // Hero description
        const heroDesc = document.querySelector('.hero-section p:not(.lead)');
        if (heroDesc && !heroDesc.hasAttribute('data-translate')) {
            heroDesc.textContent = this.getTranslation('heroDescription');
        }

        // Hero buttons
        const exploreBtn = document.querySelector('.hero-section .btn span');
        if (exploreBtn && !exploreBtn.hasAttribute('data-translate')) {
            exploreBtn.textContent = this.getTranslation('exploreNow');
        }
    }

    translateCategoriesSection() {
        // Section title
        const categoriesTitle = document.querySelector('#categories h2, .categories-section h2');
        if (categoriesTitle && !categoriesTitle.hasAttribute('data-translate')) {
            categoriesTitle.textContent = this.getTranslation('browseCategoriesTitle');
        }

        // Section subtitle
        const categoriesSubtitle = document.querySelector('#categories .lead, .categories-section .lead');
        if (categoriesSubtitle && !categoriesSubtitle.hasAttribute('data-translate')) {
            categoriesSubtitle.textContent = this.getTranslation('browseCategoriesSubtitle');
        }

        // Category cards
        this.translateCategoryCards();
    }

    translateCategoryCards() {
        const categoryMapping = {
            'business': { title: 'business', desc: 'businessDesc' },
            'technical': { title: 'technical', desc: 'technicalDesc' },
            'science': { title: 'science', desc: 'scienceDesc' },
            'social': { title: 'social', desc: 'socialDesc' },
            'education': { title: 'education', desc: 'educationDesc' },
            'self-development': { title: 'selfDevelopment', desc: 'selfDevelopmentDesc' },
            'sports': { title: 'sports', desc: 'sportsDesc' },
            'news': { title: 'news', desc: 'newsDesc' },
            'health': { title: 'health', desc: 'healthDesc' },
            'art': { title: 'art', desc: 'artDesc' },
            'personal': { title: 'personal', desc: 'personalDesc' },
            'general': { title: 'general', desc: 'generalDesc' }
        };

        // Find category cards by various selectors
        const categoryCards = document.querySelectorAll('.category-item, .category-card, .card');

        categoryCards.forEach(card => {
            // Try to identify category by href, class, or data attribute
            let categoryType = this.identifyCategory(card);

            if (categoryType && categoryMapping[categoryType]) {
                const mapping = categoryMapping[categoryType];

                // Translate title
                const title = card.querySelector('.card-title, h3, h4, h5, .category-title');
                if (title && !title.hasAttribute('data-translate')) {
                    title.textContent = this.getTranslation(mapping.title);
                }

                // Translate description
                const desc = card.querySelector('.card-text, .category-description, p');
                if (desc && !desc.hasAttribute('data-translate')) {
                    desc.textContent = this.getTranslation(mapping.desc);
                }
            }
        });
    }

    identifyCategory(card) {
        // Try to identify category from various attributes
        const link = card.querySelector('a');
        if (link) {
            const href = link.getAttribute('href');
            if (href) {
                if (href.includes('Business')) return 'business';
                if (href.includes('Technical')) return 'technical';
                if (href.includes('Science')) return 'science';
                if (href.includes('Social')) return 'social';
                if (href.includes('Education')) return 'education';
                if (href.includes('Self-development')) return 'self-development';
                if (href.includes('sports')) return 'sports';
                if (href.includes('News')) return 'news';
                if (href.includes('Health')) return 'health';
                if (href.includes('Art')) return 'art';
                if (href.includes('Personal')) return 'personal';
                if (href.includes('General')) return 'general';
            }
        }

        // Check card text content
        const cardText = card.textContent.toLowerCase();
        if (cardText.includes('business') || cardText.includes('أعمال')) return 'business';
        if (cardText.includes('technical') || cardText.includes('تقني')) return 'technical';
        if (cardText.includes('science') || cardText.includes('علوم')) return 'science';
        if (cardText.includes('social') || cardText.includes('اجتماعي')) return 'social';
        if (cardText.includes('education') || cardText.includes('تعليم')) return 'education';
        if (cardText.includes('development') || cardText.includes('تطوير')) return 'self-development';
        if (cardText.includes('sports') || cardText.includes('رياضة')) return 'sports';
        if (cardText.includes('news') || cardText.includes('أخبار')) return 'news';
        if (cardText.includes('health') || cardText.includes('صحة')) return 'health';
        if (cardText.includes('art') || cardText.includes('فن')) return 'art';
        if (cardText.includes('personal') || cardText.includes('شخصي')) return 'personal';
        if (cardText.includes('general') || cardText.includes('عام')) return 'general';

        return null;
    }

    translateWhatIsPodcastSection() {
        // Section title
        const whatIsTitle = document.querySelector('#what-is-podcast h2, .what-is-podcast h2');
        if (whatIsTitle && !whatIsTitle.hasAttribute('data-translate')) {
            whatIsTitle.textContent = this.getTranslation('whatIsPodcastTitle');
        }

        // Podcast definition
        const definition = document.querySelector('#what-is-podcast p:not(.lead), .what-is-podcast p:not(.lead)');
        if (definition && !definition.hasAttribute('data-translate')) {
            definition.textContent = this.getTranslation('podcastDefinition');
        }
    }

    translateStatsSection() {
        // Find stats by looking for numbers or common stat indicators
        const statElements = document.querySelectorAll('.stat-item, .counter-item, .stats-card');

        statElements.forEach((stat, index) => {
            const textElement = stat.querySelector('h3, h4, h5, .stat-label, .counter-label');
            if (textElement && !textElement.hasAttribute('data-translate')) {
                const statKeys = ['totalPodcasts', 'categories', 'activeUsers', 'hoursListened'];
                if (statKeys[index]) {
                    textElement.textContent = this.getTranslation(statKeys[index]);
                }
            }
        });
    }

    updateLanguageToggle() {
        const languageToggle = document.getElementById('languageToggle');
        if (languageToggle) {
            if (this.currentLanguage === 'ar') {
                languageToggle.innerHTML = '<span class="me-1">العربية</span><i class="fas fa-globe"></i>';
                languageToggle.title = 'Switch to English';
            } else {
                languageToggle.innerHTML = '<span class="me-1">English</span><i class="fas fa-globe"></i>';
                languageToggle.title = 'التبديل إلى العربية';
            }
        }
    }

    getTranslation(key) {
        return this.translations[this.currentLanguage]?.[key] || key;
    }

    // Observer pattern for other components to listen to language changes
    addObserver(callback) {
        this.observers.push(callback);
    }

    removeObserver(callback) {
        const index = this.observers.indexOf(callback);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    notifyObservers(lang) {
        this.observers.forEach(callback => callback(lang));
    }

    // DOM observer to handle dynamically added content
    observeDOM() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            this.translateNewElements(node);
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    translateNewElements(element) {
        // Translate any new elements with data-translate attributes
        const translatableElements = element.querySelectorAll('[data-translate]');
        translatableElements.forEach(el => {
            const key = el.getAttribute('data-translate');
            const translation = this.getTranslation(key);
            if (translation) {
                if (el.placeholder !== undefined) {
                    el.placeholder = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });
    }

    // Public method to get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Public method to check if RTL
    isRTL() {
        return this.currentLanguage === 'ar';
    }
}

// Initialize language manager when DOM is loaded, but don't auto-start
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
    // Don't auto-initialize, let navbar-loader do it
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageManager;
} else {
    window.LanguageManager = LanguageManager;
}
