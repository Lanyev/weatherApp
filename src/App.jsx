import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temperature, setTemperature] = useState();
  const [isCelsius, setIsCelsius] = useState(true);

  const changeUnitTemperature = () => setIsCelsius(!isCelsius);

  const success = ({ coords: { latitude, longitude } }) => {
    console.log({ latitude, longitude });
    setCoords({
      latitude,
      longitude,
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const { latitude, longitude } = coords;
      const API_KEY = "6babd9f397072cd3e87b5238726de264";
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

      axios
        .get(URL)
        .then(({ data }) => {
          const kelvin = data.main.temp;
          const celsius = (data.main.temp - 273.15).toFixed();
          const fahrenheit = (celsius * 9) / 5 + 32;
          setTemperature({ celsius, fahrenheit });
          setWeather(data);
        })
        .catch((err) => console.log(err));
    }
  }, [coords]);

  return (
    <div className="App">
      {weather ? (
        <WeatherCard
          weather={weather}
          temperature={temperature}
          isCelsius={isCelsius}
          setIsCelsius={setIsCelsius}
          changeUnitTemperature={changeUnitTemperature}
        />
      ) : (
        <img src="src/assets/752.svg" alt="" />
      )}
    </div>
  );
}

export default App;
