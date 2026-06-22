import os
import requests
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
API_KEY = os.getenv("OPENWEATHER_API_KEY")
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast"

def get_weather_advice(temp, clouds, desc):
    desc = desc.lower()
    if "rain" in desc or "drizzle" in desc:
        return "Red Warning: Rain expected. Carry an umbrella! ☔"
    if temp > 35:
        return "Red Warning for Heat Wave: Stay hydrated! ☀️"
    if clouds > 70:
        return "Cloudy skies: It might rain later. ☁️"
    return "Weather looks clear: Have a great day! 😊"

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')
    if not city: return jsonify({"error": "No city"}), 400
    
    params = {'q': city, 'appid': API_KEY, 'units': 'metric'}
    try:
        # Current Weather
        res = requests.get(BASE_URL, params=params)
        data = res.json()
        if res.status_code != 200: return jsonify({"error": "City not found"}), 404

        # Forecast Data
        f_res = requests.get(FORECAST_URL, params=params)
        f_data = f_res.json()

        # Process Hourly (next 24h)
        hourly = []
        for item in f_data['list'][:8]:
            hourly.append({
                "time": item['dt_txt'].split(' ')[1][:5],
                "temp": round(item['main']['temp']),
                "icon": item['weather'][0]['icon']
            })

        # Process Daily
        daily = []
        for item in f_data['list']:
            if "12:00:00" in item['dt_txt']:
                daily.append({
                    "day": item['dt_txt'].split(' ')[0],
                    "temp": round(item['main']['temp']),
                    "icon": item['weather'][0]['icon']
                })

        return jsonify({
            "city": data["name"],
            "temp": round(data["main"]["temp"]),
            "feels_like": round(data["main"]["feels_like"]),
            "desc": data["weather"][0]["description"].title(),
            "insight": get_weather_advice(data["main"]["temp"], data["clouds"]["all"], data["weather"][0]["description"]),
            "hourly": hourly,
            "daily": daily
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Force the reloader to ignore system/global library paths
    app.run(debug=True, use_reloader=True)