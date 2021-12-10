/* eslint-disable new-cap */
/* eslint-disable max-len */
import UrlParser from '../../routes/url-parser';
import API_ENDPOINT from '../../global/api-endpoint';
import {polyCard} from '../../templates/template-creator';

const Detail = {
  // TODO: Rapihin Design
  async render() {
    const uuid = UrlParser.parseActiveUrlWithoutCombiner().id;
    const hospitalData = await fetch(API_ENDPOINT.GET_DETAILS_ONE_HOSPITAL(uuid), {
      method: 'GET',
    }).then((response) => response.json())
        .then((json) => {
          if (json.success) {
            return json.success.data.hospital;
          } else if (json.error) {
            window.location.href = '#/login';
          }
        })
        .catch((err) => {
        });
    const city = hospitalData.address.split(',').slice(0, -1).slice(-1).join(',');

    // const rsName = 'RSUD Tangerang Selatan';
    // const rsProvince = 'Tangerang Selatan, Banten';
    const rsEmail = 'rsudtangsel@antris.com';
    const rsPhone = '(021) 7492398';
    // const rsAddress = 'Jl. Pajajaran No.101, Pamulang Bar., Kec. Pamulang, Kota Tangerang Selatan, Banten 15417';
    const rsDesc = `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.`;

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
              <li class="mb-3"><a href="#!"><i
                    class="far fa-envelope display-25 me-3 text-secondary"></i>${rsEmail}</a></li>
              <li class="mb-3"><a href="#!"><i class="fas fa-mobile-alt display-25 me-3 text-secondary"></i>${rsPhone}</a></li>
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
            <p>Deskripsi Singkat RS</p>
            <p class="mb-0">${rsDesc}</p>
          </div>
          <div class="mb-5 wow fadeIn">
            <div class="text-start mb-1-6 wow fadeIn">
              <h2 class="mb-0 text-primary">Dokter ${hospitalData.name}</h2>
            </div>
              <div class="container">
                <div class="d-flex align-content-start flex-wrap"  id="polyCard">

                </div>
              </div>
          </div>
        </div>
        <button type="button" class="btn btn-primary btn-lg btn-block" id="makeAppointmentButton" data-toggle="modal" data-target="#makeAppointmentModal">Buat Appointment</button>
      </div>
    </div>


    <!-- Modal -->
    <div class="modal fade" id="makeAppointmentModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Buat Appointment</h5>
            <img src="./images/close-24.png" data-dismiss="modal" class="pointer" alt="close" />
          </div>
          <div class="modal-body">

            <form class="was-validated">

              <div class="form-group mb-2">
                <label>Rumah Sakit</label>
                <select class="form-select" id="makeAppointmentRSList">
                </select>
              </div>

              <div class="form-group mb-2">
                <label>Dokter</label>
                <select class="form-select" required id="makeAppointmentDoctorList">
                  <option value="" selected disabled>Pilih Dokter</option>
                </select>
                <div class="invalid-feedback">Mohon Dokter waktu yang tersedia</div>
              </div>

              <div class="form-group mb-2">
                <label>Waktu</label>
                <select class="form-select" required id="makeAppointmentTimeList">
                  <option value="" selected disabled>Pilih Waktu</option>
                </select>
                <div class="invalid-feedback">Mohon pilih waktu yang tersedia</div>
              </div>

            </form>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Buat Appointment</button>
          </div>
        </div>
      </div>
    </div>

  </div>
      `;
  },

  async afterRender() {
    const polys = [];
    const uuid = UrlParser.parseActiveUrlWithoutCombiner().id;
    const hospitalData = await fetch(API_ENDPOINT.GET_DETAILS_ONE_HOSPITAL(uuid), { // TODO: Duplicate hospitalData di 1 file
      method: 'GET',
    }).then((response) => response.json())
        .then((json) => {
          if (json.success) {
            return json.success.data.hospital;
          } else if (json.error) {
            window.location.href = '#/login';
          }
        })
        .catch((err) => {
        });

    hospitalData.polys.forEach((polyData) => {
      // const poly = polyCard;

      polys.push(polyCard({polyImage: 'http://envato.jayasankarkr.in/code/profile/assets/img/profile-4.jpg', polyName: polyData.name,
        polyDoctor: polyData.doctor, polyDesc: polyData.desc, polyCapacity: polyData.capacity}));
    });

    $('#polyCard').append(polys);


    $('#makeAppointmentButton').on('click', () => {
      console.log('click');
    });

    // Modal
    // TODO: Connect Backend
    const modalRSList = ['RSUD Tangerang Selatan', 'Sari Asih Ciputat Hospital', 'RSIA Permata Sarana Husada'];
    const modalDoctorList = ['dr. A', 'dr. B', 'dr. C'];
    const modalTimeList = ['11.00', '12.00', '14.00'];

    // makeAppointmentRSList, makeAppointmentDoctorList, makeAppointmentTimeList
    const rsTemp = [];
    const doctorTemp = [];
    const timeTemp = [];

    modalRSList.forEach((data) => {
      rsTemp.push(`<option selected>${data}</option>`);
    });
    modalDoctorList.forEach((data) => {
      doctorTemp.push(`<option selected>${data}</option>`);
    });
    modalTimeList.forEach((data) => {
      timeTemp.push(`<option selected>${data}</option>`);
    });

    $('#makeAppointmentRSList').append(rsTemp);
    $('#makeAppointmentDoctorList').append(doctorTemp);
    $('#makeAppointmentTimeList').append(timeTemp);
  },
};

export default Detail;
