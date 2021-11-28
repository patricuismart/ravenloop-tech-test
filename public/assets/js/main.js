'use strict';
const user = document.querySelector('.js_user');
const pass = document.querySelector('.js_pass');
const button = document.querySelector('.js_buton');
const resultsContainer = document.querySelector('.js_results');

// info array results api json
let login = [];
let results = [];
let html = '';

//User Login

function userLogin() {
  let currentList = '';
  if (user.value === login.user && pass.value === login.pass) {
    console.log('im in');
    for (let index = 0; index < results.length; index++) {
      const malware = results[index];
      currentList += renderMalwareItem(malware);
    }
  } else {
    alert('Porfavor ingrese nombre de usuario y contraseña correctos.');
  }
  resultsContainer.innerHTML = currentList;
}

//Render List of results

function renderMalwareItem(malware) {
  html += `  <h2 class="results__tittle">resultados</h2>
       <li key={index} className="results__item">
          <p className="results__name">Nombre del fichero: ${malware.name}</p>
          <p className="results__date">
            <label className="results__label">
              fecha de inserción: ${malware.date}
            </label>
          </p>
          <p className="results__actualization">
            <label className="results__label">
              última actualización: ${malware.actualization}
            </label>
          </p>
          <p className="results__os">
            <label className="results__label">
              sistema operativo: ${malware.os}
            </label>
          </p>
        </li>`;
  return html;
}

// Handle Functions

function handleButton(event) {
  event.preventDefault();
  userLogin();
}

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
  console.log(results);
}

callToApi();

//Events
button.addEventListener('click', handleButton);

//# sourceMappingURL=main.js.map
