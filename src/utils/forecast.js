const request = require('request');

const forecast = (longitude, latitude, callback) => {
  const url = 'https://api.darksky.net/forecast/c749d96170a9845ed5f3e63112613a9c/' + longitude + ',' + latitude + '?units=si';
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

