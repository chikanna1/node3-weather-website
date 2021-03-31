const request = require("request");

const forecast = (latitude, longtitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=2b5d22d998ef4f5418067b1b413b9f79&query=" +
    latitude +
    "," +
    longtitude +
    "&units=f";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to Connect to Weather Service", undefined);
    } else if (body.error) {
      callback("Unable to Find Location", undefined);
    } else {
      forecast_response =
        "It is Currently " +
        body.current.temperature +
        " degrees out. There is a " +
        body.current.precip +
        " chance of rain and the weather feels like " +
        body.current.feelslike +
        " degrees out." +
        "The Humidity is " +
        body.current.humidity;
      callback(undefined, forecast_response);
    }
  });
};

module.exports = forecast;
