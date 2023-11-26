// API Key bf1daa722e3406449e1e394a9300d503
let fetchButton = document.getElementById('search');
let inputEl = document.getElementById('user-input');
let forecast = document.getElementById('forecast');
let buttonGroup = document.getElementById('historyBar');

let weatherDashboard = document.getElementById('weather-dashboard');

let APIKey = 'bf1daa722e3406449e1e394a9300d503';

function getApi () {
let userInput = inputEl.value.trim();

if (!userInput) {
  alert('You need to fill out the City name!');
  return;
}
buttonGroup.textContent = "";
var btn = document.createElement("button");
btn.textContent = userInput;
btn.classList = 'btn-pr w-100';
buttonGroup.appendChild(btn);



let requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + APIKey + "&units=metric";
console.log(requestUrl);

fetch(requestUrl)
.then(function (response) {
  return response.json();
})
.then(function (data) {
    console.log( data);

    weatherDashboard.textContent = "";
var h3 = document.createElement("h3");
var currentDate = dayjs.unix(data.dt).format(' (MM/DD/YYYY)');
h3.textContent= data.name + currentDate;
var img = document.createElement("img");
img.src= "https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png";
h3.appendChild(img);
var pTemp = document.createElement("p");
pTemp.textContent = "Temp: " + data.main.temp + " °C";
var pWind = document.createElement("p");
pWind.textContent = "Wind: " + data.wind.speed + " MPH";
let pHumidity = document.createElement("p");
pHumidity.textContent = "Humidity: " + data.main.humidity + " %";
weatherDashboard.appendChild(h3);
weatherDashboard.appendChild(pTemp);
weatherDashboard.appendChild(pWind);
weatherDashboard.appendChild(pHumidity);
});

let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput+"&appid=" + APIKey + "&units=metric";
fetch(forecastURL)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data);
  forecast.textContent = "";
  for (let i = 6; i < data.list.length; i = i + 8) {
    console.log(data.list[i].wind.speed);
  var col_2 = document.createElement("div");
  col_2.classList = 'col-2';
  
  var card = document.createElement("div");
  card.classList = 'card';
  col_2.appendChild(card);

  var card_body = document.createElement("div");
  card_body.classList = 'card-body';
  card.appendChild(card_body);

  let h5 = document.createElement('h5');
  h5.textContent = dayjs.unix(data.list[i].dt).format("MM/DD/YYYY");
  h5.classList = 'card-title';
  card_body.appendChild(h5);
  
  forecast.appendChild(col_2);

  let img = document.createElement("img");
  img.src = "https://openweathermap.org/img/wn/"+data.list[i].weather[0].icon+"@2x.png";
  card_body.appendChild(img);

  let pTemp = document.createElement("p");
  pTemp.textContent = "Temp: " + data.list[i].main.temp + " °C";
  card_body.appendChild(pTemp);

  let pWind = document.createElement("p");
  pWind.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
  card_body.appendChild(pWind);
  let pHumidity = document.createElement("p");
  pHumidity.textContent = "Humidity: " + data.list[i].main.humidity + " %";
  card_body.appendChild(pHumidity);


  };
});


};



fetchButton.addEventListener('click', getApi);