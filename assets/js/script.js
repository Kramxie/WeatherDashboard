// ===== ENHANCED WEATHER DASHBOARD APPLICATION =====
// Main application logic with new features:
// - Temperature unit toggle (C/F)
// - Geolocation support
// - Search history
// - Favorite cities
// - Dark mode
// - Hourly forecast
// - More weather details
const API_KEY = '68b36f94cce5387e01d585b39738c6f8'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
// ===== APPLICATION STATE =====
let currentUnit = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.TEMP_UNIT) || APP_CONFIG.DEFAULT_UNIT;
let isDarkMode = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.DARK_MODE) === 'true';
let currentWeatherData = null;

// ===== DOM ELEMENTS =====
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const unitToggle = document.getElementById('unitToggle');
const darkModeToggle = document.getElementById('darkModeToggle');
const errorMessage = document.getElementById('errorMessage');
const loadingSpinner = document.getElementById('loadingSpinner');
const currentWeather = document.getElementById('currentWeather');
const forecastSection = document.getElementById('forecastSection');
const hourlyForecastSection = document.getElementById('hourlyForecastSection');
const recentSearches = document.getElementById('recentSearches');
const favoriteCities = document.getElementById('favoriteCities');

// Current weather elements
const cityName = document.getElementById('cityName');
const currentDate = document.getElementById('currentDate');
const weatherIcon = document.getElementById('weatherIcon');
const temp = document.getElementById('temp');
const tempUnit = document.getElementById('tempUnit');
const weatherDescription = document.getElementById('weatherDescription');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const feelsLike = document.getElementById('feelsLike');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const uvIndex = document.getElementById('uvIndex');
const favoriteBtn = document.getElementById('favoriteBtn');

// Forecast containers
const forecastContainer = document.getElementById('forecastContainer');
const hourlyContainer = document.getElementById('hourlyContainer');

// ===== EVENT LISTENERS =====
searchBtn.addEventListener('click', () => handleSearch(cityInput.value));
locationBtn.addEventListener('click', handleGeolocation);
unitToggle.addEventListener('click', toggleUnit);
darkModeToggle.addEventListener('click', toggleDarkMode);

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch(cityInput.value);
});

// ===== INITIALIZATION =====
window.addEventListener('load', () => {
    initializeApp();
});

function initializeApp() {
    // Apply saved preferences
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }
    
    updateUnitToggle();
    loadRecentSearches();
    loadFavoriteCities();
    
    // Auto-load default city if no history
    const recent = getRecentSearches();
    if (recent.length === 0) {
        handleSearch(APP_CONFIG.DEFAULT_CITY);
    }
}

// ===== MAIN SEARCH HANDLER =====
async function handleSearch(city) {
    city = city.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    hideError();
    hideWeatherData();
    showLoading();

    try {
        weatherAPI.setUnit(currentUnit);
        
        const [currentData, forecastData] = await Promise.all([
            weatherAPI.getCurrentWeather(city),
            weatherAPI.getForecast(city)
        ]);

        currentWeatherData = currentData;
        
        displayCurrentWeather(currentData);
        displayForecast(forecastData);
        displayHourlyForecast(forecastData);
        // Pass weather ID for more accurate animations
        updateBackground(currentData.weather[0].main.toLowerCase(), currentData.weather[0].id);
        
        // Save to recent searches
        addToRecentSearches(currentData.name, currentData.sys.country);
        
        hideLoading();
        showWeatherData();
        
        // Clear input
        cityInput.value = '';

    } catch (error) {
        hideLoading();
        handleApiError(error);
    }
}

// ===== GEOLOCATION HANDLER =====
async function handleGeolocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }

    showLoading();
    hideError();

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            try {
                const { latitude, longitude } = position.coords;
                weatherAPI.setUnit(currentUnit);
                
                const [currentData, forecastData] = await Promise.all([
                    weatherAPI.getCurrentWeatherByCoords(latitude, longitude),
                    weatherAPI.getForecastByCoords(latitude, longitude)
                ]);

                currentWeatherData = currentData;
                
                displayCurrentWeather(currentData);
                displayForecast(forecastData);
                displayHourlyForecast(forecastData);
                // Pass weather ID for more accurate animations
                updateBackground(currentData.weather[0].main.toLowerCase(), currentData.weather[0].id);
                
                addToRecentSearches(currentData.name, currentData.sys.country);
                
                hideLoading();
                showWeatherData();

            } catch (error) {
                hideLoading();
                handleApiError(error);
            }
        },
        (error) => {
            hideLoading();
            showError('Unable to get your location. Please check your browser permissions.');
            console.error('Geolocation error:', error);
        }
    );
}

// ===== UNIT TOGGLE =====
function toggleUnit() {
    currentUnit = currentUnit === 'metric' ? 'imperial' : 'metric';
    localStorage.setItem(APP_CONFIG.STORAGE_KEYS.TEMP_UNIT, currentUnit);
    updateUnitToggle();
    
    // Refresh current weather with new unit
    if (currentWeatherData) {
        const cityName = currentWeatherData.name;
        handleSearch(cityName);
    }
}

