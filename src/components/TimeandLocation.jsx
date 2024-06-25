import React from 'react';

const TimeandLocation = ({ weatherData }) => {
  if (!weatherData) {
    return <p>Loading weather data...</p>;
  }
  const{city,country,dateAndTime} = weatherData;
  return (
    <div>
      <div className='flex items-center justify-center my-6'>
        <p className='texl-xl font-extralight'>{dateAndTime}</p>
      </div>
      <div className='flex items-center justify-center'>
        <p className='text-3xl font-medium'>{city}, {country} </p>
      </div>
    </div>
  )
}

export default TimeandLocation
