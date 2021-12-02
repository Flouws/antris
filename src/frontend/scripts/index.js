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

const app = new App({
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});
