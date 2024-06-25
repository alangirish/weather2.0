import React, { useState, useEffect } from 'react';
import TopButtons from './components/TopButtons';
import Input from './components/Input';
import TimeandLocation from './components/TimeandLocation';
import TempAndDetails from './components/TempAndDetails';
import Forecast from './components/Forecast';

import { getFormattedWeatherData, getFormattedForecastData } from './services/weatherService';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [query, setQuery] = useState("bengaluru");

  const getWeather = async () => {
    const data = await getFormattedWeatherData("weather", { q: query });
    const forecast = await getFormattedForecastData("forecast", { q: query });
    setWeatherData(data);
    setForecastData(forecast);
  };

  useEffect(() => {
    getWeather(); // Fetch weather data on component mount
  }, [query]);

  return (
    <div className='mx-auto max-w-screen-2xl mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 from-cyan-600 to-blue-700'>
      <TopButtons setQuery={setQuery} />
      <Input setQuery={setQuery} />
      {weatherData && query ? ( // Check both weatherData and query
        <>
          <TimeandLocation weatherData={weatherData} />
          <TempAndDetails weatherData={weatherData} />
          {forecastData && <Forecast forecastData={forecastData} />}
        </>
      ) : null}
    </div>
  );
};

export default App;
