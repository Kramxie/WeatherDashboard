// ===== APPLICATION CONFIGURATION =====
// All app settings and constants in one place

const CONFIG = {
    // API Configuration
    API_KEY: '68b36f94cce5387e01d585b39738c6f8',
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    
    // Default Settings
    DEFAULT_CITY: 'Manila',
    DEFAULT_UNIT: 'metric', // 'metric' for Celsius, 'imperial' for Fahrenheit
    
    // LocalStorage Keys
    STORAGE_KEYS: {
        RECENT_SEARCHES: 'weatherapp_recent_searches',
        FAVORITE_CITIES: 'weatherapp_favorites',
        TEMP_UNIT: 'weatherapp_temp_unit',
        DARK_MODE: 'weatherapp_dark_mode'
    },
    
    // UI Settings
    MAX_RECENT_SEARCHES: 5,
    ANIMATION_DURATION: 300,
    
    // Unit Labels
    UNITS: {
        metric: {
            temp: '°C',
            speed: 'm/s'
        },
        imperial: {
            temp: '°F',
            speed: 'mph'
        }
    }
};

// Make config available globally
window.APP_CONFIG = CONFIG;
