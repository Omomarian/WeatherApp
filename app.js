const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.querySelector("#locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");

let cityInput = "London";

cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    e.preventDefault();
    cityInput = e.target.innerHTML;
    fetchWeatherData();
  });
});

form.addEventListener("submit", (e) => {
  console.log("hello");
  if (search.value.length == 0) {
    alert("please type in a city name");
  } else {
    cityInput = search.value;
    fetchWeatherData();
    search.value = "";
  }
  e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[new Date(`${day}/${month}/${year}`).getDay()];
}
function fetchWeatherData() {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=1315642cdac74197885142027241206&q=${cityInput}`
  )
    .then((response) => response.json())
    .then((data) => {
      temp.innerHTML = data.current.temp_c + "&#176;";
      conditionOutput.innerHTML = data.current.condition.text;
      const date = data.location.localtime;
      const y = parseInt(date.substr(0, 4));
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));
      const time = date.substr(11);
      dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${m}, ${m}, ${y}`;
      nameOutput.innerHTML = data.location.name;
      const iconId = data.current.condition.icon;
      icon.src = iconId;
      timeOutput.innerHTML = time;
      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + "km/h";

      //set default time of the day
      let timeOfDay = "day";
      //get the unique id for each weather condition
      const code = data.current.condition.code;
      //change to night if its night time in the city
      if (!data.current.is_day) {
        timeOfDay = "night";
      }
      if (code == 1000) {
        /* set the background image to clear if the weather is clear */
        app.style.backgroundImage = `
    url(/images/${timeOfDay}/clear.jpg)`;

        btn.style.background = "#e5ba92";
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
        //some things for clody weather
      } else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
      ) {
        app.style.backgroundImage = `
        url(/images/${timeOfDay}/cloudy.jpg)`;
        btn.style.background = "#fa6d1b";
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        } else if (
          code == 1063 ||
          code == 1069 ||
          code == 1072 ||
          code == 1150 ||
          code == 1153 ||
          code == 1180 ||
          code == 1186 ||
          code == 1189 ||
          code == 1195 ||
          code == 1204 ||
          code == 1207 ||
          code == 1240 ||
          code == 1243 ||
          code == 1243 ||
          code == 1246 ||
          code == 1248 ||
          code == 1252
        ) {
          app.style.backgroundImage = `url(./image/${timeOfDay}rainy.jpg/)`;
          btn.style.background = "#647d75";
          if (timeOfDay == "night") {
            btn.style.background = "#325c80";
          }
          //snow
        } else {
          app.style.backgroundImage = `
          url(/images/${timeOfDay}/snow.jpg)`;
          if (timeOfDay == "night") {
            btn.style.background = "#1b1b1b";
          }
        }
      }
    })
    .catch((error) => {
      console.log(error);
      alert("city not found, please try again");
    });
}
fetchWeatherData();
