var dateEl = document.getElementById("date");
var currentTemp;
var currentWind;
var currentHumidity;
var currentUvi;
var currentTemp = document.getElementById("current-temp");
const API_KEY = "5a34ba45183b84a351de83286e31ee9d";
// Add's past city searches in the form of a button. 
function appendCities() {
  var searchInput = document.getElementById("search-area");
  var pastCity = searchInput.value;
  console.log(pastCity);
  var searchedCities = document.getElementById("searchedCities");
  var cityDiv = document.createElement("div");
  cityDiv.classList.add("justify-content-center", "col-5", "p-2");
  var cityBtn = document.createElement("button");
  cityBtn.classList.add("button2", "w-100", "p-2");
  var cityBreak = document.createElement("div");
  cityBreak.classList.add("w-100");
  cityBtn.innerHTML = pastCity;
  cityBtn.id = pastCity;
  cityBtn.onclick = function () {
    getInfo(pastCity);
  };
  cityDiv.appendChild(cityBtn);
  searchedCities.appendChild(cityDiv);
  searchedCities.appendChild(cityBreak);
}
// Get current weather conditions for a searched city.
function getWeatherData() {
  var searchInput = document.getElementById("search-area");
  var pastCity = searchInput.value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${pastCity}&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=hourly,minutely,alerts,daily&units=imperial&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data2) => {
          console.log(data2);
          showWeather(data2);
        });
    });
}
// show current weather for searched city. 
function showWeather(data) {
  var searchInput = document.getElementById("search-area");
  var pastCity = searchInput.value;
  document.getElementById("city").innerHTML =
    "City: " + pastCity + " " + getDate();
  let { temp, humidity, wind_speed, uvi } = data.current;
  document.getElementById("temperature").innerHTML = "Temp: " + temp;
  document.getElementById("wind").innerHTML =
    "Wind speed: " + wind_speed + "mph";
  document.getElementById("hum").innerHTML = "Humidity: " + humidity;
  document.getElementById("uvindex").innerHTML = "UV Index: " + uvi;
}
function getDate(dateString = null) {
  var date;
  if (dateString) {
    date = new Date(dateString);
  } else {
    date = new Date();
  }
  return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
}
// create a function to get all information after user clicks the search button. 
function getInfo(pastCity = null) {
  var searchedCity = " ";
  if (!pastCity) {
    var citySearched = document.getElementById("search-area");
    searchedCity = citySearched.value;
  } else {
    searchedCity = pastCity;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&appid=5a34ba45183b84a351de83286e31ee9d`
  )
    .then((response) => response.json())
    .then((data) => {
      for (i = 0; i < 5; i++) {
        var day = i * 8;
        document.getElementById("day" + (i + 1) + "Temp").innerHTML =
          "Temp: " +
          (Number(data.list[day].main.temp - 273) * 1.8 + 32).toFixed(1);
      }
      for (i = 0; i < 5; i++) {
        var day = i * 8;
        document.getElementById("day" + (i + 1) + "Wind").innerHTML =
          "Wind: " + Number(data.list[day].wind.speed) + " mph";
      }
      for (i = 0; i < 5; i++) {
        var day = i * 8;
        document.getElementById("day" + (i + 1) + "Humidity").innerHTML =
          "Humidity: " + Number(data.list[day].main.humidity);
      }
      for (i = 0; i < 5; i++) {
        var day = i * 8;
        document.getElementById("day" + (i + 1) + "Date").innerHTML = getDate(
          data.list[day].dt_txt
        );
      }
      console.log(data);
    })

    .catch((err) => alert("Something went wrong"));
  if (!pastCity) {
    appendCities();
  }
}
