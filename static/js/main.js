let chart;

// Function for clicking the popular city tags
function quickSearch(cityName) {
    document.getElementById('city-input').value = cityName;
    fetchWeather();
}

async function fetchWeather() {
    const city = document.getElementById('city-input').value;
    if (!city) return;

    // Show loading state or hide old data
    const content = document.getElementById('weather-content');
    
    try {
        const res = await fetch(`/get_weather?city=${city}`);
        const data = await res.json();

        if (data.error) {
            alert("City not found. Please try again.");
            return;
        }

        content.classList.remove('hidden');
        
        // Update Current Weather
        document.getElementById('city-name').innerText = data.city;
        document.getElementById('current-temp').innerText = data.temp;
        document.getElementById('condition-text').innerText = data.desc;
        document.getElementById('feels-like').innerText = `Feels like ${data.feels_like}°`;
        document.getElementById('warning-badge').innerText = data.insight;

        updateChart(data.hourly);
        updateWeekly(data.daily);
    } catch (err) {
        console.error("Error fetching weather:", err);
    }
}

function updateChart(hourly) {
    const ctx = document.getElementById('tempChart').getContext('2d');
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: hourly.map(h => h.time),
            datasets: [{
                label: 'Temperature',
                data: hourly.map(h => h.temp),
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: '#3b82f6'
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { ticks: { color: '#94a3b8' }, grid: { display: false } },
                y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
            }
        }
    });
}

function updateWeekly(daily) {
    const container = document.getElementById('weekly-list');
    container.innerHTML = '';
    daily.forEach(d => {
        container.innerHTML += `
            <div class="day-row">
                <span style="width: 100px;">${d.day}</span>
                <img src="https://openweathermap.org/img/wn/${d.icon}.png" width="40">
                <span style="font-weight: bold;">${d.temp}°C</span>
            </div>
        `;
    });
}

// Allow pressing "Enter" key to search
document.getElementById('city-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') fetchWeather();
});