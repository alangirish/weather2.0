import axios from 'axios';

async function getWeatherData(infoType, searchParams) {
  const key = import.meta.env.VITE_API_KEY;
  const baseURL = "https://api.openweathermap.org/data/2.5/";

  try {
    const url = new URL(baseURL + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: key });

    const response = await axios.get(url.toString());

    if (response.status !== 200) {
      throw new Error(`API request failed with status code: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

async function getFormattedWeatherData(infoType, searchParams) {
  try {
    const weatherData = await getWeatherData(infoType, searchParams);

    if (!weatherData) {
      return null;
    }

    const currentDate = new Date();
    const iconBaseUrl = 'https://openweathermap.org/img/wn/';
    const formattedData = {
      city: weatherData.name || 'City not available',
      description: weatherData.weather?.[0]?.description || 'Description not available',
      temperature: weatherData.main?.temp ? `${(weatherData.main.temp - 273.15).toFixed(0)}°C` : 'Temperature not available',
      humidity: weatherData.main?.humidity ? `${weatherData.main.humidity}%` : 'Humidity not available',
      windSpeed: weatherData.wind?.speed ? `${(weatherData.wind.speed * 3.6).toFixed(0)} Kmph` : 'Wind speed not available',
      sunrise: weatherData.sys?.sunrise ? formatTime(weatherData.sys.sunrise) : 'Sunrise not available',
      sunset: weatherData.sys?.sunset ? formatTime(weatherData.sys.sunset) : 'Sunset not available',
      feelsLike: weatherData.main?.feels_like ? `${(weatherData.main.feels_like-273.15).toFixed(0)}°C` : 'Feels like not available',
      highestTemp: weatherData.main?.temp_max ? `${(weatherData.main.temp_max-273.15).toFixed(0)}` : 'Highest temp not available',
      lowestTemp: weatherData.main?.temp_min ? `${(weatherData.main.temp_min-273.15).toFixed(0)}` : 'Lowest temp not available',
      dateAndTime: currentDate.toLocaleString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: false
      }),
      iconUrl: weatherData.weather?.[0]?.icon ? `${iconBaseUrl}${weatherData.weather[0].icon}@2x.png` : null,
      country: weatherData.sys?.country ? `${weatherData.sys.country}` : 'Country Unavailable',
      lat: weatherData.coord?.lat ? `${weatherData.coord.lat}` : 'Lat not available',
      lon: weatherData.coord?.lon ? `${weatherData.coord.lon}` : 'Lon not available',
    };

    console.log(formattedData);
    return formattedData;
  } catch (error) {
    console.error('Error formatting weather data:', error);
    return null;
  }
}

async function getFormattedForecastData(infoType, searchParams) {
  try {
    const forecastData = await getWeatherData(infoType, searchParams);

    if (!forecastData) {
      return null;
    }

    const formattedData = {
      city: forecastData.city.name || 'City not available',
      country: forecastData.city.country || 'Country not available',
      list: forecastData.list.map(entry => ({
        dt: entry.dt,
        main: {
          temp: entry.main.temp,
        },
        weather: entry.weather.map(w => ({
          description: w.description,
          icon: w.icon,
        })),
      })),
    };

    console.log(formattedData);
    return formattedData;
  } catch (error) {
    console.error('Error formatting forecast data:', error);
    return null;
  }
}

function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export { getFormattedWeatherData, getFormattedForecastData };
