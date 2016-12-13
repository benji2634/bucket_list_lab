var MapWrapper = require('./mapWrapper');

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
    option.value = i;
    select.appendChild(option);
  }
}

var handleSelectChanged = function(event) {
  event.preventDefault();
  var country = countries[event.target.value];
  console.log(country);
  var countryName = {
    country: country.name
  }
  saveCountry(countryName);
  getMap(country);
}

var getMap = function(country) {
  var container = document.getElementById('main-map');
  var latitude  = country.latlng[0];
  var longitude = country.latlng[1];
  var location = {lat: latitude, lng: longitude};
  var mainMap = new MapWrapper(container, location, 5);
  mainMap.addMarker(location);
}

var saveCountry = function(countryName) {
  var url = "http://localhost:3000/countries";
  var request = new XMLHttpRequest();
  request.open("POST", url);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    if (request.status === 200) {
      console.log(countryName);
    }
  }
  request.send(JSON.stringify(countryName));
}

window.onload = app;