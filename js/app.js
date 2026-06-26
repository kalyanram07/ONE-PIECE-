// 1. Intro Sequence Logic
const introScreen = document.getElementById('intro-screen');
const startBtn = document.getElementById('start-btn');
const texts = document.querySelectorAll('.intro-text');

let currentText = 0;

function playIntro() {
    if (currentText < texts.length) {
        texts[currentText].style.animation = 'fadeInOut 4s forwards';
        setTimeout(() => {
            currentText++;
            playIntro();
        }, 3500);
    } else {
        startBtn.style.opacity = '1';
        startBtn.style.pointerEvents = 'auto';
        startBtn.style.animation = 'fadeIn 1s forwards';
    }
}

// Start intro on load
window.addEventListener('load', () => {
    setTimeout(playIntro, 500);
});

startBtn.addEventListener('click', () => {
    introScreen.style.opacity = '0';
    introScreen.style.visibility = 'hidden';
    document.body.classList.add('started');
    
    // Play Audio (Drums of Liberation)
    const audio = document.getElementById('drumsOfLiberation');
    if (audio) {
        audio.volume = 0.6; // Set comfortable volume
        audio.play().catch(err => console.log('Audio playback prevented by browser:', err));
    }
    
    // Trigger observer for first section immediately
    window.dispatchEvent(new Event('scroll'));
});

// 2. Mouse 3D Tilt & Parallax Effect
const characterCards = document.querySelectorAll('.tilt-card');
const characterImages = document.querySelectorAll('.character-image');

document.addEventListener('mousemove', (e) => {
    if (!document.body.classList.contains('started')) return;

    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

    // Apply to visible cards
    const activeSection = document.querySelector('.character-section.is-visible');
    if (activeSection) {
        const card = activeSection.querySelector('.tilt-card');
        const img = activeSection.querySelector('.character-image');
        
        if (card) {
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        }
        if (img) {
            img.style.transform = `translateX(${xAxis * 1.5}px) translateY(${yAxis * 1.5}px)`;
        }
    }
});

// Reset transform on mouse leave
document.addEventListener('mouseleave', () => {
    characterCards.forEach(card => card.style.transform = `rotateY(0deg) rotateX(0deg)`);
    characterImages.forEach(img => img.style.transform = `translateX(0px) translateY(0px)`);
});

// Restart button
const restartBtn = document.getElementById('restart-btn');
const mainContainer = document.getElementById('main-content');
if (restartBtn && mainContainer) {
    restartBtn.addEventListener('click', () => {
        // Scroll the main content container instead of window
        mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 3. Lightweight Particle Engine
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = window.innerWidth < 768 ? 50 : 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * -1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        // Reset to bottom if they float off screen
        if (this.y < 0) {
            this.y = canvas.height;
            this.x = Math.random() * canvas.width;
        }
    }
    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Resize canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
