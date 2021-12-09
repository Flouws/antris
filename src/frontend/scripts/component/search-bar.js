/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import API_ENDPOINT from '../global/api-endpoint';

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
        <option selected="selected" disabled>Pilih Rumah Sakit</option>
        <option>nyoba</option>
        <option>nyoba</option>
      </select>
    </form>
  </div>
    `;
  }

  async afterRender() {
    const hospitalOptions = [];
    const hospital = await fetch(API_ENDPOINT.GET_ALL_HOSPITALS, {
      method: 'GET',
    }).then((response) => response.json())
        .then((json) => {
          console.log(json); // TODO: Buang kalo gapake
          if (json.success) {
            return json.success.data.hospitals;
          } else if (json.error) {
            window.location.href = '#/login';
          }
        })
        .catch((err) => {
        });

    hospital.forEach((element) => {
      hospitalOptions.push(`<option>${element.name}</option>`);
    });

    $('#searchSelect').append(hospitalOptions);
    // $('#searchSelect').selectpicker('refresh');

    $('#searchSelect').on('change', () => {
      const webId = 'test';
      const selectedValue = $('#searchSelect').val();
      // console.log(selectedValue);

      window.location.href = `#/detail/${webId}`;
    });
  }
}

customElements.define('search-bar', SearchBar);


