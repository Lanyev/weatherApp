import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temperature, setTemperature] = useState();
  const [isCelsius, setIsCelsius] = useState(true);

  const success = (pos) => {
    const newCoords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    };
    setCoords(newCoords);
  };

  const changeTemperature = () => {
    setIsCelsius(!isCelsius);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    const API_KEY = "de581b4ec4e4a9be896db9b0db9cd3b7";
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords?.lat}&lon=${coords?.lon}&appid=${API_KEY}`;
    axios
      .get(URL)
      .then((res) => {
        const tempKelvin = res.data.main.temp;
        const tempCelsius = tempKelvin - 273.15;
        const tempFahrenheit = (tempCelsius * 9) / 5 + 32;
        const newTemperature = {
          celsius: tempCelsius,
          fahrenheit: tempFahrenheit,
        };
        setTemperature(newTemperature);
        setWeather(res.data);
      })
      .catch((err) => console.log(err));
  }, [coords]);

  console.log(temperature);

  return (
    <div className="App">
      {weather ? (
        <WeatherCard weather={weather} temperature={temperature} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
