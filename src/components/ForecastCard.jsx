import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

function getAnimatedIcon(day) {
  const main = day.weather?.[0]?.main || "";

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

export default function ForecastCard({ day }) {
  const date = new Date(day.dt * 1000);
  const weekday = date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const temp = Math.round(day.main.temp);
  const desc = day.weather?.[0]?.description;

  return (
    <div className="forecast-card glass">
      <div className="fc-date">{weekday}</div>
      <ReactAnimatedWeather
        icon={getAnimatedIcon(day)}
        color="steelblue"
        size={48}
        animate={true}
      />
      <div className="fc-temp">{temp}°C</div>
      <div className="fc-desc">{desc}</div>
    </div>
  );
}