function updateUnitToggle() {
    unitToggle.textContent = currentUnit === 'metric' ? '°C' : '°F';
    
    // Update all temperature units on page
    const unitLabels = document.querySelectorAll('.temp-unit');
    unitLabels.forEach(label => {
        label.textContent = APP_CONFIG.UNITS[currentUnit].temp;
    });
}

// ===== DARK MODE TOGGLE =====
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem(APP_CONFIG.STORAGE_KEYS.DARK_MODE, isDarkMode);
}

// ===== DISPLAY FUNCTIONS =====
function displayCurrentWeather(data) {
    const unitSymbol = APP_CONFIG.UNITS[currentUnit].temp;
    const speedUnit = APP_CONFIG.UNITS[currentUnit].speed;
    
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    currentDate.textContent = formatDate(new Date());
    
    temp.textContent = Math.round(data.main.temp);
    tempUnit.textContent = unitSymbol;
    
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    weatherIcon.alt = data.weather[0].description;
    
    weatherDescription.textContent = data.weather[0].description;
    
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} ${speedUnit}`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}${unitSymbol}`;
    pressure.textContent = `${data.main.pressure} hPa`;
    
    // Additional details
    if (data.visibility) {
        visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    }
    
    if (data.sys.sunrise) {
        sunrise.textContent = formatTime(data.sys.sunrise);
    }
    
    if (data.sys.sunset) {
        sunset.textContent = formatTime(data.sys.sunset);
    }
    
    // Update favorite button
    updateFavoriteButton(data.name, data.sys.country);
}

function displayForecast(data) {
    forecastContainer.innerHTML = '';
    const dailyForecasts = processForecastData(data.list);
    
    dailyForecasts.slice(0, 3).forEach(forecast => {
        const card = createForecastCard(forecast);
        forecastContainer.appendChild(card);
    });
}

function displayHourlyForecast(data) {
    hourlyContainer.innerHTML = '';
    
    // Get next 6 entries (18 hours with 3-hour intervals)
    const hourlyData = data.list.slice(0, 6);
    
    hourlyData.forEach(hour => {
        const card = createHourlyCard(hour);
        hourlyContainer.appendChild(card);
    });
}

function createForecastCard(forecast) {
    const unitSymbol = currentUnit === 'metric' ? '°' : '°';
    const card = document.createElement('div');
    card.className = 'forecast-card';
    
    const date = new Date(forecast.timestamp * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    card.innerHTML = `
        <div class="forecast-date">${dayName}</div>
        <div class="forecast-date" style="font-size: 0.9rem; color: #666;">${dateStr}</div>
        <img 
            src="https://openweathermap.org/img/wn/${forecast.weather.icon}@2x.png" 
            alt="${forecast.weather.description}"
            class="forecast-icon"
        >
        <div class="forecast-temps">
            <span class="temp-max">${forecast.maxTemp}${unitSymbol}</span>
            <span class="temp-min">${forecast.minTemp}${unitSymbol}</span>
        </div>
        <div class="forecast-description">${forecast.weather.description}</div>
    `;
    
    return card;
}

function createHourlyCard(hourData) {
    const unitSymbol = APP_CONFIG.UNITS[currentUnit].temp;
    const card = document.createElement('div');
    card.className = 'hourly-card';
    
    const date = new Date(hourData.dt * 1000);
    const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
    
    card.innerHTML = `
        <div class="hourly-time">${timeStr}</div>
        <img 
            src="https://openweathermap.org/img/wn/${hourData.weather[0].icon}.png" 
            alt="${hourData.weather[0].description}"
            class="hourly-icon"
        >
        <div class="hourly-temp">${Math.round(hourData.main.temp)}${unitSymbol}</div>
        <div class="hourly-desc">${hourData.weather[0].main}</div>
    `;
    
    return card;
}

function processForecastData(forecastList) {
    const dailyData = {};
    
    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        
        if (!dailyData[date]) {
            dailyData[date] = {
                date: date,
                temps: [],
                weather: item.weather[0],
                timestamp: item.dt
            };
        }
        
        dailyData[date].temps.push(item.main.temp);
    });
    
    return Object.values(dailyData).map(day => ({
        date: day.date,
        timestamp: day.timestamp,
        maxTemp: Math.round(Math.max(...day.temps)),
        minTemp: Math.round(Math.min(...day.temps)),
        weather: day.weather
    }));
}

// ===== RECENT SEARCHES =====
function getRecentSearches() {
    const saved = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.RECENT_SEARCHES);
    return saved ? JSON.parse(saved) : [];
}

