var pastCity = ["Salt Lake", "Utah", "Raleigh", "Austin", "Shit"]

function pastCitySearches() {
    console.log(pastCity)
    var searchedCities = document.getElementById("searchedCities")
    pastCity.forEach (city => {
        var cityDiv = document.createElement("div")
        cityDiv.classList.add("justify-content-center", "col-3", "p-2")
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
