'use strict';

// global variables
const user = document.querySelector('.js_user');
const pass = document.querySelector('.js_pass');
const wellcome = document.querySelector('.js_wellcome');
const loginButton = document.querySelector('.js_login');
const logoutButon = document.querySelector('.js_logout');
const buttonBack = document.querySelector('.js_buttonBack');
const gif = document.querySelector('.js_gif');
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

//User Login
function userLogin() {
  if (user.value === login.user && pass.value === login.pass) {
    console.log('im in');
    hideSection.classList.add('hidden');
    pagination.classList.remove('hidden');
    logoutButon.classList.remove('hidden');
    wellcome.classList.add('hidden');
    gif.classList.add('hidden');
    changePage(1);
  } else {
    alert('Porfavor ingrese nombre de usuario y contraseña correctos.');
    user.value = '';
    pass.value = '';
  }
  // call to render results function (with pagination)
}

// Handle Functions

function handleLogin(event) {
  event.preventDefault();
  userLogin();
}

function handleLogout() {
  location.reload();
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
    listenList();
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
    resultsContainer.innerHTML += `<li id=${results[i].id} class="results__item js_item">
    <p class="results__name">Nombre del fichero: ${results[i].name}</p>
    <p class="results__date">fecha de inserción: ${results[i].date}</p>
    <p class="results__actualization">última actualización: ${results[i].actualization}</p>
    <p class="results__os">sistema operativo: ${results[i].os}</p>
  </li>`;
    buttonBack.classList.add('hidden');
    listenList();
  }

  //render page number

  const totalPages = Math.ceil(results.length / records_per_page);
  console.log(totalPages);
  page_span.innerHTML = `${page} / ${totalPages}`;

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

// Detail of result

// Handle function selected item by id

function handleItem(ev) {
  var selectedItem = ev.currentTarget.id;
  console.log(selectedItem);

  //render detail item  selected
  let html = '';
  for (const result of results) {
    html = `<li id=${result.id} class="results__item js_item">
    <p class="results__name">Nombre del fichero: ${result.name}</p>
    <p class="results__extension">Extension: ${result.extension}</p>
    <p class="results__size">Tamaño: ${result.size}</p>
    <p class="results__hash">Hash: ${result.hash.md5}</p>
    <p class="results__hash">Sha256: ${result.hash.sha256}</p>
    <p class="results__hash">Sha1: ${result.hash.sha1}</p>
    <p class="results__ip">IP: ${result.ip}</p>
    <p class="results__score">Puntuación: ${result.score}</p>
    <p class="results__fileList">Listado ficheros: ${result.fileList.one}</p>
    <p class="results__fileList">Listado ficheros: ${result.fileList.two}</p>
    <p class="results__fileList">Listado ficheros: ${result.fileList.three}</p>
    <p class="results__antivirusList">Kaspersky: ${result.antivirusList.Kaspersky}</p>
    <p class="results__antivirusList">ESET: ${result.antivirusList.ESET}</p>
    <p class="results__antivirusList">Norton: ${result.antivirusList.Norton}</p>
     </li>`;
    buttonBack.classList.remove('hidden');
  }
  pagination.classList.add('hidden');
  resultsContainer.innerHTML = html;
}

//Listen to all the items, go through them and identify by id on click with event

function listenList() {
  const listMalware = document.querySelectorAll('.js_item');
  for (const itemClicked of listMalware) {
    itemClicked.addEventListener('click', handleItem);
  }
}

// UI Back return to list of all results
function handleBack(event) {
  event.preventDefault();
  changePage(1);
  pagination.classList.remove('hidden');
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
loginButton.addEventListener('click', handleLogin);
logoutButon.addEventListener('click', handleLogout);
buttonBack.addEventListener('click', handleBack);

//# sourceMappingURL=main.js.map
