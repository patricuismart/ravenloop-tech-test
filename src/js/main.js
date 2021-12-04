'use strict';

// global variables
const user = document.querySelector('.js_user');
const pass = document.querySelector('.js_pass');
const button = document.querySelector('.js_buton');
const hideSection = document.getElementById('hideSection');
const resultsContainer = document.querySelector('.js_results');
const pagination = document.querySelector('.js_pagination');

// info array results api json
let login = [];
let results = [];
let html = '';
let buttons = '';

//User Login
function userLogin() {
  let currentList = '';
  if (user.value === login.user && pass.value === login.pass) {
    console.log('im in');

    // go through array of objects
    for (let index = 0; index < results.length; index++) {
      const malware = results[index];
      currentList = renderMalwareItem(malware);
      hideSection.classList.add('hidden');
      console.log('malware', malware);
    }
  } else {
    alert('Porfavor ingrese nombre de usuario y contraseña correctos.');
  }
  resultsContainer.innerHTML = currentList;
}

//Render List of results
function renderMalwareItem(malware) {
  html += `  <h2 class="results__tittle">resultados</h2>
       <li class="results__item">
          <p class="results__name">Nombre del fichero: ${malware.name}</p>
          <p class="results__date">fecha de inserción: ${malware.date}</p>
          <p class="results__actualization">última actualización: ${malware.actualization}</p>
          <p class="results__os">sistema operativo: ${malware.os}</p>
        </li>`;
  return html;
}

// Handle Functions

function handleButton(event) {
  event.preventDefault();
  userLogin();
}

//Pagination

//Call to api
// FETCH
function callToApi() {
  fetch(
    'https://raw.githubusercontent.com/patricuismart/api-ravenloop-tech-test/main/api/data.json'
  )
    .then((response) => response.json())
    .then((data) => {
      login = data.login;
      results = data.results;
    });
}

callToApi();

//Events
button.addEventListener('click', handleButton);
