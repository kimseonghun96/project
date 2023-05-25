import React, { useState, useEffect } from "react";
import "./Weather.scss";

interface WeatherProps {
  city: string;
}

const Weather: React.FC<WeatherProps> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [city]);

  if (
    !weatherData ||
    !weatherData.weather ||
    weatherData.weather.length === 0
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="WeatherBox">
      <h2>{weatherData.name}</h2>
      <p>{weatherData.weather[0].description}</p>
      <p>Temperature: {weatherData.main.temp}°C</p>
    </div>
  );
};

export default Weather;
