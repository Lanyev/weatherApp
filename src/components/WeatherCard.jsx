import React from "react";

const WeatherCard = ({
  weather,
  temperature,
  isCelsius,
  changeUnitTemperature,
}) => {
  console.log(weather);
  return (
    <article className="weatherCard">
      <h1>Weather App</h1>
      <h3>{`${weather.name}, ${weather.sys.country}`}</h3>
      <section>
        <div>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt="Clima"
          />
        </div>
        <ul>
          <li>{weather.weather[0].description}</li>
          <li>Wind Speed:{weather.wind.speed} m/s</li>
          <li>Clouds: {weather.clouds.all}</li>
          <li>Humidity: {weather.main.humidity}%</li>
        </ul>
      </section>
      <div className="temp">
        <p>
          {isCelsius
            ? `${temperature.celsius}  C°`
            : `${temperature.fahrenheit}  F°`}
        </p>
      </div>

      <button className="cardButton" onClick={changeUnitTemperature}>
        Change to {isCelsius ? "°F" : "°C"}
      </button>
    </article>
  );
};

export default WeatherCard;
