import API_KEY from "./apikey.js";

// Selectors
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const icon = document.querySelector('.icon');
const description = document.querySelector('.condition');
const humidity = document.querySelector('.humidity');
const feels = document.querySelector('.feels_like');
const windSpeed = document.querySelector('.wind-speed');
const searchBar = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search button');
// Social media icons
const facebook = document.querySelector('.facebook');
const pinterest = document.querySelector('.pinterest');
const twitter = document.querySelector('.twitter');
const whatsapp = document.querySelector('.whatsapp');
const linkedin = document.querySelector('.linkedin');

// initial display
city.innerText = 'Loading...';
let weather = {
    // My api key
    apiKey: API_KEY,

    // Function to fetch data from api
    fetchWeather: (city) => {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weather.apiKey}`;
        // async function
        // let resp = await fetch(url);
        // resp = await resp.json();
        // return resp;
        fetch(url)
            .then(response => {
                if (response.status >= 400 || response.status >= 499) {
                    console.log('Client side error!');
                    weather.errorHandle('City not found!', 'Check the spelling and try again!');
                } else if (response.status >= 500 || response.status >= 599) {
                    console.log('Client side error!');
                    weather.errorHandle('Server Down!', 'Currently server not responding please try again!');
                }
                return response.json()
            })
            .then(data => { weather.destructData(data) })
            .catch(error => console.log(error));
    },
    destructData: (data) => {
        let { name } = data;
        let { country } = data.sys;
        let { temp, feels_like, humidity } = data.main;
        let { icon, description } = data.weather[0];
        let { speed } = data.wind;

        weather.displayWeather({ name, country, temp, feels_like, description, speed, humidity, icon });
    },
    displayWeather: (data) => {
        // renedering the city name
        city.innerText = `Weather in ${data.name}, ${data.country}`;
        // rendering the temp
        temp.innerText = `${data.temp}°C`;
        // rendering the feels like temp
        feels.innerText = `Feels like ${data.feels_like}°C`;
        // rendering the icon
        icon.src = `https://openweathermap.org/img/wn/${data.icon}.png`;
        // rendering the description
        description.innerText = `${data.description}`;
        // rendering the humidity
        humidity.innerText = `Humidity: ${data.humidity}%`;
        // rendering the wind speed
        windSpeed.innerText = `wind speed: ${data.speed}km/h`;
    },
    errorHandle: function(firstMsg, secondMsg) {
        // renedering the city name
        city.innerText = `${firstMsg}`;
        // rendering the temp
        temp.innerText = ``;
        // rendering the feels like temp
        feels.innerText = ``;
        // rendering the icon
        icon.src = ``;
        // rendering the description
        description.innerText = `${secondMsg}`;
        // rendering the humidity
        humidity.innerText = ``;
        // rendering the wind speed
        windSpeed.innerText = ``;
    }
};
weather.fetchWeather('lahore')
searchBtn.addEventListener('click', () => {
    let value = searchBar.value;
    weather.errorHandle('Loading...', 'please wait!');
    weather.fetchWeather(value);
    searchBar.value = '';
});
// Enable enter key
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        weather.errorHandle('Loading...', 'please wait!');
        let value = searchBar.value;
        if (value === '') {
            weather.errorHandle('Enter city name!', 'You forgot to enter the city name.')
            return;
        }
        weather.fetchWeather(value);
        searchBar.value = '';

    }
});
(function socialShare() {
    let postText = `Hey! Check this cool Calculator app`

    let url = encodeURI(document.location.href);

    facebook.setAttribute('href', `https://www.facebook.com/sharer.php?u=${url}`);
    whatsapp.setAttribute('href', `https://api.whatsapp.com/send?text=${postText} ${url}`);
    linkedin.setAttribute('href', `https://www.linkedin.com/shareArticle?url=${url}&title=${postText}`);
    twitter.setAttribute('href', `https://twitter.com/share?url=${url}&text=${postText}&via=${'@nabeel_mufti'}&hashtags=[hashtags]`);
    pinterest.setAttribute('href', `https://pinterest.com/pin/create/bookmarklet/?url=${url}&description=${postText}`);
})();