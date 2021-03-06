const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Rishabh Kohli",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Rishabh Kohli",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Rishabh Kohli",
  });
});

app.get("/weather", (req, res) => {
  console.log("add", req.query);
  if (!req.query.address) {
    return res.send({
      error: "Must provide address in query string",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(
        latitude,
        longitude,
        (
          error,
          { temperature, feelslike, humidity, weather_descriptions } = {}
        ) => {
          if (error) {
            return res.send({ error });
          }

          res.send({
            location,
            forecast:
              "Weather Description: " +
              weather_descriptions[0] +
              ".It is currently " +
              temperature +
              " degree celsius out.It feels like " +
              feelslike +
              " degree celsius.Air humidity is " +
              humidity +
              "%.",
            address: req.query.address,
          });
        }
      );
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Rishabh Kohli",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Rishabh Kohli",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port: " + port);
});
