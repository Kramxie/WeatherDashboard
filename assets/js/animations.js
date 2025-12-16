// ===== WEATHER PARTICLE EFFECTS =====
// Creates beautiful rain, snow, and other particle effects based on weather

class WeatherParticles {
    constructor() {
        this.container = document.getElementById('weatherParticles');
        this.particles = [];
        this.animationId = null;
        this.currentWeather = null;
    }

    // Clear all existing particles
    clear() {
        if (this.container) {
            this.container.innerHTML = '';
        }
        this.particles = [];
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    // Create rain effect
    createRain(intensity = 50) {
        this.clear();
        
        for (let i = 0; i < intensity; i++) {
            const drop = document.createElement('div');
            drop.className = 'rain-drop';
            drop.style.left = `${Math.random() * 100}%`;
            drop.style.animationDuration = `${0.5 + Math.random() * 0.5}s`;
            drop.style.animationDelay = `${Math.random() * 2}s`;
            drop.style.opacity = `${0.3 + Math.random() * 0.5}`;
            this.container.appendChild(drop);
        }
    }

    // Create snow effect
    createSnow(intensity = 40) {
        this.clear();
        
        for (let i = 0; i < intensity; i++) {
            const flake = document.createElement('div');
            flake.className = 'snow-flake';
            flake.style.left = `${Math.random() * 100}%`;
            flake.style.width = `${3 + Math.random() * 8}px`;
            flake.style.height = flake.style.width;
            flake.style.animationDuration = `${3 + Math.random() * 5}s`;
            flake.style.animationDelay = `${Math.random() * 3}s`;
            flake.style.opacity = `${0.4 + Math.random() * 0.6}`;
            this.container.appendChild(flake);
        }
    }

    // Create cloud particles (floating dots)
    createClouds(intensity = 20) {
        this.clear();
        
        for (let i = 0; i < intensity; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'cloud-particle';
            cloud.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                width: ${20 + Math.random() * 40}px;
                height: ${10 + Math.random() * 20}px;
                background: rgba(255, 255, 255, ${0.1 + Math.random() * 0.2});
                border-radius: 50%;
                filter: blur(${5 + Math.random() * 10}px);
                animation: cloudFloat ${10 + Math.random() * 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            this.container.appendChild(cloud);
        }
    }

    // Create sun rays effect
    createSunRays() {
        this.clear();
        
        const sun = document.createElement('div');
        sun.className = 'sun-rays-container';
        sun.style.cssText = `
            position: absolute;
            top: 10%;
            right: 10%;
            width: 150px;
            height: 150px;
            pointer-events: none;
        `;
        
        // Create rotating rays
        for (let i = 0; i < 12; i++) {
            const ray = document.createElement('div');
            ray.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 3px;
                height: 80px;
                background: linear-gradient(transparent, rgba(255, 215, 0, 0.3), transparent);
                transform-origin: center top;
                transform: rotate(${i * 30}deg);
                animation: sunRays 20s linear infinite;
            `;
            sun.appendChild(ray);
        }
        
        // Sun core glow
        const core = document.createElement('div');
        core.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 60px;
            height: 60px;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%);
            border-radius: 50%;
            animation: pulse 3s ease-in-out infinite;
        `;
        sun.appendChild(core);
        
        this.container.appendChild(sun);
    }

    // Create lightning effect
    createLightning() {
        this.clear();
        this.createRain(70); // Heavy rain with thunderstorm
        
        // Add lightning flashes
        const lightning = document.createElement('div');
        lightning.className = 'lightning-flash';
        lightning.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            animation: lightning 4s infinite;
            pointer-events: none;
        `;
        this.container.appendChild(lightning);
    }

    // Create mist/fog effect
    createMist() {
        this.clear();
        
        for (let i = 0; i < 5; i++) {
            const mist = document.createElement('div');
            mist.style.cssText = `
                position: absolute;
                top: ${i * 20}%;
                left: -100%;
                width: 200%;
                height: 100px;
                background: linear-gradient(90deg, 
                    transparent 0%, 
                    rgba(255, 255, 255, 0.1) 20%, 
                    rgba(255, 255, 255, 0.15) 50%, 
                    rgba(255, 255, 255, 0.1) 80%, 
                    transparent 100%
                );
                animation: mistMove ${15 + i * 3}s linear infinite;
                animation-delay: ${i * 2}s;
            `;
            this.container.appendChild(mist);
        }

        // Add mist animation keyframes
        if (!document.getElementById('mistAnimation')) {
            const style = document.createElement('style');
            style.id = 'mistAnimation';
            style.textContent = `
                @keyframes mistMove {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(50%); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Update particles based on weather condition
    update(weatherCondition) {
        if (!this.container) return;
        
        this.currentWeather = weatherCondition.toLowerCase();
        
        switch (this.currentWeather) {
            case 'rain':
            case 'drizzle':
                this.createRain(60);
                break;
            case 'snow':
                this.createSnow(50);
                break;
            case 'thunderstorm':
                this.createLightning();
                break;
            case 'clouds':
                this.createClouds(15);
                break;
            case 'clear':
                this.createSunRays();
                break;
            case 'mist':
            case 'fog':
            case 'haze':
                this.createMist();
                break;
            default:
                this.clear();
        }
    }
}

// ===== UI ANIMATION HELPERS =====

// Add entrance animation to elements
function animateEntrance(element, animationType = 'fadeInUp', delay = 0) {
    if (!element) return;
    
    element.style.animation = 'none';
    element.offsetHeight; // Trigger reflow
    element.style.animation = `${animationType} 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${delay}s both`;
}

// Animate multiple elements with stagger
function animateStagger(elements, animationType = 'fadeInUp', baseDelay = 0, staggerDelay = 0.1) {
    elements.forEach((el, index) => {
        animateEntrance(el, animationType, baseDelay + (index * staggerDelay));
    });
}

// Add ripple effect on click
function addRippleEffect(element) {
    if (!element) return;
    
    element.addEventListener('click', function(e) {
        const rect = element.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${e.clientX - rect.left - size/2}px;
            top: ${e.clientY - rect.top - size/2}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
}

// Number counting animation
function animateNumber(element, start, end, duration = 1000) {
    if (!element) return;
    
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (end - start) * easeProgress);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// ===== INITIALIZE PARTICLES =====
const weatherParticles = new WeatherParticles();

// Update the original updateBackground function to also update particles
const originalUpdateBackground = window.updateBackground || function() {};

window.updateBackground = function(weatherCondition) {
    // Remove all weather classes from body
    document.body.className = document.body.classList.contains('dark-mode') ? 'dark-mode' : '';
    
    // Add the appropriate weather class
    document.body.classList.add(weatherCondition);
    
    // Update particles
    weatherParticles.update(weatherCondition);
};

// ===== ENHANCE EXISTING ELEMENTS =====
document.addEventListener('DOMContentLoaded', () => {
    // Add ripple effect to buttons
    document.querySelectorAll('.search-btn, .control-btn').forEach(addRippleEffect);
    
    // Animate existing elements
    const detailItems = document.querySelectorAll('.detail-item');
    const forecastCards = document.querySelectorAll('.forecast-card');
    const hourlyCards = document.querySelectorAll('.hourly-card');
    
    // These will animate when weather data loads
    console.log('🎨 Weather animations initialized!');
});

// Export for use in other scripts
window.weatherParticles = weatherParticles;
window.animateEntrance = animateEntrance;
window.animateStagger = animateStagger;
window.addRippleEffect = addRippleEffect;
window.animateNumber = animateNumber;
