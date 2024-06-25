import React from 'react';

const Forecast = ({ forecastData }) => {
  // Filter data to get one entry per day
  const filteredData = forecastData.list.filter((entry, index) => index % 8 === 0);

  return (
    <div>
      <div className='flex items-center justify-start mt-6'>
        <p className='font-medium uppercase'>5 Day Forecast</p>
      </div>
      <hr className='my-1' />
      <div className='flex items-center justify-between'>
        {filteredData.map((data, index) => (
          <div key={index} className='flex flex-col items-center justify-center'>
            <p className='font-light text-sm'>{new Date(data.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long' })}</p>
            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather icon" className="w-20" />
            <p className='font-medium'>{(data.main.temp - 273.15).toFixed()}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
