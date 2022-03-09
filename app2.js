// the Html tags were dynamically placed using this Js.
// When city is typed, then click the button to display the weather information.
// 

// setup the key and url to get the weather information
const api = {
  key: "9ac598813e14067806b42fd423dde26d",
   baseUrl : "https://api.openweathermap.org/data/2.5/"
}

// selects button and search input field
const btn = document.querySelector('.btn');
const search = document.querySelector('.search');
// listen for a click on the button
btn.addEventListener('click', (event) => {
 event.preventDefault();  // prevet the default behaviour
 // if the target is button, fetch() API
  if(event.target.className== "btn" ) {
   fetch(`${api.baseUrl}weather?q=${search.value}&units=metric&appid=${api.key}`)
  // when the request is successful read and parse the data using json()
  .then(response => {
    // console.log(response.json());
   return response.json();
 }) .then(displayData);
  }

})

function displayData(response) {
   // if wrong city is enetered will show error message below.
  if(response.cod == "404") {
const error = document.querySelector('.error');
error.textContent = "Please Eneter correct city";
search.value = " ";  // to clear the input field
// console.log(error)

  } else {
    const weatherIcon = document.querySelector('.weather-icon'); 
    weatherIcon.innerHTML = `<img class="icon" src="http://openweathermap.org/img/wn/${(response.weather[0].icon)}.png" alt="Weather Icon" >`
     // gets todays date.
      const today = new Date();
     // city and country from the fetched data; displays todays date
      const cityDate = document.querySelector('.city-date'); 
      let cityTemp = `<div class="city">${response.name}, ${response.sys.country}</div>`
          cityTemp += `<div class="date">${displayDate(today)}</div> `
          cityDate.innerHTML = cityTemp;
     // selects the .weather-info div, inserts the div with inner text
      const weatherInfo = document.querySelector('.weather-info'); 
      let weatherStore = `<div class="temp">Temp:<span>${Math.round(response.main.temp)}°C</span></div>`
      weatherStore += `<div class="feels-like">Feels Like: ${Math.round(response.main.feels_like)}°C</div>`
      weatherStore += `<div class="high-low">High/Low: ${Math.round(response.main.temp_max)}°C/${Math.round(response.main.temp_min)}°C</div>`
      weatherStore+= `<div class="weather">Weather: ${response.weather[0].main}</div>`
      weatherStore+= `<div class="wind-speed">Wind Speed: ${Math.round((response.wind.speed)*3.6)}km/hr</div>`
      weatherStore+= `<div class="visibility">Visibility: ${Math.round((response.visibility)/1000)}km</div>`
      weatherStore+= `<div class="humidity">Humidity: ${Math.round(response.main.humidity)}%</div>`
      
          weatherInfo.innerHTML = weatherStore;
      
  }

}
// function to display date, month, year and day of the week
function displayDate(d)
{
 
 let days = ["Sunday", "Monday", "Teusday", "Wednesday", "Thursday", "Friday", "Saturday"];
 let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "november", "December"];

 let day = days[d.getDay()];
 let  date = d.getDate();
 let month = months[d.getMonth()];
 let year = d.getFullYear();

return `${day}, ${month}, ${date}, ${year}`
} 


