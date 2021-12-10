/* eslint-disable new-cap */
/* eslint-disable max-len */
import UrlParser from '../../routes/url-parser';
import {polyCard} from '../../templates/template-creator';
import {makeAppointmentModal} from '../../templates/template-modal';
import api from '../../global/api';

const Detail = {
  // TODO: Rapihin Design
  async render() {
    const uuid = UrlParser.parseActiveUrlWithoutCombiner().id;
    const hospitalData = await api.getDetailsOneHospital(uuid);
    const city = hospitalData.address.split(',').slice(0, -1).slice(-1).join(',');

    return `
  <div class="container" id="detailPage">
    <div class="row justify-content-center">
      <div class="col-md-7 col-lg-4 mb-5 mb-lg-0 wow fadeIn">
        <div class="card border-0 shadow">
          <img src="https://www.bootdey.com/img/Content/avatar/avatar6.png" alt="Gambar RS">
          <div class="card-body p-1-9 p-xl-5">
            <div class="mb-4">
              <h3 class="h4 mb-0">${hospitalData.name}</h3>
              <span class="text-primary">${city}</span>
            </div>
            <ul class="list-unstyled mb-4">
              <li class="mb-3"><a href="#!"><i class="fas fa-mobile-alt display-25 me-3 text-secondary"></i>${hospitalData.phone}</a></li>
              <li><a href="#!"><i class="fas fa-map-marker-alt display-25 me-3 text-secondary"></i>${hospitalData.address}</a></li>
            </ul>
            <ul class="social-icon-style2 ps-0">
              <li><a href="#!" class="rounded-3"><i class="fab fa-facebook-f"></i></a></li>
              <li><a href="#!" class="rounded-3"><i class="fab fa-twitter"></i></a></li>
              <li><a href="#!" class="rounded-3"><i class="fab fa-youtube"></i></a></li>
              <li><a href="#!" class="rounded-3"><i class="fab fa-linkedin-in"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="ps-lg-1-6 ps-xl-5">
          <div class="mb-5 wow fadeIn">
            <div class="text-start mb-1-6 wow fadeIn">
              <h2 class="h1 mb-0 text-primary">Tentang ${hospitalData.name}</h2>
            </div>
            <p class="mb-0">${hospitalData.description}</p>
          </div>
          <div class="mb-5 wow fadeIn">
            <div class="text-start mb-1-6 wow fadeIn">
              <h2 class="mb-0 text-primary">Poliklinik di ${hospitalData.name}</h2>
            </div>
              <div class="container">
                <div class="d-flex align-content-start flex-wrap"  id="polyCard">

                </div>
              </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Modal -->
    ${makeAppointmentModal}

  </div>
      `;
  },

  async afterRender() {
    const polys = [];
    const uuid = UrlParser.parseActiveUrlWithoutCombiner().id;
    const hospitalData = await api.getDetailsOneHospital(uuid);

    hospitalData.polys.forEach((polyData) => {
      polys.push(
          polyCard({polyImage: polyData.picture, polyName: polyData.name,
            polyDoctor: polyData.doctor, polyDesc: polyData.description, polyCapacity: polyData.capacity}));
    });

    $('#polyCard').append(polys);

    // Modal

    // TODO: Connect Backend
    const modalRSList = ['RSUD Tangerang Selatan', 'Sari Asih Ciputat Hospital', 'RSIA Permata Sarana Husada'];
    const modalDoctorList = ['dr. A', 'dr. B', 'dr. C'];
    const modalTimeList = ['11.00', '12.00', '14.00'];

    // makeAppointmentRSSelect, makeAppointmentPolySelect, makeAppointmentTimeSelect
    const rsTemp = [];
    const doctorTemp = [];
    const timeTemp = [];

    modalRSList.forEach((data) => {
      rsTemp.push(`<option>${data}</option>`);
    });
    modalDoctorList.forEach((data) => {
      doctorTemp.push(`<option>${data}</option>`);
    });
    modalTimeList.forEach((data) => {
      timeTemp.push(`<option>${data}</option>`);
    });

    $('#makeAppointmentRSSelect').append(rsTemp);
    $('#makeAppointmentPolySelect').append(doctorTemp);
    $('#makeAppointmentTimeSelect').append(timeTemp);
  },
};

export default Detail;
