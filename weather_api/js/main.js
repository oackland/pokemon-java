document.addEventListener('DOMContentLoaded', function () {
    // Variables and Constants
    const apiKey = "38d147031dc4e997fc0b84ac609f3f86";
    const main = document.getElementById('main');
    const form = document.getElementById('form');
    const search = document.getElementById('search');
    const toggleButton = document.getElementById('toggle');
    let isCelsius = true;

    function KtoC(K) {
        return Math.floor(K - 273.15);
    }

    function KtoF(K) {
        return Math.floor((K - 273.15) * 9 / 5 + 32);
    }

    const weatherUrl = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = (city) => `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    async function getWeatherByLocation(city) {
        const resp = await fetch(weatherUrl(city));
        const respData = await resp.json();
        addWeatherToPage(respData);

        const respForecast = await fetch(forecastUrl(city));
        const respForecastData = await respForecast.json();
        addForecastToPage(respForecastData);
    }

    function addWeatherToPage(data) {
        const temp = isCelsius ? KtoC(data.main.temp) : KtoF(data.main.temp);
        const unit = isCelsius ? "°C" : "°F";

        const date = new Date();
        const time = `${date.getHours()}:${date.getMinutes()}`;

        // Add additional weather information here, like pollution, UV index, etc.

        const weather = document.createElement('div');
        weather.classList.add('weather');
        weather.innerHTML = `
        <div id="current-time-date">
            <div>Date: <span id="current-date">${date.toDateString()}</span></div>
            <div>Time: <span id="current-time">${time}</span></div>
        </div>
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
        ${temp}${unit}</h2>
        <small>${data.weather[0].main}</small>`;

        main.innerHTML = "";
        main.appendChild(weather);
    }


    function addForecastToPage(data) {
        const forecastContainer = document.createElement('div');
        forecastContainer.id = 'forecast-container';

        for (let i = 0; i < data.list.length; i += 8) {
            const dayData = data.list[i];
            const temp = KtoC(dayData.main.temp);

            const day = document.createElement('div');
            day.classList.add('day-forecast');
            day.innerHTML = `
                <h3>Day ${(i / 8) + 1}</h3>
                <div class="temp">Temperature: <span class="temp">${temp}°C</span></div>
                <div class="description">Description: <span class="description">${dayData.weather[0].main}</span></div>
            `;
            forecastContainer.appendChild(day);
        }

        main.appendChild(forecastContainer);
    }


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const city = search.value;
        if (city) {
            getWeatherByLocation(city);
        }
    });
})
