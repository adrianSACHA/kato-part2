import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "./logo_white_cropped.png";
import Elipse from "./elipse.svg";

const API_KEY = "c99495cd9bff3b6d02b414b31921081a";

function WeatherPage() {
  const [city, setCity] = useState("London");
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = response.data;
    const weather = data.list.map((item) => ({
      dt_txt: item.dt_txt,
      humidity: item.main.humidity,
      temp: item.main.temp,
      feels_like: item.main.feels_like,
      weather: item.weather[0].main,
      icon: item.weather[0].icon,
    }));
    setWeatherData(weather);

    setTimeout(() => {
      setIsLoading(false);
    }, 1800);
  };

  useEffect(() => {
    fetchData();
  }, [city]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 30000);
    return () => clearInterval(interval);
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="sm:text-xs flex flex-col justify-center mt-10 mb-20 ml-auto mr-auto pt-5 pb-5 items-center bg-slate-800 w-1/2 max-sm:w-full rounded-3xl">
      <h1 className="text-white flex flex-row text-2xl md:text-4xl">
        Weather Page
      </h1>
      <div className="flex p-2 max-sm:flex-col text-white">
        <label htmlFor="city-select">Select a city:</label>
        <select
          id="city-select"
          className="bg-slate-800"
          value={city}
          onChange={handleCityChange}
        >
          <option value="London">London</option>
          <option value="Elbląg">Elbląg</option>
          <option value="Munich">München</option>
        </select>
      </div>
      {isLoading ? (
        <div className="h-screen flex max-sm:pt-10">
          <img
            className="animate-spin h-auto max-sm:h-1/5"
            src={Elipse}
            alt="Logo"
          />
        </div>
      ) : (
        <table className="table-auto border-none  max-sm:text-xs w-1/2">
          <thead>
            <tr className="text-white">
              <th className="border-none  bg-slate-600 p-2">Date and Time</th>
              <th className="border-none  bg-slate-600 p-2">Humidity</th>
              <th className="border-none  bg-slate-600 p-2">Temp</th>
              <th className="border-none  bg-slate-600 p-2">Feels Like</th>
              <th className="border-none  bg-slate-600 p-2">Weather</th>
            </tr>
          </thead>
          <tbody>
            {weatherData.map((item, index) => (
              <tr
                key={index}
                className="odd:bg-slate-400 even:bg-slate-300 hover:bg-slate-200"
              >
                <td className="text-center border-none p-2">{item.dt_txt}</td>
                <td className="text-center border-none p-2">
                  {item.humidity}%
                </td>
                <td className="text-center border-none p-2">
                  {item.temp.toFixed(0)}&#176;
                </td>
                <td className="text-center border-none p-2">
                  {item.feels_like.toFixed(0)}&#176;
                </td>
                <td className="flex flex-col items-center justify-center justify-items-center border-none p-2">
                  {item.weather}
                  <img
                    className="flex justify-items-center w-5 h-5"
                    src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                    alt="weather"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <img className="w-20 h-auto mt-3" src={Logo} alt="Logo" />
    </div>
  );
}

export default WeatherPage;
