/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
class PageBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    const pageBarType = 'dark'; // light, dark, primary

    this.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-light bread-crumb-${pageBarType}">
            <span class="px-3" id="pageBar">
            </span>
        </nav>
      `;
  }
}

customElements.define('bread-crumb', PageBar);


