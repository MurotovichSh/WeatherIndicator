const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});
app.post("/", function(req, res) {
  const q = req.body.cityName;
  const appid = "7a1d95b4bb0b912f6e9dd3db29794961";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + q + "&appid=" + appid + "&units=metric"


  https.get(url, function(response) {

    response.on("data", function(data) {

      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const descript = weatherData.weather[0].description;
      const id = weatherData.weather[0].icon;

      const imageUrl = "http://openweathermap.org/img/wn/" + id + "@2x.png"
      res.write("<h1>The temperature in " + q + " is " + temp + " degrees right now </h1>");
      res.write("<p> The weather is currently " + descript);
      res.write("<br>")
      res.write("<img src = " + imageUrl + ">");
      res.send();
    })
  })
})






app.listen(process.env.PORT || 3000);
