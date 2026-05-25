// api que eu criei la no site (nao sei quanto tempo ela dura)
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

// custom dropdown
const selectedCity = document.getElementById("selectedCity");
const cityOptions = document.getElementById("cityOptions");
const options = document.querySelectorAll(".weather__option");

// codigos oficiais da weather api!!!!!!!
// cada codigo vira um icon diferente
const weatherIcons = {

    day: {

        // ceu limpo
        1000: "sun.svg",

        // nublado
        1003: "cloudy.svg",
        1006: "cloudy.svg",
        1009: "cloudy.svg",

        // chuva leve
        1063: "rainyCloudyDay.svg",

        // chuva
        1180: "rainCloud.svg",
        1183: "rainCloud.svg",
        1186: "rainCloud.svg",
        1189: "rainCloud.svg",

        // neve
        1210: "snow.svg",
        1213: "snow.svg",

        // tempestade
        1273: "thunderCloud.svg",
        1276: "thunderCloud.svg"

    },

    night: {

        // ceu limpo
        1000: "moonStars.svg",

        // nublado
        1003: "cloudMoonStars.svg",
        1006: "cloudMoonStars.svg",
        1009: "cloudMoonStars.svg",

        // chuva leve
        1063: "rainyCloudyDay.svg",

        // chuva
        1180: "rainCloud.svg",
        1183: "rainCloud.svg",
        1186: "rainCloud.svg",
        1189: "rainCloud.svg",

        // neve
        1210: "snow.svg",
        1213: "snow.svg",

        // tempestade
        1273: "thunderCloud.svg",
        1276: "thunderCloud.svg"

    }

};

// function principal recebe o nome da cidade ai mostra os dados
// async significa “essa função vai esperar informações da internet”
async function getWeather(cityName) {

    //fetch pede pra api os dados e dai mostra
    const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=no`
    );

    const data = await response.json();

    updateWeather(data);
}

// por se repetir nao seria melhor virar switch? mas sao coisas diferentes
function updateWeather(data) {

    status.textContent = data.current.condition.text;

    temperature.textContent = `${data.current.temp_c.toFixed(0)} °C`;

    feelsLike.textContent = `${data.current.feelslike_c.toFixed(0)} °`;

    wind.textContent = `${data.current.wind_kph} km/hr`;

    humidity.textContent = `${data.current.humidity}%`;

    uv.textContent = data.current.uv;

    // pega codigo oficial da weather api
    const conditionCode = data.current.condition.code;

    // verifica se eh dia ou noite
    const isDay = data.current.is_day;

    // escolhe qual grupo usar
    const period = isDay ? "day" : "night";

    // pega o icon correto
    const icon = weatherIcons[period][conditionCode];

    // troca o icon principal automaticamente
    // se nao encontrar nenhum icon usa cloudy
    mainIcon.src = `assets/img/icons/weatherIcons/${icon || "cloudy.svg"}`;

    // pega data e hora da cidade pesquisada pela api
    const localTime = new Date(data.location.localtime);

    const formattedDate = localTime.toLocaleDateString("pt-BR");

    const formattedTime = localTime.toLocaleTimeString("pt-BR", {

        //isso aq faz ter dois digitos, tipo 5, vai ficar 05
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

// abre e fecha dropdown
selectedCity.addEventListener("click", () => {

    cityOptions.classList.toggle("active");

});

// quando clicar numa cidade
options.forEach(option => {

    option.addEventListener("click", () => {

        const cityName = option.dataset.city;

        selectedCity.querySelector(".weather__selectedText").textContent = cityName;

        getWeather(cityName);

        cityOptions.classList.remove("active");

    });

});

// fecha se clicar fora
window.addEventListener("click", (event) => {

    if (!event.target.closest(".weather__customSelect")) {

        cityOptions.classList.remove("active");

    }

});

//aqui faz o clima aparecer automaticamente, pq se nao so vai aparecer algo quando a pessoa escolher
getWeather("Florianopolis");

// atualiza automaticamente a cada 1 minuto
setInterval(() => {

    getWeather(
        selectedCity.querySelector(".weather__selectedText").textContent
    );

}, 60000);