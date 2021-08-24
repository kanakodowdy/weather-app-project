function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(response.data.dt * 1000);

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#searchInput");
  cityElement.innerHTML = cityInput.value;

  let apiKey = "7e9cd1252a8ce0c8d0de0776fa7e9fac";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=7e9cd1252a8ce0c8d0de0776fa7e9fac&units=${unit}`;

  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("form");
form.addEventListener("submit", search);

function showTemperature(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let temperatureElement = document.querySelector("#temp");
  let temperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `Current Temperature : ${temperature}°C`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidity = Math.round(response.data.main.humidity);
  humidityElement.innerHTML = `Humidity : ${humidity}%`;

  let windElement = document.querySelector("#wind");
  wind = Math.round(response.data.wind.speed);
  windElement.innerHTML = `Wind : ${wind}km/h`;

  let apiKey = "7e9cd1252a8ce0c8d0de0776fa7e9fac";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7e9cd1252a8ce0c8d0de0776fa7e9fac&units=${unit}`;

  axios.get(apiUrl).then(showTemperature);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "7e9cd1252a8ce0c8d0de0776fa7e9fac";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7e9cd1252a8ce0c8d0de0776fa7e9fac&units=${unit}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
