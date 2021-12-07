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
    // const optionSiloamKarawaci = 'optionSiloamKarawaci';
    // <option data-tokens="ketchup mustard">Hot Dog, Fries and a Soda</option>
    // <option data-tokens="mustard">Burger, Shake and a Smile</option>
    // <option data-tokens="frosting">Sugar, Spice and all things nice</option>
    const options = [`<option>Siloam Hospitals</option>`,
      `<option>RSUD Tangerang Selatan</option>`]; // TODO: connect ke backend

    $('#searchSelect').append(options);

    $('#searchSelect').on('change', () => {
      // TODO: gabung dengan backend
      const webId = 'test';
      const selectedValue = $('#searchSelect').val();
      console.log(selectedValue);

      window.location.href = `#/detail/${webId}`;
    });
  }
}

customElements.define('search-bar', SearchBar);


