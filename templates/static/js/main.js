document.getElementById('search-btn').addEventListener('click', fetchWeather);
document.getElementById('city-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') fetchWeather();
});

async function fetchWeather() {
    const cityInput = document.getElementById('city-input').value.trim();
    const errorDiv = document.getElementById('error-message');
    const weatherCard = document.getElementById('weather-card');

    if (!cityInput) return;

    try {
        // Fetch weather payload smoothly from our local Flask backend route
        const response = await fetch(`/get_weather?city=${encodeURIComponent(cityInput)}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong.");
        }

        // Hide error and reveal dashboard card data
        errorDiv.className = 'error-hide';
        weatherCard.className = 'card-show';

        // Update UI dynamically
        document.getElementById('location').textContent = `${data.city}, ${data.country}`;
        document.getElementById('temperature').textContent = data.temp;
        document.getElementById('description').textContent = data.description;
        document.getElementById('humidity').textContent = data.humidity;
        document.getElementById('wind').textContent = data.wind_speed;
        
        // Load the matching responsive weather icon from OpenWeatherMap CDN
        document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;

    } catch (error) {
        // Direct, clean error handling displayed safely to the client UI
        weatherCard.className = 'card-hide';
        errorDiv.className = 'error-show';
        errorDiv.textContent = error.message;
    }
}