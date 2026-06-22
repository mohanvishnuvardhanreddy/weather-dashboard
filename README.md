Real-Time Weather Dashboard 🌦️


A modern, responsive, and interactive weather application built with Python (Flask) and JavaScript. This dashboard features a Gemini-inspired search interface, real-time data visualization using Chart.js, and smart contextual weather insights.


![alt text](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

![alt text](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)

![alt text](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

![alt text](https://img.shields.io/badge/OpenWeatherMap-EB6E4B?style=for-the-badge&logo=openweathermap&logoColor=white)


🚀 Features

Gemini-Style Search: Interactive, center-aligned search bar with glowing focus effects and smooth transitions.
Quick Access Tags: One-click search for popular cities like Visakhapatnam, London, and Tokyo.
Dynamic Data Visualization: A smooth 24-hour temperature trend line graph powered by Chart.js.
Smart Weather Insights: A logic-based engine that provides contextual advice (e.g., "Heatwave Warning," "Rain Expected," or "Clear Skies").
5-Day Forecast: Detailed daily breakdown including temperature and weather conditions.
Glassmorphism UI: Modern desktop-first design with blurred panels and dark-mode aesthetics.

🛠️ Tech Stack

Backend: Python 3.x, Flask
Frontend: HTML5, CSS3 (Custom Grid & Flexbox), JavaScript (ES6+)
APIs: OpenWeatherMap API (Current & 5-Day Forecast)
Libraries: Chart.js (Data Vis), FontAwesome (Icons), Dotenv (Security)

📋 Prerequisites

Before you begin, ensure you have the following:
Python installed (3.7 or higher).
An API Key from OpenWeatherMap.

🧠 Key Logic Implemented

Data Aggregation: The backend fetches both current weather and 5-day forecast data simultaneously to minimize frontend latency.
Heuristic Insights: A custom algorithm analyzes temperature and cloud coverage to generate user-friendly warnings (e.g., Heatwaves > 35°C).
Responsive Charting: Chart.js is configured with a cubic interpolation mode (tension: 0.4) to provide a professional, smooth visual curve for temperature trends.

Live Link: https://weather-dashboard-rho-cyan.vercel.app/
