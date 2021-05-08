const api = {
    key:'9b6691f6857d42ba669ea62a091d42ae' ,
    baseurl: "http://api.openweathermap.org/data/2.5/"
}

/*const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);*/
const searchbox = document.querySelector('.search-box')

function setQuery(){
    
        getResults(searchbox.value);
        
    
}

function getResults(query){

    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather=>{
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){
    console.log(weather);
    
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBulider(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML=`${Math.round(weather.main.temp)}<span>°c</span>`;
    
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.current .hiilow');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

    let risee = document.querySelector('.sun .rise');
    risee.innerText = `${format_time(weather.sys.sunrise + 19800)} `;

    let sett = document.querySelector('.sun .set');
    sett.innerText = `${format_time(weather.sys.sunset + 19800)} `;

    let windd = document.querySelector('.wind');
    windd.innerText = `${weather.wind.speed} km/hr`;



}

function format_time(s) {
    return new Date(s * 1e3).toISOString().slice(-13, -5);
  }
  
  


 function dateBulider(d){
    let months= ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];

    let days=[ "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    console.log(d);
    let day= days[d.getDay()];
    let date = d.getDate();
    let month= months[d.getMonth()];
    let year = d.getFullYear();
    
    return `${day} ${date} ${month} ${year}`
}
