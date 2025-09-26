import React, { useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import WeatherCard from "./WeatherCard";
import ForecastCard from "./ForecastCard";
import "./Weather.css";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "e03f54b5b7f7525319f77a22edd864fe";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);      // current weather
  const [forecast, setForecast] = useState([]);      // daily forecast (5 entries)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // On mount, try to get user's location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported. Search for a city instead.");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchByCoords(pos.coords.latitude, pos.coords.longitude);
      },
      (geErr) => {
        // user blocked or error - allow search
        setLoading(false);
        setError("Location access denied. Please search a city.");
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch weather by coordinates
  async function fetchByCoords(lat, lon) {
    setError(null);
    setLoading(true);
    try {
      const wRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      if (!wRes.ok) {
        const err = await wRes.json();
        throw new Error(err.message || "Failed to fetch weather");
      }
      const wData = await wRes.json();
      setWeather(wData);

      const fRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      if (!fRes.ok) {
        const err = await fRes.json();
        throw new Error(err.message || "Failed to fetch forecast");
      }
      const fData = await fRes.json();
      // pick daily (take forecast at ~12:00 each day) - fallback to every 8th item
      const daily = (fData.list || []).filter((f) => f.dt_txt && f.dt_txt.includes("12:00:00"));
      setForecast(daily.length ? daily.slice(0, 5) : (fData.list || []).filter((_, i) => i % 8 === 0).slice(0, 5));
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  }

  // Fetch by city name
  async function fetchByCity(cityName) {
    if (!cityName) {
      setError("Please enter a city name");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const wRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
      );
      if (!wRes.ok) {
        const err = await wRes.json();
        throw new Error(err.message || "City not found");
      }
      const wData = await wRes.json();
      setWeather(wData);

      const fRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
      );
      if (!fRes.ok) {
        const err = await fRes.json();
        throw new Error(err.message || "Forecast not found");
      }
      const fData = await fRes.json();
      const daily = (fData.list || []).filter((f) => f.dt_txt && f.dt_txt.includes("12:00:00"));
      setForecast(daily.length ? daily.slice(0, 5) : (fData.list || []).filter((_, i) => i % 8 === 0).slice(0, 5));
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="weather-root">
      <Searchbar
        city={city}
        setCity={setCity}
        onSearch={() => fetchByCity(city)}
        onSearchEnter={(c) => fetchByCity(c)}
      />

      {loading && (
        <div className="loading-row">
          <div className="spinner" aria-hidden></div>
          <div className="loading-text">Fetching weather...</div>
        </div>
      )}

      {error && !loading && <div className="error-box">{error}</div>}

      {!loading && weather && (
        <div className="weather-layout">
          <WeatherCard weather={weather} />
          <div className="forecast-list">
            {forecast.length ? (
              forecast.map((day) => <ForecastCard key={day.dt} day={day} />)
            ) : (
              <div className="no-forecast">No forecast data available.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
