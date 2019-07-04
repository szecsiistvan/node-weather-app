const request = require('request');

const forecast = (longitude, latitude, callback) => {
  const url = 'https://api.darksky.net/forecast/c749d96170a9845ed5f3e63112613a9c/' + longitude + ',' + latitude + '?units=si&lang=hu';
  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to location services', undefined);
    } else if (body.error) {
      callback('Unable to find data for the location', undefined);
    } else {
      callback(undefined, `${body.hourly.data[0].summary} It is currently ${body.currently.temperature} out there. There is ${body.currently.precipProbability * 100}% chance of rain.`);
    }
  });
};

module.exports = forecast;


//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
