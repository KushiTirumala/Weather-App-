const button = document.getElementById("get-weather-btn");
const select = document.getElementById("city-select");

// Fetch weather data
async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather-proxy.freecodecamp.rocks/api/city/${city}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

// Display weather data
async function showWeather(city) {
  if (!city) return;

  const data = await getWeather(city);

  if (!data) {
    alert("Something went wrong, please try again later.");
    return;
  }

  const weather = data.weather?.[0] || {};
  const main = data.main || {};
  const wind = data.wind || {};

  document.getElementById("location").textContent =
    data.name ?? "N/A";

  document.getElementById("weather-main").textContent =
    weather.main ?? "N/A";

  document.getElementById("weather-icon").src =
    weather.icon ?? "";

  document.getElementById("main-temperature").textContent =
    main.temp ?? "N/A";

  document.getElementById("feels-like").textContent =
    main.feels_like ?? "N/A";

  document.getElementById("humidity").textContent =
    main.humidity ?? "N/A";

  document.getElementById("wind").textContent =
    wind.speed ?? "N/A";

  document.getElementById("wind-gust").textContent =
    wind.gust ?? "N/A";
}

button.addEventListener("click", () => {
  showWeather(select.value);
});
