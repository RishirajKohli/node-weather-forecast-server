const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
    address
  )}.json?access_token=pk.eyJ1Ijoia29obGktcmlzaGlyYWoiLCJhIjoiY2tlMTJmNmFxMjl1ejJxa2oyaHVsMmtieCJ9.1wSgCKaBLPUPaIbHDeHW0A&limit=1`;
  request({ url, json: true }, (error, { body: { features = [] } }) => {
    if (error) {
      callback("Unable to connect to geocoding service");
    } else if (features.length === 0) {
      callback("Can't find location of the given address");
    } else {
      callback(undefined, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name,
      });
    }
  });
};
module.exports = geocode;
