const API_KEY = "04dbd215797f4ee6b7c190852262105";
const MAPILLARY_TOKEN = "MLY|26317801207892727|b0711aa8ae65ceae77d33fc6281530bb";

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

const forecastContainers = [
    document.getElementById("forecast"),
    document.getElementById("mobileForecast")
];

const mobileLeft = document.getElementById("mobileLeft");
const mobileRight = document.getElementById("mobileRight");
const desktopLeft = document.getElementById("desktopLeft");
const desktopRight = document.getElementById("desktopRight");

let currentCity = "Florianopolis";
let currentForecastIndex = 0;
let forecastDays = [];

const weatherIcons = {
    day: { 1000: "sun.svg", 1003: "cloudy.svg", 1006: "cloudy.svg", 1009: "cloudy.svg", 1030: "cloudy.svg", 1063: "rainyCloudyDay.svg", 1180: "rainCloud.svg", 1183: "rainCloud.svg", 1186: "rainCloud.svg", 1189: "rainCloud.svg", 1192: "rainCloud.svg", 1195: "rainCloud.svg", 1210: "snow.svg", 1213: "snow.svg", 1273: "thunderCloud.svg", 1276: "thunderCloud.svg" },
    night: { 1000: "moonStars.svg", 1003: "cloudMoonStars.svg", 1006: "cloudMoonStars.svg", 1009: "cloudMoonStars.svg", 1030: "cloudMoonStars.svg", 1063: "rainyCloudyDay.svg", 1180: "rainCloud.svg", 1183: "rainCloud.svg", 1186: "rainCloud.svg", 1189: "rainCloud.svg", 1192: "rainCloud.svg", 1195: "rainCloud.svg", 1210: "snow.svg", 1213: "snow.svg", 1273: "thunderCloud.svg", 1276: "thunderCloud.svg" }
};

const weatherBackgrounds = {
    day: { 1000: "sunnyDay.jpg", 1003: "cloudy.jpg", 1006: "cloudy.jpg", 1009: "cloudy.jpg", 1030: "cloudy.jpg", 1063: "rainDay.jpg", 1180: "rainDay.jpg", 1183: "rainDay.jpg", 1186: "rainDay.jpg", 1189: "rainDay.jpg", 1192: "rainDay.jpg", 1195: "rainDay.jpg", 1210: "rainDay.jpg", 1213: "rainDay.jpg", 1273: "rainDay.jpg", 1276: "rainDay.jpg" },
    night: { 1000: "night.jpg", 1003: "night.jpg", 1006: "night.jpg", 1009: "night.jpg", 1030: "night.jpg", 1063: "rainNight.jpg", 1180: "rainNight.jpg", 1183: "rainNight.jpg", 1186: "rainNight.jpg", 1189: "rainNight.jpg", 1192: "rainNight.jpg", 1195: "rainNight.jpg", 1210: "rainNight.jpg", 1213: "rainNight.jpg", 1273: "rainNight.jpg", 1276: "rainNight.jpg" }
};

