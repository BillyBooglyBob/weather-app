import "./style/reset.css";
import "./style/style.css";
import "./style/style_small_window.css";

async function fetchData(location) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=1776b53e2301470f858132317231112&q=${location}`,
  );
  const jsonData = await response.json();
  return jsonData;
}

// use try-catch or append catch

// update the weather data on the screen
// function updateDisplay(locationInput) {
//   // select specific parts of the data and store as variables
//   let condition;
//   let country;
//   let city;
//   let temperature;
//   let feelsLike;
//   let wind;
//   let humidity;

//   fetchData(locationInput)
//     .then((data) => {
//       const { current } = data;
//       const { location } = data;
//       condition = current.condition.text;
//       country = location.country;
//       city = location.region;
//       temperature = current.temp_c;
//       feelsLike = current.feelslike_c;
//       wind = current.wind_kph;
//       humidity = current.humidity;

//       // update the screen display
//       const conditionDisplay = document.querySelector('weather-condition');
//       const locationDisplay = document.querySelector('weather-location');
//       const temperatureDisplay = document.querySelector('weather-temperature');
//       const feelsLikeDisplay = document.querySelector('weather-feels-like');
//       const windDisplay = document.querySelector('weather-wind');
//       const humidityDisplay = document.querySelector('weather-humidity');

//       conditionDisplay.textContent = condition;
//       locationDisplay.textContent = `${country}, ${city}`;
//       temperatureDisplay.textContent = temperature;
//       feelsLikeDisplay.textContent = feelsLike;
//       windDisplay.textContent = wind;
//       humidityDisplay.textContent = humidity;
//     })
//     .catch((error) => {
//       console.error('Not found');
//       // Handle the error, update the screen with the specific error message, etc.
//     });
// }

function updateDisplay(location) {
  let condition;
  let country;
  let city;
  let temperature;
  let feelsLike;
  let wind;
  let humidity;

  fetchData(location)
    .then((data) => {
      const current = data.current;
      const location = data.location;
      condition = current.condition.text;
      country = location.country;
      city = location.name;
      temperature = current.temp_c;
      feelsLike = current.feelslike_c;
      wind = current.wind_kph;
      humidity = current.humidity;

      // Log statements moved inside the then block
      console.log(data);
      // Update the screen display here or call another function to update it
      const conditionDisplay = document.querySelector(".weather-condition");
      const locationDisplay = document.querySelector(".weather-location");
      const temperatureDisplay = document.querySelector(".weather-temperature");
      const feelsLikeDisplay = document.querySelector(".weather-feels-like");
      const windDisplay = document.querySelector(".weather-wind");
      const humidityDisplay = document.querySelector(".weather-humidity");

      conditionDisplay.textContent = condition;
      locationDisplay.textContent = `${country}, ${city}`;
      temperatureDisplay.textContent = `${temperature}°C`;
      feelsLikeDisplay.textContent = `${feelsLike}°C`;
      windDisplay.textContent = `${wind}KPH`;
      humidityDisplay.textContent = `${humidity}%`;
    })
    .catch((error) => {
      console.error(error.message);
      const errorMessage = document.querySelector(".search-bar-error-message");
      errorMessage.textContent = "Invalid city name. Please try again.";
    });
}

// add event listener to the search bar
const searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const location = searchBar.value;
    updateDisplay(location);
  }
});

updateDisplay("Brisbane");
