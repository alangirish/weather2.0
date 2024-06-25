import { BiSearch, BiCurrentLocation } from "react-icons/bi";
import { getFormattedWeatherData } from "../services/weatherService";
import React, { useState } from "react";

const Input = ({ setQuery }) => {
  const [searchTerm, setSearchTerm] = useState(''); // State to store search term

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = async () => {
    if (!searchTerm) {
      // Handle empty search (console log for debugging)
      console.error('Empty search term!');
      return;
    }

    try {
      const formattedData = await getFormattedWeatherData('weather', { q: searchTerm });
      setQuery(searchTerm); // Update parent component's query state
      // Handle the response data (formattedData) if needed (placeholder)
      console.log('Formatted weather data:', formattedData); // For debugging
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Handle errors (consider displaying to user in App.js)
    }
  };

  return (
    <div className='flex flex-row justify-center my-6'>
      <div className="flex flex-row items-center justify-center w-3/4 space-x-4">
        <input
          type="text"
          placeholder='Search by City'
          className='text-gray-500 text-xl p-2 font-light w-full shadow-xl capitalize focus:outline-none placeholder:lowercase'
          value={searchTerm}
          onChange={handleChange}
        />
        <BiSearch
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125"
          onClick={handleClick}
        />
        <BiCurrentLocation size={30} className="cursor-pointer transition ease-out hover:scale-125" />
      </div>
      <div className="flex flex-row w-1/4 items-center justify-center">
        <button className="text-2xl font-medium transition ease-out hover:scale-125">°C</button>
        <p className="text-2xl font-medium mx-1">|</p>
        <button className="text-2xl font-medium transition ease-out hover:scale-125">°F</button>
      </div>
    </div>
  );
};

export default Input;
