const apiKey = "ea92aa70665b927dd92729d7b6fe8fd6"; // Your API key

document.getElementById("city").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const city = document.getElementById("city").value;

    // Use fetch to get latitude and longitude for the city
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const lat = data.coord.lat;
        const lon = data.coord.lon;

        // Use lat and lon to get weather data
        fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        )
          .then((response) => response.json())
          .then((weatherData) => {
            citynamechanger();
            console.log(weatherData); // Handle and display the weather data
            displayWeather(weatherData);
          });
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  }
});

function citynamechanger() {
  const cityname = document.getElementById("city").value;
  document.getElementById("cityname").innerHTML = `<span>${cityname}</span>`;
}

function displayWeather(data) {
  if (data.current.temp) {
    document.getElementById("temperature").innerHTML = `${Number(
      data.current.temp.toFixed(1)
    )}<span>°</span>`;
  }
  if (data.current.temp) {
    document.getElementById("temperature").innerHTML = `${Number(
      data.current.temp.toFixed(1)
    )}<span>°</span>`;
  }

  if (
    data.current.weather &&
    data.current.weather[0] &&
    data.current.weather[0].main
  ) {
    document.getElementById(
      "weather"
    ).innerHTML = `${data.current.weather[0].main}`;
  }

  if (data.lat) {
    document.getElementById("lat").innerHTML = `lat: ${data.lat}`;
  }

  if (data.lon) {
    document.getElementById("lon").innerHTML = `lon: ${data.lon},`;
  }

  if (data.current.wind_speed) {
    document.getElementById("windd").innerHTML = `${Number(
      data.current.wind_speed.toFixed(1)
    )}`;
  }

  if (data.current.wind_gust) {
    document.getElementById("gustd").innerHTML = `${Number(
      data.current.wind_gust.toFixed(1)
    )}`;
  }

  if (data.current.visibility) {
    document.getElementById("visibility").innerHTML = `${visibility(
      data.current.visibility
    )}km`;
  }

  if (data.current.feels_like) {
    document.getElementById("feelslike").innerHTML = `${Number(
      data.current.feels_like.toFixed(1)
    )}°`;
  }

  if (data.current.humidity) {
    document.getElementById("humidity").innerHTML = `${Number(
      data.current.humidity.toFixed(1)
    )}%`;
  }

  if (data.current.pressure) {
    document.getElementById(
      "pressure"
    ).innerHTML = `${data.current.pressure}<span style="font-size: 10px;">Hg</span>`;
  }

  if (data.current.uvi) {
    document.getElementById("uvnum").innerHTML = `${data.current.uvi}`;
    document.getElementById("uvtype").innerHTML = `${uvi(data)}`;
  }

  hourlydata(data);
  dailydata(data);
}

function visibility(data) {
  let vis = data;
  vis = vis / 1000;
  return Number(vis.toFixed(1));
}

function uvi(data) {
  const uv = data.current.uvi;
  if (uv >= 0 && uv <= 2) {
    return "Low";
  } else if (uv >= 3 && uv <= 5) {
    return "Moderate";
  } else if (uv >= 6 && uv <= 7) {
    return "High";
  } else if (uv >= 8 && uv <= 10) {
    return "Very High";
  } else if (uv >= 11) {
    return "Extreme";
  } else {
    return "Invalid UVI";
  }
}

function hourlydata(data) {
  let hourlydt = "";
  for (i = 0; i <= 20; i++) {
    const timestamp = data.hourly[i].dt;
    const temp = data.hourly[i].temp;
    const date = new Date(timestamp * 1000);

    const hours = date.getUTCHours().toString().padStart(2, "0"); // Get hours and pad with leading zero if needed
    const minutes = date.getUTCMinutes().toString().padStart(2, "0"); // Get minutes and pad with leading zero if needed

    const time = `${hours}:${minutes}`;
    hourlydt += ` <div id="hdata">
              <p>${time}</p>
              <p>${Number(temp.toFixed(1))}°</p>
            </div>`;
  }

  document.getElementById("hourlydatablk").innerHTML = hourlydt;
}
function dailydata(data) {
  let dailydt = "";
  for (i = 0; i <= 7; i++) {
    const timestamp = data.daily[i].dt;
    const temp = data.daily[i].temp.day;
    const date = new Date(timestamp * 1000);

    const hours = date.getUTCHours().toString().padStart(2, "0"); // Get hours and pad with leading zero if needed
    const minutes = date.getUTCMinutes().toString().padStart(2, "0"); // Get minutes and pad with leading zero if needed
    const day = date.getUTCDate().toString().padStart(2, "0"); // Get day and pad with leading zero
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Get month and pad with leading zero

    const formattedDate = `${day}/${month}`;
    const time = `${hours}:${minutes}`;

    dailydt += `  <div id="ddata">
              <p>${formattedDate}</p>
              <p>${time}</p>
              <p>${Number(temp.toFixed(1))}°</p>
            </div>`;
  }

  document.getElementById("dailydatablk").innerHTML = dailydt;
}

const hourlyDataBlk = document.getElementById("hourlydatablk");
hourlyDataBlk.addEventListener("wheel", (event) => {
  event.preventDefault();
  hourlyDataBlk.scrollLeft += event.deltaY * 2;
});

window.addEventListener('resize', function() {
  var stylesheet = document.getElementById("mainStylesheet");
  if (window.innerWidth <= 920) {
    stylesheet.disabled = true;
  } else {
    stylesheet.disabled = false;
  }
});

// Initial check on page load
window.onload = function() {
  var stylesheet = document.getElementById("mainStylesheet");
  if (window.innerWidth <= 920) {
    stylesheet.disabled = true;
  }
};