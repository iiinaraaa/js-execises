// api que eu criei la no site (nao sei quanto tempo ela dura)
const API_KEY = "04dbd215797f4ee6b7c190852262105";

const city = document.getElementById("city");

const status = document.getElementById("status");
const temperature = document.getElementById("temperature");
const date = document.getElementById("date");
const feelsLike = document.getElementById("feelsLike");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const uv = document.getElementById("uv");
const time = document.getElementById("time");

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

    temperature.textContent = `${data.current.temp_c} °C`;

    feelsLike.textContent = `${data.current.feelslike_c} °`;

    wind.textContent = `${data.current.wind_kph} km/hr`;

    humidity.textContent = `${data.current.humidity}%`;

    uv.textContent = data.current.uv;

    date.textContent = data.location.localtime;

    time.innerHTML = `
        <img 
            class="weather__weeklyForecastTimeIcon"
            src="assets/img/icons/hour.svg" 
            alt=""
        >
        ${data.location.localtime}
    `;
}

// "quando mudar a cidade"
city.addEventListener("change", () => {

    getWeather(city.value);

});

//aqui faz o clima aparecer automaticamente, pq se nao so vai aparecer algo quando a pessoa escolher
getWeather(city.value);