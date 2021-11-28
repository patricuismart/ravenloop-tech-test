'use strict';
const user = document.querySelector('.js_user');
const pass = document.querySelector('.js_pass');
const button = document.querySelector('.js_buton');
const resultsContainer = document.querySelector('.js_results');

// info array results api json

let data = [];

//User Login

function userLogin() {
  if (user.value === 'CEO' && pass.value === '1234') {
    console.log('im in');
  } else {
    alert('Porfavor ingrese nombre de usuario y contraseña correctos.');
  }
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
      data = data.results;
      renderList();
    });
  console.log(data);
}

callToApi();

//Render List of results

function renderList() {}

//Events
button.addEventListener('click', handleButton);

//# sourceMappingURL=main.js.map