async function getWeather(cityName) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=5&aqi=no`);
        const data = await response.json();
        if (data.error) return console.error(data.error.message);
        updateWeather(data);
    } catch (error) {
        console.error("Erro ao buscar clima:", error);
    }
}

function updateWeather(data) {
    status.textContent = data.current.condition.text;
    temperature.textContent = `${Math.round(data.current.temp_c)} °C`;
    feelsLike.textContent = `${Math.round(data.current.feelslike_c)} °`;
    wind.textContent = `${Math.round(data.current.wind_kph)} km/hr`;
    humidity.textContent = `${data.current.humidity}%`;
    uv.textContent = Number(data.current.uv).toFixed(1);

    const period = data.current.is_day ? "day" : "night";
    const code = data.current.condition.code;

    mainIcon.src = `assets/img/icons/weatherIcons/${weatherIcons[period][code] || "cloudy.svg"}`;
    const bg = weatherBackgrounds[period][code] || (data.current.is_day ? "sunnyDay.jpg" : "night.jpg");
    //     const bg =
    //     procura o background correspondente ao clima;
    //     se não encontrar,
    //     usa sunnyDay.jpg se for dia;
    //     usa night.jpg se for noite;

    weatherBackground.style.backgroundImage = `url('assets/img/bg/${bg}')`;

    const localTime = new Date(data.location.localtime);
    const dateStr = localTime.toLocaleDateString("pt-BR");
    const timeStr = localTime.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

    date.textContent = `${dateStr} ${timeStr}`;
    time.innerHTML = `<img class="weather__weeklyForecastTimeIcon" src="assets/img/icons/hour.svg" alt=""> ${dateStr} ${timeStr}`;

    forecastDays = data.forecast?.forecastday || [];
    renderForecast();
}

function updateAirConditions(dayData) {
    feelsLike.textContent = `${Math.round(dayData.day.avgtemp_c)} °`;
    wind.textContent = `${Math.round(dayData.day.maxwind_kph)} km/hr`;
    humidity.textContent = `${Math.round(dayData.day.avghumidity)}%`;
    uv.textContent = Number(dayData.day.uv).toFixed(1);

    const selectedDate = new Date(dayData.date);

    const dateText = selectedDate.toLocaleDateString("en", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit"
    });

    time.innerHTML = `
        <img class="weather__weeklyForecastTimeIcon"
             src="assets/img/icons/hour.svg" alt=""> 
        ${dateText}
    `;
}


function renderForecast() {
    if (forecastDays.length === 0) return;

    const shiftedDays = forecastDays.slice(currentForecastIndex).concat(forecastDays.slice(0, currentForecastIndex));

    const activeDay = shiftedDays[2];

    if (activeDay) {
        updateAirConditions(activeDay);
    }

    const html = shiftedDays.map(function (day, index) {
        const dayName = new Date(day.date).toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
        const icon = weatherIcons.day[day.day.condition.code] || "cloudy.svg";
        const activeClass = index === 2 ? "active" : "";

        return `
            <div class="weather__carouselItem ${activeClass}">
                <p class="weather__carouselDay">${dayName}</p>
                <img class="weather__carouselIcon" src="assets/img/icons/weatherIcons/${icon}" alt="">
            </div>`;
    }).join("");

    forecastContainers.forEach(function (container) {
        container.innerHTML = html;
        animateCarousel(container);
    });
}

function animateCarousel(track) {
    track.style.transform = "translateX(-9px)";
    setTimeout(function () {
        track.style.transform = "translateX(0)";
    }, 250);
}

function nextForecast() {
    if (forecastDays.length === 0) return;
    currentForecastIndex = (currentForecastIndex + 1) % forecastDays.length;
    renderForecast();
}

function prevForecast() {
    if (forecastDays.length === 0) return;
    currentForecastIndex = (currentForecastIndex - 1 + forecastDays.length) % forecastDays.length;
    // % faz o loop infinito
    renderForecast();
}

function configurarBotoes() {
    const botoesDireita = [mobileRight, desktopRight];
    const botoesEsquerda = [mobileLeft, desktopLeft];

    botoesDireita.forEach(function (btn) {
        if (btn) btn.addEventListener("click", nextForecast);
    });

    botoesEsquerda.forEach(function (btn) {
        if (btn) btn.addEventListener("click", prevForecast);
    });
}

// em javaScript, definir uma função não significa executá-la, por isso tem q por ela aqui fora
configurarBotoes();

async function searchCities(query) {
    if (query.length < 2) {
        suggestions.classList.remove("active");
        return;
    }
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`);
        const data = await response.json();
        suggestions.innerHTML = "";
        suggestions.classList.add("active");

        data.forEach(function (city) {
            const div = document.createElement("div");
            div.className = "weather__option";
            div.textContent = `${city.name}, ${city.country}`;
            div.addEventListener("click", function () {
                currentCity = city.name;
                citySearch.value = city.name;
                getWeather(city.name);
                suggestions.classList.remove("active");
            });
            suggestions.appendChild(div);
        });
    } catch (error) {
        console.error("Erro na busca de cidades:", error);
    }
}

citySearch.addEventListener("input", function () {
    searchCities(citySearch.value);
});

citySearch.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        getWeather(citySearch.value);
    }
});

citySearch.addEventListener("focus", function () {
    if (citySearch.value === currentCity) {
        citySearch.value = "";
    }
});

citySearch.addEventListener("blur", function () {
    if (citySearch.value.trim() === "") {
        citySearch.value = currentCity;
    }
});

window.addEventListener("click", function (event) {
    if (!event.target.closest(".weather__searchWrapper")) {
        suggestions.classList.remove("active");
    }
});

citySearch.value = currentCity;
getWeather(currentCity);
setInterval(function () {
    getWeather(currentCity);
}, 60000);

console.log(MAPILLARY_TOKEN);