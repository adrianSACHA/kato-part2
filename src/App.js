import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "c99495cd9bff3b6d02b414b31921081a";

function WeatherPage() {
  const [city, setCity] = useState("London");
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
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
    <div className="sm:text-xs flex flex-col justify-center mt-10 mb-20 ml-auto mr-auto pt-5 pb-5 items-center bg-white w-1/2 max-sm:w-full rounded-3xl">
      <h1 className="text-2xl md:text-4xl">Weather Page</h1>
      <div className="flex p-2 max-sm:flex-col">
        <label htmlFor="city-select">Select a city:</label>
        <select id="city-select" value={city} onChange={handleCityChange}>
          <option value="London">London</option>
          <option value="Munich">München</option>
        </select>
      </div>
      {isLoading ? (
        <div className="text-4xl h-screen flex pt-36 max-sm:pt-20">Loading...</div>
      ) : (
        <table className="table-fixed border-collapse border border-slate-500 max-sm:text-xs">
          <thead>
            <tr>
              <th className="border border-slate-600 p-2">Date and Time</th>
              <th className="border border-slate-600 p-2">Humidity</th>
              <th className="border border-slate-600 p-2">Temperature</th>
            </tr>
          </thead>
          <tbody>
            {weatherData.map((item, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-slate-50 hover:bg-slate-200"
              >
                <td className="text-center border border-slate-700 p-2">
                  {item.dt_txt}
                </td>
                <td className="text-center border border-slate-700 p-2">
                  {item.humidity}
                </td>
                <td className="text-center border border-slate-700 p-2">
                  {item.temp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default WeatherPage;
