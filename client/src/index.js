
var app = function(){
  var url = 'https://restcountries.eu/rest/v1/all';
  makeRequest(url, requestComplete);
  
  var countries = [];

  var selectBox = document.getElementById('country-list');
  selectBox.onchange = handleSelectChanged;
}

var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var requestComplete = function() {
  if (this.status != 200) return;

  var jsonString = this.responseText;
  countries = JSON.parse(jsonString);
  populateList(countries);
}

var populateList = function(allCountries) {
  var select = document.getElementById('country-list');
  for (i = 0; i < allCountries.length; i++) {
    var option = document.createElement('option');
    var country = allCountries[i];
    option.innerText = country.name;
    option.value = country.name;
    select.appendChild(option);
  }
}

var handleSelectChanged = function(event) {
  event.preventDefault();
  console.log(event.target.value);
  var country = {
    country: event.target.value
  }
  saveAccount(country);
}

var saveAccount = function(country) {
  var url = "http://localhost:3000/countries";
  var request = new XMLHttpRequest();
  request.open("POST", url);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    if (request.status === 200) {
      console.log(country);
    }
  }
  request.send(JSON.stringify(country));
}

window.onload = app;