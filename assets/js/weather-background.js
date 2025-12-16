// ===== DYNAMIC WEATHER BACKGROUND SYSTEM =====
// Creates realistic animated weather backgrounds based on actual weather conditions
// Senior Dev Implementation - Clean, Modular, Performant

class WeatherBackground {
    constructor() {
        this.container = null;
        this.currentWeather = null;
        this.particles = [];
        this.animationFrameId = null;
        this.init();
    }

    init() {
        // Create the background container
        this.container = document.createElement('div');
        this.container.id = 'weatherBackground';
        this.container.className = 'weather-bg';
        document.body.insertBefore(this.container, document.body.firstChild);
        console.log('🌤️ Weather Background System initialized');
    }

    // Clear all existing weather effects
    clear() {
        if (this.container) {
            this.container.innerHTML = '';
        }
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    // ===== RAIN EFFECT =====
    createRain(intensity = 'normal') {
        const rainContainer = document.createElement('div');
        rainContainer.className = 'rain-container';
        
        // Adjust number of drops based on intensity
        const dropCount = intensity === 'heavy' ? 150 : intensity === 'light' ? 40 : 80;
        
        for (let i = 0; i < dropCount; i++) {
            const drop = document.createElement('div');
            drop.className = 'rain';
            
            // Random positioning and timing
            drop.style.left = `${Math.random() * 100}%`;
            drop.style.animationDuration = `${0.5 + Math.random() * 0.3}s`;
            drop.style.animationDelay = `${Math.random() * 2}s`;
            drop.style.opacity = `${0.4 + Math.random() * 0.4}`;
            
            // Vary the height for depth effect
            const height = 50 + Math.random() * 50;
            drop.style.height = `${height}px`;
            
            rainContainer.appendChild(drop);
        }
        
        // Add splash effects at bottom
        for (let i = 0; i < 20; i++) {
            const splash = document.createElement('div');
            splash.className = 'rain-splash';
            splash.style.left = `${Math.random() * 100}%`;
            splash.style.animationDelay = `${Math.random() * 2}s`;
            rainContainer.appendChild(splash);
        }
        
        this.container.appendChild(rainContainer);
    }

    // ===== SNOW EFFECT =====
    createSnow(intensity = 'normal') {
        const snowContainer = document.createElement('div');
        snowContainer.className = 'snow-container';
        
        const flakeCount = intensity === 'heavy' ? 100 : intensity === 'light' ? 30 : 60;
        const snowflakes = ['❄', '❅', '❆', '•', '◦'];
        
        for (let i = 0; i < flakeCount; i++) {
            const flake = document.createElement('div');
            flake.className = 'snowflake';
            flake.innerHTML = snowflakes[Math.floor(Math.random() * snowflakes.length)];
            
            // Random positioning and timing
            flake.style.left = `${Math.random() * 100}%`;
            flake.style.fontSize = `${0.5 + Math.random() * 1.5}rem`;
            flake.style.animationDuration = `${5 + Math.random() * 10}s`;
            flake.style.animationDelay = `${Math.random() * 5}s`;
            flake.style.opacity = `${0.5 + Math.random() * 0.5}`;
            
            snowContainer.appendChild(flake);
        }
        
        this.container.appendChild(snowContainer);
    }

    // ===== SUNNY EFFECT =====
    createSunny() {
        const sunnyContainer = document.createElement('div');
        sunnyContainer.className = 'sunny-container';
        
        // Create the sun
        const sun = document.createElement('div');
        sun.className = 'sun';
        sunnyContainer.appendChild(sun);
        
        // Create sun rays
        const raysContainer = document.createElement('div');
        raysContainer.className = 'sun-rays';
        
        for (let i = 0; i < 12; i++) {
            const ray = document.createElement('div');
            ray.className = 'ray';
            ray.style.transform = `rotate(${i * 30}deg)`;
            ray.style.animationDelay = `${i * 0.1}s`;
            raysContainer.appendChild(ray);
        }
        sunnyContainer.appendChild(raysContainer);
        
        // Create floating light particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'light-particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${8 + Math.random() * 8}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.width = `${4 + Math.random() * 6}px`;
            particle.style.height = particle.style.width;
            sunnyContainer.appendChild(particle);
        }
        
        this.container.appendChild(sunnyContainer);
    }

    // ===== CLOUDY EFFECT =====
    createClouds(isDark = false) {
        const cloudsContainer = document.createElement('div');
        cloudsContainer.className = 'clouds-container';
        
        // Create multiple clouds at different positions
        const cloudCount = 8;
        
        for (let i = 0; i < cloudCount; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'cloud';
            
            // Random size
            const width = 100 + Math.random() * 200;
            const height = 40 + Math.random() * 60;
            
            cloud.style.width = `${width}px`;
            cloud.style.height = `${height}px`;
            cloud.style.top = `${5 + Math.random() * 40}%`;
            cloud.style.animationDuration = `${30 + Math.random() * 40}s`;
            cloud.style.animationDelay = `${-Math.random() * 30}s`;
            
            // Darker clouds for overcast/storm
            if (isDark) {
                cloud.style.background = `rgba(80, 80, 90, ${0.6 + Math.random() * 0.3})`;
            } else {
                cloud.style.background = `rgba(255, 255, 255, ${0.7 + Math.random() * 0.3})`;
            }
            
            // Add cloud puffs (before and after pseudo-elements simulated)
            const puff1 = document.createElement('div');
            puff1.style.cssText = `
                position: absolute;
                width: ${width * 0.5}px;
                height: ${height * 1.2}px;
                background: inherit;
                border-radius: 50%;
                top: -${height * 0.4}px;
                left: ${width * 0.15}px;
            `;
            cloud.appendChild(puff1);
            
            const puff2 = document.createElement('div');
            puff2.style.cssText = `
                position: absolute;
                width: ${width * 0.4}px;
                height: ${height * 0.9}px;
                background: inherit;
                border-radius: 50%;
                top: -${height * 0.25}px;
                left: ${width * 0.55}px;
            `;
            cloud.appendChild(puff2);
            
            cloudsContainer.appendChild(cloud);
        }
        
        this.container.appendChild(cloudsContainer);
    }

