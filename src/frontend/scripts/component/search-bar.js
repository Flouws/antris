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
    <select class="js-example-responsive" id="searchBar">
    </select>
  </div>
    `;
  }

  async afterRender() {
    // const hospitals = [{id: 'aid', text: 'a'}, {id: 'bid', text: 'b'}]; // Dummy data
    const hospitals = [];
    const hospitalData = await fetch(API_ENDPOINT.GET_ALL_HOSPITALS, {
      method: 'GET',
    }).then((response) => response.json())
        .then((json) => {
          // console.log(json); // TODO: Buang kalo gapake
          if (json.success) {
            return json.success.data.hospitals;
          } else if (json.error) {
            window.location.href = '#/login';
          }
        })
        .catch((err) => {
        });

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


