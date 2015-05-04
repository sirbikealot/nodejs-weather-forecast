//Problem: User enters a simple cli command that returns the weather forecast for a given zipcode
//Solution: 

  //Use Node.js to connect to zipcodeapi.com

var zipcode = process.argv.slice(2);
var https = require("https");
var ZipAPI_KEY = "Wfaz2r4dFnwtPyftSjF0v6V7HjtbOEwLUGkX8obOLIhBgx58QK9lR5tzpWKdBgZw";
var DarkSkyAPI_KEY = "a3abc3e4932e3982c14456476799d45f"

function getLatLong(zipcode){
  var requestLatLong = https.get("https://www.zipcodeapi.com/rest/" + ZipAPI_KEY + "/info.json/" + zipcode + "/degrees", function(response){
    var body = "";

    //Read the data

    response.on("data", function(chunk) {
      body += chunk;
    });
    response.on("end", function() {

      //Return lat, long based on zipcode

      var locationInfo = JSON.parse(body)
      var latitude = locationInfo.lat;
      var longitude = locationInfo.lng;

      //Print Location
      var city = locationInfo.city;
      var state = locationInfo.state;
      console.log("Weather forecast for " + city + ", " + state + ": ");

      //Use Node.js to connect to forecast.io

      var requestForecast = https.get("https://api.forecast.io/forecast/" + DarkSkyAPI_KEY + "/" + latitude + "," + longitude , function(response){
        
        var body = "";

        response.on("data", function(chunk){
          body += chunk;
        });

        response.on("end", function(){

          var fullForecast = JSON.parse(body);
          var hourlyForecast = fullForecast.hourly.summary;
          var dailyForecast = fullForecast.daily.summary;

          //Print weather forecast based on lat,long
          console.log("For today: " + hourlyForecast);
          console.log("For the rest of the week: " + dailyForecast);

        });

      });

      //Error handler
      requestForecast.on("error", function(e) {
        console.error(e);

      });

    });

  });

  //Error handler
  requestLatLong.on("error", function(e) {
    console.error(e);
  });

};

getLatLong(zipcode);

