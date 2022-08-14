import React, { useState, useEffect } from "react";
import Time from "./Time";
import axios from "axios";

// SCSS
import "./_Weather.scss";

// Icons
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import AirIcon from "@mui/icons-material/Air";
import InvertColorsIcon from "@mui/icons-material/InvertColors";

// Weather API Access
const API_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "5618fbbd091949dded7ca0de920ad246";

const Weather = ({ type, size }) => {
  const lat = 59.14195307747163;
  const long = 12.950645465876436;
  const lang = "sv";

  const [weather, setWeather] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // GET Weather data
    const getData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&lang=${lang}&units=metric`
        );
        setWeather(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  // Sets default type to "card" if not specified
  if (type === undefined || type === null) {
    type = "card";
  }

  return (
    <>
      {loading && <div>One moment please...</div>}
      {error && <div>{`Sorry! Can't get the data - ${error}`}</div>}
      {weather && (
        <section data-type={type} data-size={size}>
          <div className="container weather">
            <img
              className="weather_icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            ></img>
            <div className="weather_time_place">
              <h2>{weather.name}</h2>
              <Time />
            </div>
            <ul className="weather_values">
              <li>
                <DeviceThermostatIcon /> <span>{weather.main.temp} &deg;c</span>
              </li>
              <li>
                <AirIcon /> <span>{weather.wind.speed} m/s</span>
              </li>
              <li>
                <InvertColorsIcon />
                <span>{weather.main.humidity}</span>
              </li>
            </ul>
          </div>
        </section>
      )}
    </>
  );
};

export default Weather;
