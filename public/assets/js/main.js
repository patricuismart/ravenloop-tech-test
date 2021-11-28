'use strict';
const user = document.querySelector('.js_user');
const pass = document.querySelector('.js_pass');
const button = document.querySelector('.js_buton');

let results = [];

//User Login

function userLogin() {
  if (user.value === 'CEO' && pass.value === '1234') {
    console.log('im in');
  } else {
    alert('Porfavor ingrese nombre de usuario y contraseña correctos.');
  }
}
// Handle Functions

function handleButton() {
  userLogin();
}
//Events
button.addEventListener('click', handleButton);

//# sourceMappingURL=main.js.map
