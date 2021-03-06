const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiY2hpa2FubmExIiwiYSI6ImNrbWc2bzZnNTB2OG8ybnBqbTJqMnhvNDYifQ.pdv7jLgQ2sufMxRDtIBvtw&limit=1";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to Connect to Location Services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to Find Location. Try another Search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
