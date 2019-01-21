if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    fetchCurrentWeather(latitude, longitude);
  });
}

const api = "https://fcc-weather-api.glitch.me/api/current?";
let currentCelsiusTemp = 0;
let currentFarenheitTemp = 0;
let isCelsiusDegrees = true;

function fetchCurrentWeather(latitude, longitude) {
  fetch(api + "lat=" + latitude + "&lon=" + longitude)
    .then(function(data) {
      return data.json();
    })
    .then(function(klima) {
      console.log(klima);
      const weatherCountry = klima.sys.country;
      const mainWeather = klima.weather[0].main;
      const weatherHumidity = klima.main.humidity;
      const weatherTemp = klima.main.temp;
      const weatherIconUrl = klima.weather[0].icon;
      
      const weatherIconContainer = document.querySelector(".weather-icon")
      const weatherIcon = document.createElement("img")
      weatherIcon.src = weatherIconUrl
      weatherIconContainer.appendChild(weatherIcon)

      const mainWeatherContainer = document.querySelector(".weather-main");
      const weatherCountryContainer = document.querySelector(
        ".weather-country"
      );
      const weatherHumidityContainer = document.querySelector(
        ".weather-humidity"
      );
      const weatherTempContainer = document.querySelector(".weather-temp");
      const weatherType = document.querySelector(".weather-type");
        
      weatherIconContainer.appendChild(weatherIcon)
      weatherIconContainer.src = weatherIconUrl
      weatherHumidityContainer.innerText = "Humidity: " + weatherHumidity + "%";
      weatherCountryContainer.innerText = weatherCountry;
      mainWeatherContainer.innerText = mainWeather;
      weatherTempContainer.innerText = "Temp: " + weatherTemp;
      weatherType.innerText = " °C";

      currentCelsiusTemp = weatherTemp;

      weatherType.addEventListener("click", toggleTempType);
    });
}

function toggleTempType() {
  const weatherTempContainer = document.querySelector(".weather-temp");
  const weatherType = document.querySelector(".weather-type");

  if (isCelsiusDegrees) {
      if(currentFarenheitTemp === 0){
        currentFarenheitTemp =  currentCelsiusTemp * 9 / 5 + 32;
      }
    weatherTempContainer.innerText = "Temp: " + currentFarenheitTemp;
    weatherType.innerText = " °F";
  } else {
    weatherTempContainer.innerText = "Temp: " + currentCelsiusTemp;
    weatherType.innerText = " °C";
  }

  isCelsiusDegrees = !isCelsiusDegrees;
}
