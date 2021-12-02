/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

// TODO: Rapihin & Masukin ke dashboard
class SearchBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.afterRender();
  }

  async render() {
    this.innerHTML = `
  <div class="container">
    <form class="">
      <select class="selectpicker form-control me-2" data-live-search="true" id="searchSelect">

      </select>
    </form>
  </div>
    `;
  }

  async afterRender() {
    // <option data-tokens="ketchup mustard">Hot Dog, Fries and a Soda</option>
    // <option data-tokens="mustard">Burger, Shake and a Smile</option>
    // <option data-tokens="frosting">Sugar, Spice and all things nice</option>
    const options = ['<option data-tokens="ketchup mustard">Hot Dog, Fries and a Soda</option>']; // TODO: connect ke backend

    $('#searchSelect').append(options);
  }
}

customElements.define('search-bar', SearchBar);


