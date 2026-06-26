const sections = document.querySelectorAll('.character-section');
const navItems = document.querySelectorAll('#crew-list li');
const progressFill = document.getElementById('progress-fill');
const shipIndicator = document.getElementById('ship-indicator');

// Background Layers for crossfading
const bgLayer1 = document.getElementById('bg-layer-1');
const bgLayer2 = document.getElementById('bg-layer-2');
let activeBgLayer = 1;

// Helper to set theme colors (updates CSS variables)
function updateTheme(color) {
    if(color) {
        document.documentElement.style.setProperty('--theme-color', color);
    }
}

// Background Swapper
function swapBackground(imgUrl, themeColor) {
    const nextLayer = activeBgLayer === 1 ? bgLayer2 : bgLayer1;
    const currentLayer = activeBgLayer === 1 ? bgLayer1 : bgLayer2;

    nextLayer.style.backgroundImage = `url('${imgUrl}')`;
    nextLayer.classList.add('active');
    currentLayer.classList.remove('active');

    activeBgLayer = activeBgLayer === 1 ? 2 : 1;
    
    updateTheme(themeColor);
}

// Observer Options
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Trigger when 50% is visible
};

// Intersection Observer
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add visible class to trigger CSS animations (bars filling, card sliding)
            entry.target.classList.add('is-visible');

            // 1. Swap Background
            const bgImg = entry.target.getAttribute('data-bg');
            const themeColor = entry.target.getAttribute('data-theme');
            if (bgImg) {
                swapBackground(bgImg, themeColor);
            }

            // 2. Update Navigation Active State
            const targetId = entry.target.id;
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('data-target') === targetId) {
                    item.classList.add('active');
                }
            });

        } else {
            // Optional: remove visible class if you want animations to re-trigger on scroll up
            // entry.target.classList.remove('is-visible');
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    sectionObserver.observe(section);
});

// Scroll Progress Tracker
const mainContent = document.getElementById('main-content');

mainContent.addEventListener('scroll', () => {
    const totalScroll = mainContent.scrollHeight - mainContent.clientHeight;
    const currentScroll = mainContent.scrollTop;
    
    // Calculate percentage 0 to 100
    let scrollPercentage = (currentScroll / totalScroll) * 100;
    
    // Update progress bar
    progressFill.style.height = `${scrollPercentage}%`;
    shipIndicator.style.top = `${scrollPercentage}%`;
});

// Click navigation
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const targetId = item.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
