/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
class NavigationBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    const dashboardLink = '#/dashboard';
    const profileLink = '#/profile';
    const loginLink = '#/login';

    this.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-3">
      <a class="navbar-brand" href="${dashboardLink}">ANTRIS</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="${dashboardLink}">Dashboard</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="" id="navbarDropdownMenuLink" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              Rumah Sakit
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="#">Lihat Semua Rumah Sakit</a>
              <a class="dropdown-item" href="#">Antrian</a>
              <a class="dropdown-item" href="#">Sejarah</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${profileLink}">Profil</a>
          </li>
          <li class="nav-item" id="logoutMobile">
            <a class="nav-link" href="${loginLink}">Logout</a>
          </li>
        </ul>
      </div>
      <ul class="nav navbar-nav navbar-right" id="logoutDesktop">
        <li><a href="${loginLink}"><img src="./images/icons8-logout-28.png"></img> Logout</a></li>
      </ul>
    </nav>
`;
  }
}

customElements.define('nav-bar', NavigationBar);

