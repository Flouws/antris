import 'regenerator-runtime';
import 'bootstrap';

import '../styles/main.scss';
import '../styles/main.css';
import '../styles/check.css';

import './component/nav-bar';
import './component/change-password';
import './component/search-bar';
import './component/bread-crumb';

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


