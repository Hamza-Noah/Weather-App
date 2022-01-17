// Responsive Navbar

let toggleButton = document.querySelector(".toggle-button");
const nav = document.querySelector(".navbar");

toggleButton.addEventListener("click", function () {
  nav.classList.toggle("active");
});

(function () {
  let today = new Date();
  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // const tomorrow = new Date(today)
  document.getElementById("today").innerHTML = week[today.getDay()];
  document.getElementById("date").innerHTML =
    monthNames[today.getMonth()] + "  " + today.getDate();

  if (today.getDay() == 6) {
    document.getElementById("tomorrow").innerHTML = week[0];
  } else {
    document.getElementById("tomorrow").innerHTML = week[today.getDay() + 1];
  }

  if (today.getDay() == 6) {
    document.getElementById("nextTomorrow").innerHTML = week[1];
  } else if (today.getDay() == 5) {
    document.getElementById("nextTomorrow").innerHTML = week[0];
  } else {
    document.getElementById("nextTomorrow").innerHTML =
      week[today.getDay() + 2];
  }
})();

async function showWeather(country) {
  let weatherapi = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=fae3f340665d4e4d95a42214211511&q=${country}&days=3`
  );
  let weather = await weatherapi.json();

  const city = document.getElementById("city");
  const todayDegree = document.getElementById("today-degree");
  const degreeIcon = document.getElementById("degree-icon");
  const customToday = document.getElementById("custom-today");
  const tomorrowIcon = document.getElementById("tomorrow-icon");
  const tomorrowDegreeMax = document.getElementById("tommorow-degree-max");
  const tomorrowDegreeMin = document.getElementById("tommorow-degree-min");
  const tomorrowCustom = document.getElementById("tomorrow-custom");
  const customAfterTomorrow = document.getElementById("customAfterTomorrow");
  const afterTomorrowIcon = document.getElementById("after-tomorrow-icon");
  const afterTomorrowDegree = document.getElementById(
    "after-tommorow-degree-max"
  );

  const afterTomorrowDegreeMin = document.getElementById(
    "after-tommorow-degree-min"
  );

  if (weatherapi.status == 200) {
    city.innerHTML = weather.location.name;
    todayDegree.innerHTML = weather.current.temp_c + "&#8451;";
    todayDegree.setAttribute(
      "style",
      "@font-face {font-family: 'Ampersand'; src: local('Courier'); unicode-range: U+26;}"
    );

    degreeIcon.setAttribute("src", `https://${weather.current.condition.icon}`);
    customToday.innerHTML = weather.current.condition.text;
    tomorrowIcon.setAttribute(
      "src",
      `https://${weather.forecast.forecastday[1].day.condition.icon}`
    );

    tomorrowDegreeMax.innerHTML =
      weather.forecast.forecastday[1].day.maxtemp_c + "&#8451;";

    tomorrowDegreeMin.innerHTML =
      weather.forecast.forecastday[1].day.mintemp_c + "&#8451;";

    tomorrowCustom.innerHTML =
      weather.forecast.forecastday[1].day.condition.text;

    afterTomorrowIcon.setAttribute(
      "src",
      `https://${weather.forecast.forecastday[2].day.condition.icon}`
    );

    afterTomorrowDegree.innerHTML =
      weather.forecast.forecastday[2].day.maxtemp_c + "&#8451";

    afterTomorrowDegreeMin.innerHTML =
      weather.forecast.forecastday[2].day.mintemp_c + "&#8451";

    customAfterTomorrow.innerHTML =
      weather.forecast.forecastday[2].day.condition.text;
  }
}

showWeather("Cairo");

let searchInput = document.getElementById("search");
let submit = document.getElementById("submit");
submit.addEventListener("click", function (event) {
  event.preventDefault();
  showWeather(searchInput.value);
});
