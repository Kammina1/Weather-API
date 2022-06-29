var pastCity = ["Salt Lake", "Utah", "Raleigh", "Austin", "Shit"]
var dateEl = document.getElementById("date")
var currentTemp;
var currentWind;
var currentHumidity;
var currentUvi;
var currentTemp = document.getElementById("current-temp")
const API_KEY = "5a34ba45183b84a351de83286e31ee9d"
var citySearched = document.getElementById("search-area").value;
console.log(citySearched);

function pastCitySearches() {
    var searchedCities = document.getElementById("searchedCities")
    pastCity.forEach (city => {
        var cityDiv = document.createElement("div")
        cityDiv.classList.add("justify-content-center", "col-5", "p-2")
        var cityBtn = document.createElement("button")
        cityBtn.classList.add("button2", "w-100", "p-2")
        var cityBreak = document.createElement("div")
        cityBreak.classList.add("w-100")
        cityBtn.innerHTML = city
        cityDiv.appendChild(cityBtn)
        searchedCities.appendChild(cityDiv)
        searchedCities.appendChild(cityBreak)
    })
    
}
pastCitySearches();

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success)
        let {latitude, longitude} = success.coords
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts,daily&units=imperial&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data)
        showWeather(data);
        }) 
    })
}
getWeatherData();

function showWeather(data) {
    let {temp, humidity, wind_speed, uvi} = data.current;
    var currentTemp = temp
    var currentWind = wind_speed
    var currentHumidity = humidity
    var currentUvi = uvi
}