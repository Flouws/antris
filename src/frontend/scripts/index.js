import 'regenerator-runtime';
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-select';
// import 'bootstrap-select/dist/css/bootstrap-select.css';


import '../styles/main.scss';
import './component/nav-bar.js';
import './component/change-password.js';
import './component/search-bar.js';
import '../styles/main.css';
import App from './views/app.js';

// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';
// require('bootstrap');
// require('bootstrap/dist/css/bootstrap.css');
// require('bootstrap-select/js/bootstrap-select');
// require('bootstrap-select/dist/css/bootstrap-select.css');

const app = new App({
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});
