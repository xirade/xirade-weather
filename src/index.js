import Weather from "./scripts/weather";
import "./styles/styles.css";
import day from "./img/day.svg";
import night from "./img/night.svg";

const cityForm = document.querySelector(".change-location");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

// import icons
const importAll = (i) => {
    const path = require.context('./img/icons', false, /\.svg$/)
    return path.keys().map(path)
}

// Weather class
const forecast = new Weather();

const updateUI = (data) => {
  // destructure properties
  const { cityDetails, weather } = data;

  // update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  // update the night/day & icon images
  const iconSrc = importAll()[weather.WeatherIcon];
  icon.src = iconSrc.default;

  let timeSrc = null;
  weather.IsDayTime ? (timeSrc = day) : (timeSrc = night);
  time.src = timeSrc;

  // remove d-none class if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

cityForm.addEventListener("submit", (e) => {
  // prevent default action
  e.preventDefault();

  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update city ui with new city
  forecast
    .updateCity(city)
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => {
      console.log(err.message);
    });

  // set local storage
  localStorage.setItem("city", city);
});

// check if city exist in localStorage
if (localStorage.getItem("city")) {
  forecast
    .updateCity(localStorage.getItem("city"))
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
}
