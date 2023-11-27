// API Key bf1daa722e3406449e1e394a9300d503
// Declaring all var for picking the HTML elements
let fetchButton = document.getElementById('search');
let inputEl = document.getElementById('user-input');
let forecast = document.getElementById('forecast');
let historyList = document.getElementById('historyBar');
let historyButton = document.getElementById('btn-pr');
let weatherDashboard = document.getElementById('weather-dashboard');
// API Key form OpenWeatherMap
let APIKey = 'bf1daa722e3406449e1e394a9300d503';
// Main function which entering the user input, saved and fetching it
function getApi() {
  // get user input
  let userInput = inputEl.value.trim();
  // If user input is empty -> alert
  if (!userInput) {
    alert('You need to fill out the City name!');
    return;
  }
  // Save userInput to the LocalStorage
  saveToLocalStorage(userInput);
  // Function to save user input LocalStorage
  function saveToLocalStorage(city) {
    // let's etrieves the item named 'user-input' from the local storage and 
    // assign it to the history variable.
    let history = localStorage.getItem('user-input');
    // If key exist
    if (history) {
      // Do JSON.parse  and assigns it back to the history variable.
      history = JSON.parse(history);
      // then push city value to history array
      history.push(city);
      // If history already existed - update the local storage 
      // by stringifying the updated history array 
      localStorage.setItem('user-input', JSON.stringify(history));
    } else {
      // If there was no existing history creates a new array containing only the current city
      localStorage.setItem('user-input', JSON.stringify([city]));
    }
  }
  // URL request to the openweathermap.org
  let requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + APIKey + "&units=metric";
  console.log(requestUrl);
  // Do fetch to requestUrl
  fetch(requestUrl)
    // If requestUrl is accepted and we get response do json()
    .then(function (response) {
      return response.json();
    })
    // then manage the response (response = data)
    .then(function (data) {
      console.log(data);
      // Start weather-dashboard element from the scratch
      weatherDashboard.textContent = "";
      // we added h3 element, currentDate and img to the same line
      let h3 = document.createElement("h3");
      let currentDate = dayjs.unix(data.dt).format(' (MM/DD/YYYY)');
      h3.textContent = data.name + currentDate;
      let img = document.createElement("img");
      img.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
      h3.appendChild(img);
      // added 3 paragraphs under h3
      let pTemp = document.createElement("p");
      pTemp.textContent = "Temp: " + data.main.temp + " °C";
      let pWind = document.createElement("p");
      pWind.textContent = "Wind: " + data.wind.speed + " MPH";
      let pHumidity = document.createElement("p");
      pHumidity.textContent = "Humidity: " + data.main.humidity + " %";
      // Appended all HTML elements to the weatherDashboard element
      weatherDashboard.appendChild(h3);
      weatherDashboard.appendChild(pTemp);
      weatherDashboard.appendChild(pWind);
      weatherDashboard.appendChild(pHumidity);
    });
  // URL request to the openweathermap.org got the 5 day forecast
  let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=" + APIKey + "&units=metric";
  // Doing fetch again
  fetch(forecastURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // Start forecast element from the scratch
      forecast.textContent = "";
      // We get the object from openweathermap and all data is located in the list
      // Data showes that is 3 hours forecast
      // Let's loop starting from the 6 item and increment by 8 
      // By this way we will get data for the next day
      for (let i = 6; i < data.list.length; i = i + 8) {
        console.log(data);
        // Creating the divs, h5 and img elements for each card
        let col_2 = document.createElement("div");
        col_2.classList = 'col-2';

        let card = document.createElement("div");
        card.classList = 'card';
        col_2.appendChild(card);

        let card_body = document.createElement("div");
        card_body.classList = 'card-body';
        card.appendChild(card_body);

        let h5 = document.createElement('h5');
        h5.textContent = dayjs.unix(data.list[i].dt).format("MM/DD/YYYY");
        h5.classList = 'card-title';
        card_body.appendChild(h5);

        forecast.appendChild(col_2);

        let img = document.createElement("img");
        img.src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
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

// Function to display search history from local storage
function displaySearchHistory() {
  // Declaration of the displaySearchHistory() function.
  let history = localStorage.getItem('user-input');
  // Retrieve the item named 'user-input' 
  // from the local storage and assigns it to the history variable
  if (history) {
    // If history exists, it parses the data 
    history = JSON.parse(history);
    // Let's clears the existing content of the historyList element 
    // to avoid duplicating the search history.
    historyList.textContent = "";
    // Loop for each history element in the history array
    history.forEach(city => {
      // Create li element and button element
      let liEl = document.createElement("li");
      let btnEl = document.createElement("button");
      // Assign city value to the button element
      btnEl.textContent = city;
      // Assign the class to the button element
      btnEl.classList = 'btn btn-pr w-100 my-1';
      // Let's add EventListener to every each new button element
      btnEl.addEventListener('click', function () {
        inputEl.value = city; // Set input value to the clicked city
        getApi(); // Call getApi function for the clicked city
      });
      // Append button element to the li element
      liEl.appendChild(btnEl);
      // Append li element to the history element
      historyList.appendChild(liEl);
    });
  }
}
// EventListener for the search buttton
fetchButton.addEventListener('click', getApi);

// Display search history upon page load
window.addEventListener('load', displaySearchHistory);