    // ===== THUNDERSTORM EFFECT =====
    createThunderstorm() {
        const stormContainer = document.createElement('div');
        stormContainer.className = 'storm-container';
        
        // Add dark clouds first
        this.createClouds(true);
        
        // Add heavy rain
        this.createRain('heavy');
        
        // Lightning flash overlay
        const lightning = document.createElement('div');
        lightning.className = 'lightning';
        stormContainer.appendChild(lightning);
        
        // Lightning bolts at random positions
        for (let i = 0; i < 3; i++) {
            const bolt = document.createElement('div');
            bolt.className = 'lightning-bolt';
            bolt.style.left = `${20 + Math.random() * 60}%`;
            bolt.style.animationDelay = `${i * 1.7}s`;
            stormContainer.appendChild(bolt);
        }
        
        this.container.appendChild(stormContainer);
    }

    // ===== MIST/FOG EFFECT =====
    createMist() {
        const mistContainer = document.createElement('div');
        mistContainer.className = 'mist-container';
        
        // Create multiple mist layers moving at different speeds
        for (let i = 0; i < 4; i++) {
            const mistLayer = document.createElement('div');
            mistLayer.className = 'mist-layer';
            mistLayer.style.top = `${i * 25}%`;
            mistLayer.style.animationDuration = `${20 + i * 10}s`;
            mistLayer.style.opacity = `${0.15 + Math.random() * 0.15}`;
            mistContainer.appendChild(mistLayer);
        }
        
        this.container.appendChild(mistContainer);
    }

    // ===== DRIZZLE EFFECT =====
    createDrizzle() {
        const drizzleContainer = document.createElement('div');
        drizzleContainer.className = 'rain-container';
        
        // Light drizzle - smaller, slower drops
        for (let i = 0; i < 50; i++) {
            const drop = document.createElement('div');
            drop.className = 'drizzle';
            drop.style.left = `${Math.random() * 100}%`;
            drop.style.animationDuration = `${1 + Math.random() * 0.5}s`;
            drop.style.animationDelay = `${Math.random() * 3}s`;
            drop.style.opacity = `${0.3 + Math.random() * 0.3}`;
            drizzleContainer.appendChild(drop);
        }
        
        // Add some clouds too
        this.createClouds(false);
        
        this.container.appendChild(drizzleContainer);
    }

    // ===== HAZE EFFECT =====
    createHaze() {
        const hazeContainer = document.createElement('div');
        hazeContainer.className = 'haze-container';
        
        // Floating haze particles
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'haze-particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${10 + Math.random() * 10}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.width = `${80 + Math.random() * 120}px`;
            particle.style.height = particle.style.width;
            hazeContainer.appendChild(particle);
        }
        
        this.container.appendChild(hazeContainer);
    }

    // ===== MAIN UPDATE METHOD =====
    // Call this when weather data is received
    update(weatherCondition, weatherId = null) {
        this.clear();
        this.currentWeather = weatherCondition.toLowerCase();
        
        console.log(`🌤️ Updating background for: ${this.currentWeather}`);
        
        // Use weather ID for more specific conditions if available
        if (weatherId) {
            // Thunderstorm: 200-232
            if (weatherId >= 200 && weatherId < 300) {
                this.createThunderstorm();
                return;
            }
            // Drizzle: 300-321
            if (weatherId >= 300 && weatherId < 400) {
                this.createDrizzle();
                return;
            }
            // Rain: 500-531
            if (weatherId >= 500 && weatherId < 600) {
                const intensity = weatherId >= 502 ? 'heavy' : weatherId <= 501 ? 'light' : 'normal';
                this.createRain(intensity);
                return;
            }
            // Snow: 600-622
            if (weatherId >= 600 && weatherId < 700) {
                const intensity = weatherId >= 602 ? 'heavy' : weatherId <= 601 ? 'light' : 'normal';
                this.createSnow(intensity);
                return;
            }
            // Atmosphere (mist, fog, haze): 700-781
            if (weatherId >= 700 && weatherId < 800) {
                if (weatherId === 741) {
                    this.createMist(); // Fog
                } else {
                    this.createHaze();
                }
                return;
            }
            // Clear: 800
            if (weatherId === 800) {
                this.createSunny();
                return;
            }
            // Clouds: 801-804
            if (weatherId > 800 && weatherId < 900) {
                this.createClouds(weatherId >= 803);
                return;
            }
        }
        
        // Fallback to string matching
        switch (this.currentWeather) {
            case 'thunderstorm':
                this.createThunderstorm();
                break;
            case 'drizzle':
                this.createDrizzle();
                break;
            case 'rain':
                this.createRain();
                break;
            case 'snow':
                this.createSnow();
                break;
            case 'mist':
            case 'fog':
                this.createMist();
                break;
            case 'haze':
            case 'smoke':
            case 'dust':
            case 'sand':
            case 'ash':
                this.createHaze();
                break;
            case 'clear':
                this.createSunny();
                break;
            case 'clouds':
                this.createClouds();
                break;
            default:
                console.log(`Unknown weather: ${this.currentWeather}`);
                this.createClouds(); // Default to clouds
        }
    }
}

// ===== INITIALIZE AND EXPORT =====
const weatherBackground = new WeatherBackground();

// Make it globally available
window.weatherBackground = weatherBackground;

console.log('🎨 Weather Background System loaded!');