function addToRecentSearches(city, country) {
    let recent = getRecentSearches();
    const fullName = `${city}, ${country}`;
    
    // Remove if already exists
    recent = recent.filter(item => item !== fullName);
    
    // Add to beginning
    recent.unshift(fullName);
    
    // Keep only max items
    recent = recent.slice(0, APP_CONFIG.MAX_RECENT_SEARCHES);
    
    localStorage.setItem(APP_CONFIG.STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(recent));
    loadRecentSearches();
}

function loadRecentSearches() {
    const recent = getRecentSearches();
    recentSearches.innerHTML = '';
    
    if (recent.length === 0) {
        recentSearches.innerHTML = '<p class="empty-state">No recent searches</p>';
        return;
    }
    
    recent.forEach(city => {
        const chip = document.createElement('span');
        chip.className = 'search-chip';
        chip.textContent = city;
        chip.onclick = () => handleSearch(city.split(',')[0]);
        recentSearches.appendChild(chip);
    });
}

// ===== FAVORITE CITIES =====
function getFavoriteCities() {
    const saved = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.FAVORITE_CITIES);
    return saved ? JSON.parse(saved) : [];
}

function addToFavorites(city, country) {
    let favorites = getFavoriteCities();
    const fullName = `${city}, ${country}`;
    
    if (!favorites.includes(fullName)) {
        favorites.push(fullName);
        localStorage.setItem(APP_CONFIG.STORAGE_KEYS.FAVORITE_CITIES, JSON.stringify(favorites));
        loadFavoriteCities();
        updateFavoriteButton(city, country);
    }
}

function removeFromFavorites(city, country) {
    let favorites = getFavoriteCities();
    const fullName = `${city}, ${country}`;
    
    favorites = favorites.filter(item => item !== fullName);
    localStorage.setItem(APP_CONFIG.STORAGE_KEYS.FAVORITE_CITIES, JSON.stringify(favorites));
    loadFavoriteCities();
    updateFavoriteButton(city, country);
}

function isFavorite(city, country) {
    const favorites = getFavoriteCities();
    const fullName = `${city}, ${country}`;
    return favorites.includes(fullName);
}

function updateFavoriteButton(city, country) {
    if (!favoriteBtn) return;
    
    if (isFavorite(city, country)) {
        favoriteBtn.innerHTML = '⭐';
        favoriteBtn.title = 'Remove from favorites';
        favoriteBtn.onclick = () => removeFromFavorites(city, country);
    } else {
        favoriteBtn.innerHTML = '☆';
        favoriteBtn.title = 'Add to favorites';
        favoriteBtn.onclick = () => addToFavorites(city, country);
    }
}

function loadFavoriteCities() {
    const favorites = getFavoriteCities();
    favoriteCities.innerHTML = '';
    
    if (favorites.length === 0) {
        favoriteCities.innerHTML = '<p class="empty-state">No favorite cities</p>';
        return;
    }
    
    favorites.forEach((city, index) => {
        const chip = document.createElement('span');
        chip.className = 'favorite-chip';
        chip.innerHTML = `
            ${city}
            <span class="remove-favorite" onclick="removeFromFavorites('${city.split(',')[0]}', '${city.split(',')[1].trim()}')">×</span>
        `;
        chip.onclick = (e) => {
            if (!e.target.classList.contains('remove-favorite')) {
                handleSearch(city.split(',')[0]);
            }
        };
        favoriteCities.appendChild(chip);
    });
}

// ===== UI HELPER FUNCTIONS =====
function updateBackground(weatherCondition, weatherId = null) {
    // Update body classes for gradient background
    document.body.className = isDarkMode ? 'dark-mode' : '';
    document.body.classList.add(weatherCondition);
    
    // Update animated weather background if available
    if (window.weatherBackground) {
        window.weatherBackground.update(weatherCondition, weatherId);
    }
}

function formatDate(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    setTimeout(() => hideError(), 5000);
}

function hideError() {
    errorMessage.classList.remove('show');
}

function showLoading() {
    loadingSpinner.classList.add('show');
}

function hideLoading() {
    loadingSpinner.classList.remove('show');
}

function showWeatherData() {
    currentWeather.classList.add('show');
    forecastSection.classList.add('show');
    if (hourlyForecastSection) hourlyForecastSection.classList.add('show');
}

function hideWeatherData() {
    currentWeather.classList.remove('show');
    forecastSection.classList.remove('show');
    if (hourlyForecastSection) hourlyForecastSection.classList.remove('show');
}

function handleApiError(error) {
    const errorMsg = error.message.toLowerCase();
    
    if (errorMsg.includes('404')) {
        showError('City not found. Please check the spelling and try again.');
    } else if (errorMsg.includes('401')) {
        showError('Invalid API key. Please check your configuration.');
    } else if (errorMsg.includes('429')) {
        showError('Too many requests. Please wait a moment and try again.');
    } else {
        showError('Failed to fetch weather data. Please try again later.');
    }
    
    console.error('Error:', error);
}
