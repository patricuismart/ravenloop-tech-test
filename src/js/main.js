'use strict';

// global variables
const user = document.querySelector('.js_user');
const pass = document.querySelector('.js_pass');
const button = document.querySelector('.js_buton');
const hideSection = document.getElementById('hideSection');
var resultsContainer = document.getElementById('resultsContainer');
const pagination = document.querySelector('.js_pagination');

// variables pagination

var btn_next = document.getElementById('btn_next');
var btn_prev = document.getElementById('btn_prev');
var page_span = document.getElementById('page');

// info array results api json
let login = [];
let results = [];

let buttons = '';
let currentList = '';

//User Login
function userLogin() {
  if (user.value === login.user && pass.value === login.pass) {
    console.log('im in');
    hideSection.classList.add('hidden');
    pagination.classList.remove('hidden');
  } else {
    alert('Porfavor ingrese nombre de usuario y contraseña correctos.');
  }
  // call to render results function (with pagination)
  changePage(1);
}

// Handle Functions

function handleButton(event) {
  event.preventDefault();
  userLogin();
}

//Pagination

var current_page = 1;
var records_per_page = 4;

function prevPage() {
  if (current_page > 1) {
    current_page--;
    changePage(current_page);
  }
}

function nextPage() {
  if (current_page < numPages()) {
    current_page++;
    changePage(current_page);
  }
}

function changePage(page) {
  // Validate page

  if (page < 1) page = 1;
  if (page > numPages()) page = numPages();
  resultsContainer.innerHTML = '';

  //Render List of results

  for (
    var i = (page - 1) * records_per_page;
    i < page * records_per_page && i < results.length;
    i++
  ) {
    resultsContainer.innerHTML += `<li class="results__item">
       <p class="results__name">Nombre del fichero: ${results[i].name}</p>
       <p class="results__date">fecha de inserción: ${results[i].date}</p>
       <p class="results__actualization">última actualización: ${results[i].actualization}</p>
       <p class="results__os">sistema operativo: ${results[i].os}</p>
     </li>`;
  }

  //render page number

  page_span.innerHTML = page;

  if (page == 1) {
    btn_prev.style.visibility = 'hidden';
  } else {
    btn_prev.style.visibility = 'visible';
  }

  if (page == numPages()) {
    btn_next.style.visibility = 'hidden';
  } else {
    btn_next.style.visibility = 'visible';
  }
}

// returns the integer greater or equal closest to division

function numPages() {
  return Math.ceil(results.length / records_per_page);
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
}

callToApi();

//Events
button.addEventListener('click', handleButton);
