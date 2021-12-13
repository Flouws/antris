/* eslint-disable require-jsdoc */
/* eslint-disable new-cap */
/* eslint-disable max-len */
import UrlParser from '../../routes/url-parser';
import {polyCard} from '../../templates/template-creator';
import {makeAppointmentModal} from '../../templates/template-modal';
import api from '../../global/api';
import {dayConverter} from '../../global/public-function';

const Detail = {
  // TODO: Rapihin Design
  async render() {
    const uuid = UrlParser.parseActiveUrlWithoutCombiner().id;
    const thisHospitalData = await api.getDetailsOneHospital(uuid);
    const city = thisHospitalData.address.split(',').slice(0, -1).slice(-1).join(',');

    return `
  <div class="container" id="detailPage">
    <div class="row justify-content-center">
      <div class="col-md-7 col-lg-4 mb-5 mb-lg-0 wow fadeIn">
        <div class="card border-0 shadow">
          <img src="https://www.bootdey.com/img/Content/avatar/avatar6.png" alt="Gambar RS">
          <div class="card-body p-1-9 p-xl-5">
            <div class="mb-4">
              <h3 class="h4 mb-0">${thisHospitalData.name}</h3>
              <span class="text-primary">${city}</span>
            </div>
            <ul class="list-unstyled mb-4">
              <li class="mb-3"><a href="#!"><i class="fas fa-mobile-alt display-25 me-3 text-secondary"></i>${thisHospitalData.phone}</a></li>
              <li><a href="#!"><i class="fas fa-map-marker-alt display-25 me-3 text-secondary"></i>${thisHospitalData.address}</a></li>
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
              <h2 class="h1 mb-0 text-primary">Tentang ${thisHospitalData.name}</h2>
            </div>
            <p class="mb-0">${thisHospitalData.description}</p>
          </div>
          <div class="mb-5 wow fadeIn">
            <div class="text-start mb-1-6 wow fadeIn">
              <h2 class="mb-0 text-primary">Poliklinik di ${thisHospitalData.name}</h2>
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
    const hospitalNames = [];
    const polyNames = [];
    const schedules = [];

    const uuid = UrlParser.parseActiveUrlWithoutCombiner().id;
    const thisHospitalData = await api.getDetailsOneHospital(uuid);

    thisHospitalData.polys.forEach((polyData) => {
      polys.push(
          polyCard({polyImage: polyData.picture, polyName: polyData.name,
            polyDoctor: polyData.doctor, polyDesc: polyData.description, polyCapacity: polyData.capacity,
          }),
      );

      polyNames.push(`<option value="${polyData.id}">${polyData.name}</option>`);
    });
    $('#polyCard').append(polys);

    hospitalNames.push(`<option selected>${thisHospitalData.name}</option>`);
    // polyNames.push(`<option selected>${thisHospitalData.polyData}</option>`); // TODO: bikin fitur biar poly yang mau, langsung keselected

    $( '#makeAppointmentModalPolySelect' ).on( 'change', async () => {
      const selectedPoly = $('#makeAppointmentModalPolySelect :selected').val();
      const result = await api.getDetailsOneHospitalPoly({hospitalUuid: uuid, polyId: selectedPoly});
      const invalidId = '#makeAppointmentModalTimeInvalid';

      if (result.success) {
        schedules.length = 0;

        $(invalidId).hide();
        $('#makeAppointmentModalTimeSelect').empty();
        $('#makeAppointmentModalTimeSelect').prop('disabled', false);

        result.success.data.appointments.forEach((schedule) => {
          schedules.push(`<option value="${schedule.id}">${dayConverter(schedule.day)}, Jam ${schedule.timeStart} - ${schedule.timeEnd}</option>`);
        });

        $('#makeAppointmentModalTimeSelect').append(schedules);
      } else if (result.error) {
        schedules.length = 0;

        $(invalidId).html('This polyclinic has no available appointment');
        $(invalidId).show();

        $('#makeAppointmentModalTimeSelect').empty();
        $('#makeAppointmentModalTimeSelect').prop('disabled', true);
      }
    });

    $('#makeAppointmentModalRSSelect').append(hospitalNames);
    $('#makeAppointmentModalPolySelect').append(polyNames);
  },
};


export default Detail;
