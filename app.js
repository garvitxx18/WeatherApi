const express = require("express");
const { write } = require("fs");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const name = req.body.cityName;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    name +
    "&appid=30a847a9897246c5ed140fee4a2c6830&units=metric";
  https.get(url, function (response) {
    response.on("data", function (data) {
      const actualdata = JSON.parse(data);
      const temp = actualdata.main.temp;
      const icon = actualdata.weather[0].icon;
      console.log(icon);
      const imageurl = " http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write(
        "<h1>The temperature of " +
          name +
          " is  " +
          temp +
          " dgree celsius </h1>"
      );
      res.write("<img src =" + imageurl + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Runnig on sever 3000");
});
