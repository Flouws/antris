import 'regenerator-runtime';
import 'bootstrap';
import '../styles/main.scss';
import './component/login-page.js';
import './component/register-page.js';
import './component/nav-bar.js';
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
