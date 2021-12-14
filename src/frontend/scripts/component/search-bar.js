/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import api from '../global/api';

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
    <select class="js-example-responsive" id="searchBar">
    </select>
  </div>
    `;
  }

  async afterRender() {
    const hospitals = [{id: 'first', text: 'Find Hospitals'}];
    const hospitalData = await api.getAllHospitals();

    hospitalData.forEach((element) => {
      const hospital = {
        id: element.uuid,
        text: element.name,
      };
      hospitals.push(hospital);
    });

    $('#searchBar').select2({
      placeholder: 'Select Hospital',
      data: hospitals,
    });

    $('#searchBar').on('select2:select', (e) => {
      const uuid = e.params.data.id;
      window.location.href = `#/detail/${uuid}`;

      // console.log(uuid); // TODO: Kalo udah selected, gabisa pilih itu lagi. soalnya udah 'selected'
    });
  }
}

customElements.define('search-bar', SearchBar);


