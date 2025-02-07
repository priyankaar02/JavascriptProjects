document.addEventListener("DOMContentLoaded", () => {
  const cityInfo = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityName = document.getElementById("city-name");
  const tempDisplay = document.getElementById("temperature");
  const description = document.getElementById("description");

  const errorMessage = document.querySelector("#error-message");

  const API_KEY = "your_api_key_here";

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInfo.value.trim();
    if (!city) return;

    //Note: server may throw an error and server/database is always in another continent so it always takes time
    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url); //wait till the promise is fulfilled and then get me the response
    console.log(response);
    console.log(typeof response);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const weatherResponse = await response.json();
    return weatherResponse;
  }

  function displayWeatherData(data) {
    console.log(data);
    const { name, main, weather } = data;
    cityName.textContent = name;
    tempDisplay.textContent = `Temperature ${main.temp}`;
    description.textContent = `Weather: ${weather[0].description}`;

    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
