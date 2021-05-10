const cityInput = document.querySelector('.city-input');
const searchButton = document.querySelector('.search-button');
const displayCity = document.querySelector('.display-city');
const displayWeather = document.querySelector('.display-weather');
const displayTemperature = document.querySelector('.display-temperature');
const displayFeelsLike = document.querySelector('.display-feelslike');
const displayMaxMin = document.querySelector('.display-maxmin');
const displayHumidity = document.querySelector('.display-humidity');
const displayTime = document.querySelector('.display-time');

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

function setTemperature(temperature) {
    return Math.ceil(temperature);
};

function calculeteTimeByTimezone(offset) {
    const utcMilliseconds = new Date().getTime();
    const cityDate = new Date((offset * 1000) + utcMilliseconds).toGMTString().substring(0, 22)
    return cityDate;
};

function setIcon(weathericon) {
    let icon = '';
    icon = `<img class="weather-icon" src="http://openweathermap.org/img/wn/${weathericon}@2x.png">`
    return icon;
};

function displayContent(data) {

    const dayAndTime = calculeteTimeByTimezone(data.timezone);
    displayTime.innerHTML = dayAndTime;

    displayCity.innerHTML = `${data.name}, ${data.sys.country} <img src="http://openweathermap.org/images/flags/${data.sys.country.toLowerCase()}.png" alt="flag">`;

    const mainWeather = `${setIcon(data.weather[0].icon)} ${data.weather[0].main}`;
    const discription = capitalizeFirstLetter(data.weather[0].description);
    displayWeather.innerHTML = `
    <div class="weather">${mainWeather}</div>
    <div class="discription">${discription}</div>
    `;

    const temperature = setTemperature(data.main.temp);
    const feelsLike = setTemperature(data.main.feels_like);
    displayTemperature.innerHTML = `
    <div class="temperature">${temperature}</div>
    <span class="temperature-unit">°C</span>
    `;
    displayFeelsLike.innerHTML = `
    <div class="feels-like">Feels like: ${feelsLike}</div>
    <span class="unit">°C</span>
    `;

    const maxTemperature = setTemperature(data.main.temp_max);
    const minTemperature = setTemperature(data.main.temp_min);
    displayMaxMin.innerHTML = `
    <div class="minmax-block">
        <div class="max-temperature">High: ${maxTemperature}</div>
        <span class="unit">°C</span>
        <div class="min-temperature">Low: ${minTemperature}</div>
        <span class="unit">°C</span>
    </div>
    `;

    const humidity = data.main.humidity;
    displayHumidity.innerHTML = `Humidity: ${humidity}%`;

};

function getWeather(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f540f5c52c7d37e308a68408c3842237&units=metric`)
        .then(response => {
            return response.json();
        })
        .then((data) => {
            displayContent(data);
        })
        .catch((error) => {
            if (error == "TypeError: Cannot read property 'country' of undefined") {
                alert('Please, type a valid City name.')
            } else {
                alert('We did not find what you are looking for, please try again.')
            }
        });
};

searchButton.addEventListener('click', () => {
    getWeather(cityInput.value);
});
cityInput.addEventListener('keyup', (key) => {
    if (key.keyCode == '13') {
        getWeather(cityInput.value);
    } else {
        return;
    };
});
window.addEventListener('load', () => {
    getWeather('Calgary, CA');
});