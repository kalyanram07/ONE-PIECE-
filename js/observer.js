// Observer pattern for scroll interactions
const mainContent = document.getElementById('main-content');
const sections = document.querySelectorAll('.character-section');
const navItems = document.querySelectorAll('#crew-list li');
const progressFill = document.getElementById('progress-fill');
const shipIndicator = document.getElementById('ship-indicator');

// Background Layers for crossfading
const bgLayer1 = document.getElementById('bg-layer-1');
const bgLayer2 = document.getElementById('bg-layer-2');
let activeBgLayer = 1;

// Helper to set theme colors
function updateTheme(color) {
    if(color) {
        document.documentElement.style.setProperty('--theme-color', color);
    }
}

// Background Swapper
function swapBackground(imgUrl, themeColor) {
    if (!imgUrl) return;
    
    const nextLayer = activeBgLayer === 1 ? bgLayer2 : bgLayer1;
    const currentLayer = activeBgLayer === 1 ? bgLayer1 : bgLayer2;

    nextLayer.style.backgroundImage = `url('${imgUrl}')`;
    nextLayer.classList.add('active');
    currentLayer.classList.remove('active');

    activeBgLayer = activeBgLayer === 1 ? 2 : 1;
    updateTheme(themeColor);
}

// Intersection Observer specifically targeting the scrolling container
const observerOptions = {
    root: mainContent, // VERY IMPORTANT: target the container that actually scrolls
    rootMargin: '0px',
    threshold: 0.5 // Trigger when 50% is visible
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');

            // Swap Background
            const bgImg = entry.target.getAttribute('data-bg');
            const themeColor = entry.target.getAttribute('data-theme');
            if (bgImg) {
                swapBackground(bgImg, themeColor);
            }

            // Update Navigation
            const targetId = entry.target.id;
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('data-target') === targetId) {
                    item.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

// Initialize observer on all sections
sections.forEach(section => {
    sectionObserver.observe(section);
});

// Scroll Progress Tracker for the ship on the Grand Line
if (mainContent) {
    mainContent.addEventListener('scroll', () => {
        // Calculate total scrollable distance
        const totalScroll = mainContent.scrollHeight - mainContent.clientHeight;
        const currentScroll = mainContent.scrollTop;
        
        let scrollPercentage = (currentScroll / totalScroll) * 100;
        
        // Update progress bar UI
        if (progressFill) progressFill.style.height = `${scrollPercentage}%`;
        if (shipIndicator) shipIndicator.style.top = `${scrollPercentage}%`;
    });
}

// Click navigation
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const targetId = item.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        
        if (targetSection && mainContent) {
            // Calculate position manually to scroll inside mainContent
            const targetTop = targetSection.offsetTop;
            mainContent.scrollTo({
                top: targetTop,
                behavior: 'smooth'
            });
        }
    });
});
