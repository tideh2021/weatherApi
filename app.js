const api = {
  key: "9ac598813e14067806b42fd423dde26d",
   baseUrl : "https://api.openweathermap.org/data/2.5/"
}
// https://api.openweathermap.org/data/2.5/
// q={city name}&appid={API key}
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const btn = document.querySelector('.btn');
const search = document.querySelector('.search');

btn.addEventListener('click', (event) => {
 event.preventDefault();
 
//  console.log(search.value);
//  console.log(event.target)
  if(event.target.className== "btn" ) {
  console.log(event.target.className)
   fetch(`${api.baseUrl}weather?q=${search.value}&units=metric&appid=${api.key}`)
  .then(response => {
   return response.json();
 }) .then(displayData);
  }

})

function displayData(response) {
   
  if(response.cod == "404") {
const error = document.querySelector('.error');
error.textContent = "Please Eneter correct city";
search.value = " ";
console.log(error)

  } else {
    const city = document.querySelector('.city');
      city.innerText = `${response.name}, ${response.sys.country}` 
      const temp = document.querySelector('.temp'); 
      temp.innerText = `Temp:  ${Math.round(response.main.temp)}°C`
    
      const today = new Date();
      const date = document.querySelector(".date");
      date.innerText = displayDate(today);

      const highLow = document.querySelector('.high-low'); 
      highLow.innerText = `High/Low:  ${Math.round(response.main.temp_max)}°C/${Math.round(response.main.temp_min)}°C`

      const feelsLike = document.querySelector('.feels-like'); 
      feelsLike.innerText = `Feels Like: ${Math.round(response.main.feels_like)}°C`
      
      const visibility = document.querySelector('.visibility'); 
      visibility.innerText = `Visibility: ${Math.round((response.visibility)/1000)}km`

      const windSpeed = document.querySelector('.wind-speed');    
      windSpeed.innerText = `Wind Speed: ${Math.round((response.wind.speed)*3.6)}km/hr`

      const icon = document.querySelector('.icon'); 
      icon.src = `http://openweathermap.org/img/wn/${(response.weather[0].icon)}.png`
 
      const weather = document.querySelector('.weather');    
      weather.innerText = `Weather: ${response.weather[0].description}`
 
  // 7 days forcast here
  // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
    
  }

}

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


