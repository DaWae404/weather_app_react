// src/App.jsx
import { useState } from 'react';
import './index.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getEmoji = (id) => {
    if (id >= 200 && id <= 232) return "⛈️";
    else if (id >= 300 && id <= 321) return "🌦️";
    else if (id >= 500 && id <= 531) return "🌧️";
    else if (id >= 600 && id <= 622) return "❄️";
    else if (id >= 700 && id <= 781) return "🌫️";
    else if (id === 800) return "☀️";
    else if (id >= 801 && id <= 804) return "☁️";
    else return "❓";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("City not found");

      const data = await res.json();
      setWeather({
        name: data.name,
        temp: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        icon: getEmoji(data.weather[0].id)
      });
      setError('');
    } catch (err) {
      setWeather(null);
      setError(err.message);
    }
  };

  return (
    <>
      <form className="weatherForm" onSubmit={handleSubmit}>
        <input
          type="text"
          className="cityInput"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {weather && (
        <div className="card">
          <h1 className="cityName">{weather.name}</h1>
          <p className="temperature">{weather.temp}°C</p>
          <p className="humidityDisplay">Humidity: {weather.humidity}%</p>
          <p className="descriptionDisplay">{weather.description}</p>
          <p className="weatherEmoji">{weather.icon}</p>
        </div>
      )}

      {error && (
        <div className="card">
          <p className="errorDisplay">{error}</p>
        </div>
      )}
    </>
  );
}

export default App;
