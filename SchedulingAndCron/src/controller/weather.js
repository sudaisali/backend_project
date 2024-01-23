const WeatherData = require('../models/weatherdb')
const axios = require('axios');
const cron = require('node-cron');


const fetchAndSaveWeatherData = async (req,res) => {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const lat = 37.7749; 
    const lon = -122.4194; 
    const apiKey = '15a2b2ac8bff6285002efe86043c89be'; 
  
    try {
      const response = await axios.get(apiUrl, {
        params: { lat, lon, appid: apiKey },
      });
  
      const { name, main, wind } = response.data;
      const tempInFahrenheit = (main.temp * 9) / 5 + 32;
      const weatherData = new WeatherData({
        name: name,
        temp: `${tempInFahrenheit}F`,
        humidity: main.humidity,
        speed: wind.speed,
      });
      await weatherData.save()
      cron.schedule('/1 * * * * *', async () => {
        await fetchAndSaveWeatherData();
      });
  
      console.log('Weather data saved successfully:', weatherData);
    } catch (error) {
      console.error('Error fetching or saving weather data:', error.message);
    }
  };
  
 

module.exports = {fetchAndSaveWeatherData}


    // * * * * *
    // | | | | |
    // | | | | +----- Day of the week (0 - 6) (Sunday is both 0 and 7)
    // | | | +------- Month (1 - 12)
    // | | +--------- Day of the month (1 - 31)
    // | +----------- Hour (0 - 23)
    // +------------- Minute (0 - 59)