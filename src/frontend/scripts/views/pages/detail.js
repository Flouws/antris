/* eslint-disable require-jsdoc */
/* eslint-disable new-cap */
/* eslint-disable max-len */
import UrlParser from '../../routes/url-parser';
import {detailBody, polyCard} from '../../templates/template-creator';
import {makeAppointmentModal} from '../../templates/template-modal';
import api from '../../global/api';
import {appendPages, dayConverter} from '../../global/public-function';

const Detail = {
  // TODO: Rapihin Design
  async render() {
    const uuid = UrlParser.parseActiveUrlWithoutCombiner().id;
    const thisHospitalData = await api.getDetailsOneHospital(uuid);
    const city = thisHospitalData.address.split(',').slice(0, -1).slice(-1).join(',');

    const pages = [{link: '#/dashboard', text: 'Dashboard'}];
    appendPages({pages, lastPageText: thisHospitalData.name});

    return `
  <div class="container" id="detailPage">
    ${detailBody({thisHospitalData, city})}
    
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

    thisHospitalData.polys.forEach((polyData) => { // TODO: Bikin screen 'no poly' kalo gada poly
      polys.push(
          polyCard({polyImage: polyData.picture, polyName: polyData.name, polyId: polyData.id,
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

    // ---------------------------------------------

    const test = thisHospitalData.polys[1];
    console.log(test);


    // ------------ Add Queue --------------
    $('#makeAppointmentModalSave').on('click', async () => {
      // const appointmentId = event.currentTarget.attr('name'); // TODO: Fix Depreciated

      // console.log(appointmentId);
      const data = {
        appointmentId: '6',
        isAssurance: null,
      };
      // const datas = new FormData();
      // datas.append('picture', data.picture[0].files[0]);

      const status = await api.addQueue(data);

      if (status === true) {
        console.log('success');
      }
    });
  },
};


export default Detail;
