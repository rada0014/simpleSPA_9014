//app is for general control over the application
//and connections between the other components
const APP = {
  apiStaple: 'https://api.themoviedb.org/3/',
  apiPerson: 'search/person?api_key=',
  apiKey: '47bef60ec30c0c24bef8331cca476134&query=',
  searchBox: document.querySelector('#search'),
  init: () => {
    let url = ''.concat(APP.apiStaple, APP.apiPerson, APP.apiKey, APP.searchBox.nodeValue);
    console.log(url);
    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("NETWORK ERROR")
      }
    })
    .then(data => {
      console.log(data);
    })
    .then(APP.searchBox.addEventListener('search', APP.searchFunc))
  },
  searchFunc: () => {
    console.log(`${APP.searchBox.nodeValue}`);
  },
  displayPersons: (results) => {
    let contentHolder = document.querySelector('#contentHolder');
    const Actors = results.map((results) => {
      return `
      <li class="result">
      <h2>${results.name}</h2>
      <p>${results.known_for_department}</p>
      <p>${results.popularity}</p>`
    })
    contentHolder.append(Actors);


  }
}

document.addEventListener('DOMContentLoaded', APP.init);

//search is for anything to do with the fetch api
const SEARCH = {};

//actors is for changes connected to content in the actors section
const ACTORS = {};

//media is for changes connected to content in the media section
const MEDIA = {};

//storage is for working with localstorage
const STORAGE = {
  //this will be used in Assign 4
};

//nav is for anything connected to the history api and location
const NAV = {
  //this will be used in Assign 4
};

//Start everything running

APP.init();
