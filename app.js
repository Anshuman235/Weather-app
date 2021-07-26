const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {

  const query = req.body.cityName;
  const appID = "ed9d0f857785c485cfe253c34dcaae79";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid="+ appID;

  https.get(url, function(response) {

    // console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>In " + query + ", it is " + temp + " degree celcius</h1>");
      res.write("<h3> The weather could be described as " + desc + " </h3>")
      res.write("<img src=" + imageURL + ">")
      res.send();

    })
  })

  // res.send("<h1>We runnin at our homie page</h1>")

})


app.listen(3000, function() {
  console.log("We @ port 3k");
})
