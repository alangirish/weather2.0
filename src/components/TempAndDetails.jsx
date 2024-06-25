import { FaThermometerEmpty, FaThermometerHalf } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import  {MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { FiWind } from "react-icons/fi";
import React from "react";
const TempAndDetails = ({ weatherData }) => {
  if (!weatherData) {
    return <p>Loading weather data...</p>;
  }
  const {
    city,
    description,
    temperature,
    feelsLike,
    humidity,
    windSpeed,
    sunrise,
    sunset,
    highestTemp,
    lowestTemp,
    iconUrl,
  } = weatherData;

  const verticalDetails = [
  
    {
      id: 1,
      Icons: FaThermometerHalf,
      title: "Feels Like",
      value: `${feelsLike}`,
    },
    {
      id: 2,
      Icons: BiSolidDropletHalf,
      title: "Humidity",
      value: humidity ? `${humidity}%` : "Not available", // Handle missing data
    },
    {
      id: 3,
      Icons: FiWind,
      title: "Wind",
      value: windSpeed ? `${windSpeed}` : "Not available", // Handle missing data
    },
  ];

  const horizontalDetails = [
    {
      id: 1,
      Icons: GiSunrise,
      title: "Sunrise",
      value: sunrise ? sunrise : "Not available", // Handle missing data
    },
    {
      id: 2,
      Icons: GiSunset,
      title: "Sunset",
      value: sunset ? sunset : "Not available", // Handle missing data
    },
    {
      id: 3,
      Icons: MdKeyboardArrowUp,
      title: "High",
      value: highestTemp ? `${highestTemp}°C` : "Not available", // Handle missing data
    },
    {
      id: 4,
      Icons: MdKeyboardArrowDown,
      title: "Low",
      value: lowestTemp ? `${lowestTemp}°C` : "Not available", // Handle missing data
    },
  ];
  
  

  return(
    <div>
      <div className="flex items-center justify-center py-6 text-cyan-300 text-xl">
        <p className="capitalize">{description}</p>
      </div>
      <div className="flex flex-row items-center justify-between py-3">
        <img src={iconUrl} alt="weather icon"  className="w-20"/>
        <p className="text-5xl">{temperature}</p>
        <div className="flex flex-col space-y-3 items-start">
          {verticalDetails.map(({id,Icons,title, value}) => {
            return(
              <div key={id} className="flex font-light text-sm items-center justify-center">
                <Icons size={18} className="mr-1"/>
                {title}: <span className="font-medium ml-1">{value}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-10 text-sm py-3">
        {horizontalDetails.map(({id,Icons,title,value}) => {
          return(
            <div key={id} className="flex font-light text-sm items-center justify-center">
              <Icons size={30} className="mr-1"/>
              {title}: <span className="font-medium ml-1">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TempAndDetails
