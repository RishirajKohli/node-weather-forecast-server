const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=a307680bf61fab111173e11af96948e9&query=${encodeURIComponent(
    lat
  )},${encodeURIComponent(long)}`;
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Can't found weather info for given input", undefined);
    } else {
      const current = body.current;
      callback(undefined, current);
    }
  });
};
module.exports = forecast;
