var dateEl = document.getElementById("date")
var currentTemp;
var currentWind;
var currentHumidity;
var currentUvi;
var currentTemp = document.getElementById("current-temp")
const API_KEY = "5a34ba45183b84a351de83286e31ee9d"

function pastCitySearches() {
    var searchedCities = document.getElementById("searchedCities")
    var pastCity = searchedCities.value;
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
    document.getElementById('temperature').innerHTML = "Temp: " + temp
    document.getElementById('wind').innerHTML = "Wind speed: " + wind_speed + "mph"
    document.getElementById('hum').innerHTML =  "Humidity: " + humidity
    document.getElementById('uvindex').innerHTML = "UV Index: " + uvi
}

function getInfo() {
    var citySearched = document.getElementById("search-area");
    var searchedCity = citySearched.value;

 fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&appid=5a34ba45183b84a351de83286e31ee9d`)
 
 .then(response => response.json())
 .then (data =>{
    for(i=0;i<5;i++) {
        document.getElementById("day"+ (i+1)+ "Temp").innerHTML = "Temp: " + Number(data.list[i].main.temp - 273).toFixed(1) * 1.8 + 32;
    }
    for(i=0;i<5;i++) {
        document.getElementById("day"+ (i+1)+ "Wind").innerHTML = "Wind: " + Number(data.list[i].wind.speed) + " mph";
    }
    for(i=0;i<5;i++) {
        document.getElementById("day"+ (i+1)+ "Humidity").innerHTML = "Humidity: " + Number(data.list[i].main.humidity);
    }
    console.log(data)
 })

 .catch(err => alert("Something went wrong"))
 pastCitySearches();
}