import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "c99495cd9bff3b6d02b414b31921081a";

function WeatherPage() {
  const [city, setCity] = useState("London");
  const [weatherData, setWeatherData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
    );
    const data = response.data;
    console.log(data);
    const weather = data.list.map((item) => ({
      dt_txt: item.dt_txt,
      humidity: item.main.humidity,
      temp: item.main.temp,
    }));
    setWeatherData(weather);
  };

  useEffect(() => {
    fetchData();
  }, [city]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 10000);
    return () => clearInterval(interval);
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div>
      <h1>Weather Page</h1>
      <label htmlFor="city-select">Select a city:</label>
      <select id="city-select" value={city} onChange={handleCityChange}>
        <option value="London">London</option>
        <option value="Munich">München</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Date and Time</th>
            <th>Humidity</th>
            <th>Temperature</th>
          </tr>
        </thead>
        <tbody>
          {weatherData.map((item, index) => (
            <tr key={index}>
              <td>{item.dt_txt}</td>
              <td>{item.humidity}</td>
              <td>{item.temp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WeatherPage;
