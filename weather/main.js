const API_KEY = "04dbd215797f4ee6b7c190852262105";

const status = document.getElementById("status");
const temperature = document.getElementById("temperature");
const date = document.getElementById("date");
const feelsLike = document.getElementById("feelsLike");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const uv = document.getElementById("uv");
const time = document.getElementById("time");
const mainIcon = document.getElementById("mainIcon");

const weatherBackground = document.getElementById("weatherBackground");

const citySearch = document.getElementById("citySearch");
const suggestions = document.getElementById("suggestions");

let currentCity = "Florianopolis";

const weatherIcons = {
    day: {
        1000: "sun.svg",
        1003: "cloudy.svg",
        1006: "cloudy.svg",
        1009: "cloudy.svg",
        1063: "rainyCloudyDay.svg",
        1180: "rainCloud.svg",
        1183: "rainCloud.svg",
        1186: "rainCloud.svg",
        1189: "rainCloud.svg",
        1210: "snow.svg",
        1213: "snow.svg",
        1273: "thunderCloud.svg",
        1276: "thunderCloud.svg"
    },

    night: {
        1000: "moonStars.svg",
        1003: "cloudMoonStars.svg",
        1006: "cloudMoonStars.svg",
        1009: "cloudMoonStars.svg",
        1063: "rainyCloudyDay.svg",
        1180: "rainCloud.svg",
        1183: "rainCloud.svg",
        1186: "rainCloud.svg",
        1189: "rainCloud.svg",
        1210: "snow.svg",
        1213: "snow.svg",
        1273: "thunderCloud.svg",
        1276: "thunderCloud.svg"
    }
};

const weatherBackgrounds = {

    day: {
        1000: "sunnyDay.jpg",
        1003: "cloudy.jpg",
        1006: "cloudy.jpg",
        1009: "cloudy.jpg",
        1063: "rainDay.jpg",
        1180: "rainDay.jpg",
        1183: "rainDay.jpg",
        1186: "rainDay.jpg",
        1189: "rainDay.jpg",
        1210: "rainDay.jpg",
        1213: "rainDay.jpg",
        1273: "rainDay.jpg",
        1276: "rainDay.jpg"
    },

    night: {
        1000: "night.jpg",
        1003: "night.jpg",
        1006: "night.jpg",
        1009: "night.jpg",
        1063: "rainNight.jpg",
        1180: "rainNight.jpg",
        1183: "rainNight.jpg",
        1186: "rainNight.jpg",
        1189: "rainNight.jpg",
        1210: "rainNight.jpg",
        1213: "rainNight.jpg",
        1273: "rainNight.jpg",
        1276: "rainNight.jpg"
    }

};

async function getWeather(cityName) {

    const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=no`
    );

    const data = await response.json();

    updateWeather(data);
}

function updateWeather(data) {
    status.textContent = data.current.condition.text;

    temperature.textContent = `${data.current.temp_c.toFixed(0)} °C`;

    feelsLike.textContent = `${data.current.feelslike_c.toFixed(0)} °`;

    wind.textContent = `${data.current.wind_kph} km/hr`;

    humidity.textContent = `${data.current.humidity}%`;

    uv.textContent = data.current.uv;

    const conditionCode = data.current.condition.code;

    const isDay = data.current.is_day;

    const period = isDay ? "day" : "night";

    const icon = weatherIcons[period][conditionCode];

    mainIcon.src = `assets/img/icons/weatherIcons/${icon || "cloudy.svg"}`;

    const bgImage = weatherBackgrounds[period][conditionCode];

    const selectedBg = bgImage || (isDay ? "sunnyDay.jpg" : "night.jpg");

    weatherBackground.style.backgroundImage = `url('assets/img/bg/${selectedBg}')`;

    const localTime = new Date(data.location.localtime);

    const formattedDate = localTime.toLocaleDateString("pt-BR");

    const formattedTime = localTime.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });

    date.textContent = `${formattedDate} ${formattedTime}`;

    time.innerHTML = `
        <img 
            class="weather__weeklyForecastTimeIcon"
            src="assets/img/icons/hour.svg" 
            alt=""
        >
        ${formattedDate} ${formattedTime}
    `;
}

async function searchCities(query) {
    if (query.length < 2) {

        suggestions.innerHTML = "";
        suggestions.classList.remove("active");

        return;
    }

    const response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`
    );

    const data = await response.json();

    suggestions.innerHTML = "";

    suggestions.classList.add("active");

    data.forEach(city => {
        const div = document.createElement("div");

        div.classList.add("weather__option");

        div.textContent = `${city.name}, ${city.country}`;

        div.addEventListener("click", () => {
            currentCity = city.name;

            citySearch.value = city.name;

            getWeather(city.name);

            suggestions.innerHTML = "";

            suggestions.classList.remove("active");
        });

        suggestions.appendChild(div);
    });

}

citySearch.addEventListener("input", () => {
    searchCities(citySearch.value);
});

citySearch.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {

        currentCity = citySearch.value;

        getWeather(citySearch.value);

        suggestions.classList.remove("active");
    }
});

citySearch.addEventListener("focus", () => {
    if (citySearch.value === currentCity) {

        citySearch.value = "";

    }
});

citySearch.addEventListener("blur", () => {
    if (citySearch.value.trim() === "") {

        citySearch.value = currentCity;

    }
});

window.addEventListener("click", (event) => {
    if (!event.target.closest(".weather__searchWrapper")) {

        suggestions.classList.remove("active");

    }
});

citySearch.value = currentCity;

getWeather(currentCity);

setInterval(() => {
    getWeather(currentCity);
}, 60000);