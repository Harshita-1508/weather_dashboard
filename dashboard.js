// Elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const logoutBtn = document.getElementById("logoutBtn");

// Current Weather
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherCondition = document.getElementById("weatherCondition");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const weatherIcon = document.getElementById("weatherIcon");

// Forecast
const day1 = document.getElementById("day1");
const day2 = document.getElementById("day2");
const day3 = document.getElementById("day3");

const temp1 = document.getElementById("temp1");
const temp2 = document.getElementById("temp2");
const temp3 = document.getElementById("temp3");

const icon1 = document.getElementById("icon1");
const icon2 = document.getElementById("icon2");
const icon3 = document.getElementById("icon3");


// Search Button
searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if(city === ""){
        alert("Please enter a city name.");
        return;
    }

    getWeather(city);

});


// Logout
logoutBtn.addEventListener("click", () => {

    window.location.href = "index.html";

});


// Main Function
async function getWeather(city){

    try{

        // Get Latitude & Longitude
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );

        const geoData = await geoResponse.json();

        if(!geoData.results){

            alert("City not found.");
            return;

        }

        const latitude = geoData.results[0].latitude;
        const longitude = geoData.results[0].longitude;

        // Fetch Weather
        const weatherResponse = await fetch(

            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,weather_code&forecast_days=3`

        );

        const weatherData = await weatherResponse.json();

        displayWeather(city, weatherData);

    }

    catch(error){

        console.log(error);

        alert("Something went wrong.");

    }

}


// Display Weather
function displayWeather(city, data){

    cityName.textContent = city;

    temperature.textContent =
        data.current.temperature_2m + "°C";

    humidity.textContent =
        data.current.relative_humidity_2m + "%";

    windSpeed.textContent =
        data.current.wind_speed_10m + " km/h";

    weatherCondition.textContent =
        getWeatherName(data.current.weather_code);

    weatherIcon.src =
        getWeatherIcon(data.current.weather_code);

    // Forecast

    day1.textContent =
        getDayName(data.daily.time[0]);

    day2.textContent =
        getDayName(data.daily.time[1]);

    day3.textContent =
        getDayName(data.daily.time[2]);

    temp1.textContent =
        data.daily.temperature_2m_max[0] + "°C";

    temp2.textContent =
        data.daily.temperature_2m_max[1] + "°C";

    temp3.textContent =
        data.daily.temperature_2m_max[2] + "°C";

    icon1.src =
        getWeatherIcon(data.daily.weather_code[0]);

    icon2.src =
        getWeatherIcon(data.daily.weather_code[1]);

    icon3.src =
        getWeatherIcon(data.daily.weather_code[2]);

}



// Convert Date to Day
function getDayName(date){

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    const d = new Date(date);

    return days[d.getDay()];

}



// Weather Name
function getWeatherName(code){

    if(code === 0)
        return "Clear Sky";

    if(code <= 3)
        return "Cloudy";

    if(code <= 48)
        return "Fog";

    if(code <= 67)
        return "Rain";

    if(code <= 77)
        return "Snow";

    if(code <= 99)
        return "Thunderstorm";

    return "Unknown";

}



// Weather Icon
function getWeatherIcon(code){

    if(code === 0)
        return "https://openweathermap.org/img/wn/01d@2x.png";

    if(code <= 3)
        return "https://openweathermap.org/img/wn/03d@2x.png";

    if(code <= 48)
        return "https://openweathermap.org/img/wn/50d@2x.png";

    if(code <= 67)
        return "https://openweathermap.org/img/wn/10d@2x.png";

    if(code <= 77)
        return "https://openweathermap.org/img/wn/13d@2x.png";

    if(code <= 99)
        return "https://openweathermap.org/img/wn/11d@2x.png";

    return "https://openweathermap.org/img/wn/01d@2x.png";

}