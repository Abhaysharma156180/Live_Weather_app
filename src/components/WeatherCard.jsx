import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

function getAnimatedIcon(weather) {
  const main = weather.weather?.[0]?.main || "";

  switch (main) {
    case "Clear":
      return "CLEAR_DAY";
    case "Clouds":
      return "CLOUDY";
    case "Rain":
      return "RAIN";
    case "Drizzle":
      return "SLEET";
    case "Thunderstorm":
      return "WIND";
    case "Snow":
      return "SNOW";
    case "Mist":
    case "Haze":
    case "Fog":
      return "FOG";
    default:
      return "CLEAR_DAY";
  }
}

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  const desc = weather.weather?.[0]?.description || "";
  const temp = Math.round(weather.main?.temp);
  const feels = Math.round(weather.main?.feels_like);
  const humidity = weather.main?.humidity;
  const wind = weather.wind?.speed;
  const pressure = weather.main?.pressure;

  const sunrise = weather.sys?.sunrise
    ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "-";
  const sunset = weather.sys?.sunset
    ? new Date(weather.sys.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "-";

  return (
    <div className="weather-card glass">
      <div className="weather-top">
        <div className="location">
          <h2>
            {weather.name}, {weather.sys?.country}
          </h2>
          <p className="small">
            Coordinates: {weather.coord?.lat?.toFixed(2)}, {weather.coord?.lon?.toFixed(2)}
          </p>
        </div>

        <div className="main-info">
          <div className="temp">{temp}°C</div>
          <div className="icon-desc">
            <ReactAnimatedWeather
              icon={getAnimatedIcon(weather)}
              color="goldenrod"
              size={64}
              animate={true}
            />
            <p className="desc">{desc}</p>
          </div>
        </div>
      </div>

      <div className="weather-details">
        <div>
          Feels: <strong>{feels}°C</strong>
        </div>
        <div>
          Humidity: <strong>{humidity}%</strong>
        </div>
        <div>
          Wind: <strong>{wind} m/s</strong>
        </div>
        <div>
          Pressure: <strong>{pressure} hPa</strong>
        </div>
        <div>
          Sunrise: <strong>{sunrise}</strong>
        </div>
        <div>
          Sunset: <strong>{sunset}</strong>
        </div>
      </div>
    </div>
  );
}
