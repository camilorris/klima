if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    fetchCurrentWeather(latitude, longitude);
  });
}

const api = "https://fcc-weather-api.glitch.me/api/current?";

function fetchCurrentWeather(latitude, longitude) {
  fetch(api + "lat=" + latitude + "&lon=" + longitude)
  .then(function(data) {
    return data.json()
  })
  .then(function(klima) {
    console.log(klima)
    const weatherCountry = klima.sys.country
    const mainWeather = klima.weather[0].main
    const weatherHumidity = klima.main.humidity
    const weatherMax = klima.main.temp_max
    const weatherMin = klima.main.temp_min
    const weatherTemp = klima.main.temp

    const mainWeatherContainer = document.querySelector(".main-weather")
    const weatherCountryContainer = document.querySelector(".weather-country")
    const weatherHumidityContainer = document.querySelector(".weather-humidity")
    const weatherMaxContainer = document.querySelector(".weather-max")
    const weatherMinContainer = document.querySelector(".weather-min")
    const weatherTempContainer = document.querySelector(".weather-temp")

    weatherHumidityContainer.innerText = "Humidity: " + weatherHumidity
    weatherCountryContainer.innerText = weatherCountry
    mainWeatherContainer.innerText = mainWeather
    weatherMaxContainer.innerText = "Max Temp: " + weatherMax + " °C"
    weatherMinContainer.innerText = "Min Temp: " + weatherMin + " °C"
    weatherTempContainer.innerText = "Temp: " + weatherTemp + " °C"
  })
}

// todo:
// agregar estilos

