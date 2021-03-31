const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { response } = require("express");
console.log(__dirname);
console.log(path.join(__dirname, "../public"));
const app = express();
const port = process.env.PORT || 3000;

//Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Require forecast
const forecast = require("./utils/forecast");
const geocode = require("./utils/utils");

//Setup HandleBars Engine and Views Location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setp Static Directory to Serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Chika Nna",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Chika Nna",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Chika Nna",
    message: "This is a help message",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "An Address Must Be Provided!",
    });
  }
  geocode(req.query.address, (error, response = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(response.latitude, response.longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location: response.location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You Must Provide a Search Term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Chika Nna",
    error: "Help Article Not Found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Chika Nna",
    error: "Page Not Found",
  });
});

app.listen(port, () => {
  console.log("Server is up on Port " + port);
});
