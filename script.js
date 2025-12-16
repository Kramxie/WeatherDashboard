// ===== API CONFIGURATION =====
// You need to get your own free API key from: https://openweathermap.org/api
const API_KEY = '68b36f94cce5387e01d585b39738c6f8'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// ===== DOM ELEMENTS =====
// Getting references to all HTML elements we'll need to manipulate
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const errorMessage = document.getElementById('errorMessage');
const loadingSpinner = document.getElementById('loadingSpinner');
const currentWeather = document.getElementById('currentWeather');
const forecastSection = document.getElementById('forecastSection');

// Current weather elements
const cityName = document.getElementById('cityName');
const currentDate = document.getElementById('currentDate');
const weatherIcon = document.getElementById('weatherIcon');
const temp = document.getElementById('temp');
const weatherDescription = document.getElementById('weatherDescription');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const feelsLike = document.getElementById('feelsLike');
const pressure = document.getElementById('pressure');

// Forecast elements
const forecastContainer = document.getElementById('forecastContainer');

// ===== EVENT LISTENERS =====
// Add click event to search button
searchBtn.addEventListener('click', handleSearch);

// Allow pressing Enter key in the input field to trigger search
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// ===== MAIN SEARCH HANDLER =====
/**
 * Handles the search functionality when user clicks search or presses Enter
 * Validates input, shows loading state, and fetches weather data
 */
async function handleSearch() {
    const city = cityInput.value.trim();
    
    // Validate that user entered a city name
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    // Check if API key is configured
    if (API_KEY === 'YOUR_API_KEY_HERE') {
        showError('Please add your OpenWeatherMap API key in script.js');
        return;
    }

    // Hide previous results and errors
    hideError();
    hideWeatherData();
    showLoading();

    try {
        // Fetch both current weather and forecast data
        const [currentData, forecastData] = await Promise.all([
            fetchCurrentWeather(city),
            fetchForecast(city)
        ]);

        // Display the fetched data
        displayCurrentWeather(currentData);
        displayForecast(forecastData);
        
        // Change background based on weather condition
        updateBackground(currentData.weather[0].main.toLowerCase());
        
        hideLoading();
        showWeatherData();

    } catch (error) {
        hideLoading();
        // Handle different types of errors
        if (error.message.includes('404')) {
            showError('City not found. Please check the spelling and try again.');
        } else if (error.message.includes('401')) {
            showError('Invalid API key. Please check your OpenWeatherMap API key.');
        } else {
            showError('Failed to fetch weather data. Please try again later.');
        }
        console.error('Error:', error);
    }
}

// ===== API FETCH FUNCTIONS =====
/**
 * Fetches current weather data for a given city
 * @param {string} city - The name of the city to fetch weather for
 * @returns {Promise<Object>} - Weather data object
 */
async function fetchCurrentWeather(city) {
    const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
}

/**
 * Fetches 5-day forecast data (we'll extract 3 days from this)
 * @param {string} city - The name of the city to fetch forecast for
 * @returns {Promise<Object>} - Forecast data object
 */
async function fetchForecast(city) {
    const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
}

// ===== DISPLAY FUNCTIONS =====
/**
 * Displays current weather information on the page
 * @param {Object} data - Current weather data from API
 */
function displayCurrentWeather(data) {
    // Update city name and current date
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    currentDate.textContent = formatDate(new Date());
    
    // Update temperature (rounded to nearest integer)
    temp.textContent = Math.round(data.main.temp);
    
    // Update weather icon from OpenWeatherMap
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    weatherIcon.alt = data.weather[0].description;
    
    // Update weather description
    weatherDescription.textContent = data.weather[0].description;
    
    // Update weather details
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    pressure.textContent = `${data.main.pressure} hPa`;
}

/**
 * Displays 3-day forecast information
 * @param {Object} data - Forecast data from API (contains 5-day/3-hour data)
 */
function displayForecast(data) {
    // Clear previous forecast cards
    forecastContainer.innerHTML = '';
    
    // Process forecast data to get one entry per day (at noon)
    const dailyForecasts = processForecastData(data.list);
    
    // Create and display forecast cards for 3 days
    dailyForecasts.slice(0, 3).forEach(forecast => {
        const card = createForecastCard(forecast);
        forecastContainer.appendChild(card);
    });
}

/**
 * Processes the 3-hour interval forecast data to get daily forecasts
 * @param {Array} forecastList - Array of forecast entries
 * @returns {Array} - Array of daily forecast objects
 */
function processForecastData(forecastList) {
    const dailyData = {};
    
    // Group forecasts by date
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
        
        // Collect all temperatures for this day
        dailyData[date].temps.push(item.main.temp);
    });
    
    // Calculate min/max temps for each day and create forecast objects
    return Object.values(dailyData).map(day => ({
        date: day.date,
        timestamp: day.timestamp,
        maxTemp: Math.round(Math.max(...day.temps)),
        minTemp: Math.round(Math.min(...day.temps)),
        weather: day.weather
    }));
}

/**
 * Creates a forecast card HTML element
 * @param {Object} forecast - Daily forecast data
 * @returns {HTMLElement} - Forecast card element
 */
function createForecastCard(forecast) {
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
            <span class="temp-max">${forecast.maxTemp}°</span>
            <span class="temp-min">${forecast.minTemp}°</span>
        </div>
        <div class="forecast-description">${forecast.weather.description}</div>
    `;
    
    return card;
}

// ===== UI HELPER FUNCTIONS =====
/**
 * Updates the page background based on weather condition
 * @param {string} weatherCondition - Weather condition (clear, clouds, rain, etc.)
 */
function updateBackground(weatherCondition) {
    // Remove all weather classes from body
    document.body.className = '';
    
    // Add the appropriate weather class
    document.body.classList.add(weatherCondition);
}

/**
 * Formats a date object into a readable string
 * @param {Date} date - Date object to format
 * @returns {string} - Formatted date string
 */
function formatDate(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Shows error message to user
 * @param {string} message - Error message to display
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

/**
 * Hides the error message
 */
function hideError() {
    errorMessage.classList.remove('show');
}

/**
 * Shows the loading spinner
 */
function showLoading() {
    loadingSpinner.classList.add('show');
}

/**
 * Hides the loading spinner
 */
function hideLoading() {
    loadingSpinner.classList.remove('show');
}

/**
 * Shows weather data sections (current weather and forecast)
 */
function showWeatherData() {
    currentWeather.classList.add('show');
    forecastSection.classList.add('show');
}

/**
 * Hides weather data sections
 */
function hideWeatherData() {
    currentWeather.classList.remove('show');
    forecastSection.classList.remove('show');
}

// ===== INITIALIZATION =====
// Optional: Load weather for a default city when page loads
window.addEventListener('load', () => {
    // You can uncomment the line below to load weather for a default city on page load
    // cityInput.value = 'London';
    // handleSearch();
});
