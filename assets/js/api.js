// ===== API SERVICE MODULE =====
// All API calls are centralized here for better organization

class WeatherAPI {
    constructor(apiKey, baseUrl) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
        this.currentUnit = APP_CONFIG.DEFAULT_UNIT;
    }

    /**
     * Set temperature unit (metric or imperial)
     */
    setUnit(unit) {
        this.currentUnit = unit;
    }

    /**
     * Fetch current weather by city name
     */
    async getCurrentWeather(city) {
        const url = `${this.baseUrl}/weather?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=${this.currentUnit}`;
        return await this._fetchData(url);
    }

    /**
     * Fetch current weather by coordinates
     */
    async getCurrentWeatherByCoords(lat, lon) {
        const url = `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${this.currentUnit}`;
        return await this._fetchData(url);
    }

    /**
     * Fetch 5-day forecast by city name
     */
    async getForecast(city) {
        const url = `${this.baseUrl}/forecast?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=${this.currentUnit}`;
        return await this._fetchData(url);
    }

    /**
     * Fetch 5-day forecast by coordinates
     */
    async getForecastByCoords(lat, lon) {
        const url = `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${this.currentUnit}`;
        return await this._fetchData(url);
    }

    /**
     * Fetch air pollution data
     */
    async getAirPollution(lat, lon) {
        const url = `${this.baseUrl}/air_pollution?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
        return await this._fetchData(url);
    }

    /**
     * Internal method to handle fetch requests
     */
    async _fetchData(url) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
}

// Create and export API instance
const weatherAPI = new WeatherAPI(APP_CONFIG.API_KEY, APP_CONFIG.BASE_URL);
