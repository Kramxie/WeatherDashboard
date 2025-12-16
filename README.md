# 🌤️ Weather Dashboard

A beautiful, responsive weather dashboard that displays current weather conditions and a 3-day forecast for any city in the world. Built with HTML, CSS, and vanilla JavaScript.

## ✨ Features

- **Real-time Weather Data**: Get current temperature, humidity, wind speed, pressure, and more
- **3-Day Forecast**: View upcoming weather with min/max temperatures
- **Dynamic Backgrounds**: Background colors change based on weather conditions (sunny, rainy, cloudy, etc.)
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Error Handling**: Gracefully handles invalid city names and API errors
- **Clean UI**: Modern, intuitive interface with smooth animations

## 📸 What It Includes

- Current weather display with:
  - City name and date
  - Temperature and "feels like" temperature
  - Weather icon and description
  - Humidity, wind speed, and pressure
  
- 3-day forecast showing:
  - Day and date
  - Weather icon
  - Maximum and minimum temperatures
  - Weather conditions

## 🚀 Getting Started

### Prerequisites

- A web browser (Chrome, Firefox, Safari, Edge, etc.)
- An OpenWeatherMap API key (free)

### Step 1: Get Your Free API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Click on "Sign Up" or "Get API Key"
3. Create a free account
4. Once logged in, go to "API keys" section
5. Copy your API key (it might take a few minutes to activate)

### Step 2: Configure the App

1. Open the `script.js` file
2. Find this line at the top of the file:
   ```javascript
   const API_KEY = 'YOUR_API_KEY_HERE';
   ```
3. Replace `'YOUR_API_KEY_HERE'` with your actual API key:
   ```javascript
   const API_KEY = 'your_actual_api_key_here';
   ```
4. Save the file

### Step 3: Run the Application

Simply open the `index.html` file in your web browser:

- **Option 1**: Double-click `index.html`
- **Option 2**: Right-click `index.html` → Open with → Your Browser
- **Option 3**: Drag and drop `index.html` into your browser window

## 🎯 How to Use

1. Enter a city name in the search bar (e.g., "London", "New York", "Tokyo")
2. Click the "Search" button or press Enter
3. View the current weather and 3-day forecast
4. Try different cities to see the dynamic background changes!

## 🎨 Dynamic Weather Backgrounds

The app automatically changes its background gradient based on the weather:

- ☀️ **Clear/Sunny**: Warm orange/yellow gradient
- ☁️ **Cloudy**: Gray gradient
- 🌧️ **Rainy**: Blue/dark gradient
- ❄️ **Snow**: Light gray/blue gradient
- ⛈️ **Thunderstorm**: Dark blue/purple gradient
- 🌫️ **Fog/Mist**: Misty gray gradient

## 📱 Mobile Friendly

The dashboard is fully responsive and adapts to:
- Desktop screens (large displays)
- Tablets (medium displays)
- Mobile phones (small displays)

## 🛠️ Technical Details

### Files Structure

```
WeatherApp/
│
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # JavaScript logic and API integration
└── README.md          # This file
```

### Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Async/await, fetch API, DOM manipulation
- **OpenWeatherMap API**: Weather data provider

### API Endpoints Used

- Current Weather: `https://api.openweathermap.org/data/2.5/weather`
- 5-Day Forecast: `https://api.openweathermap.org/data/2.5/forecast`

## 🔍 Code Explanation

### HTML (`index.html`)
- **Structure**: Contains the main container, header, search bar, current weather section, and forecast section
- **Semantic Elements**: Uses proper HTML5 semantic tags for better accessibility
- **Dynamic Content**: Most content is populated by JavaScript based on API responses

### CSS (`styles.css`)
- **Responsive Grid/Flexbox**: Uses CSS Grid and Flexbox for layout
- **Animations**: Smooth fade-in effects and hover animations
- **Media Queries**: Adapts to different screen sizes (768px and 480px breakpoints)
- **Dynamic Classes**: Weather-based background classes that JavaScript toggles

### JavaScript (`script.js`)
Key functions explained:

1. **handleSearch()**: Main function that validates input and coordinates the weather fetch
2. **fetchCurrentWeather()**: Makes API call to get current weather data
3. **fetchForecast()**: Makes API call to get 5-day forecast data
4. **displayCurrentWeather()**: Updates the UI with current weather information
5. **displayForecast()**: Creates and displays forecast cards for 3 days
6. **processForecastData()**: Converts 3-hour interval data into daily forecasts
7. **updateBackground()**: Changes page background based on weather condition
8. **Error Handling**: Shows user-friendly error messages for various scenarios

## 🐛 Troubleshooting

**Problem**: "Please add your OpenWeatherMap API key"
- **Solution**: Make sure you've replaced `'YOUR_API_KEY_HERE'` in `script.js` with your actual API key

**Problem**: "Invalid API key"
- **Solution**: Check that your API key is correct and has been activated (can take a few minutes after signup)

**Problem**: "City not found"
- **Solution**: Check the spelling of the city name or try adding the country code (e.g., "London,UK")

**Problem**: Page shows but no data appears
- **Solution**: Open browser console (F12) to check for errors. Ensure you're connected to the internet.

## 📝 License

This project is free to use for educational and personal purposes.

## 🙏 Credits

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Weather icons from OpenWeatherMap

## 🚀 Future Enhancements

Possible improvements you could add:
- Search history/favorites
- Hourly forecast
- Multiple location comparison
- Temperature unit toggle (Celsius/Fahrenheit)
- Geolocation to detect user's city
- More detailed weather information (UV index, sunrise/sunset, etc.)

---

**Enjoy your Weather Dashboard! 🌈**
