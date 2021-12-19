/* eslint-disable guard-for-in */
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


    // -------------- Get poly id when a card is clicked ----------------
    // let clickedPolyId;

    // $('.detailPolyCard').on('click', async () => {
    //   clickedPolyId = $(event.currentTarget).attr('name'); // TODO: Fix Depreciated
    // });


    // ----------------- render poly cards ------------------
    thisHospitalData.polys.forEach((polyData) => { // TODO: Bikin screen 'no poly' kalo gada poly
      polys.push(
          polyCard({polyImage: polyData.picture, polyName: polyData.name, polyId: polyData.id,
            polyDoctor: polyData.doctor, polyDesc: polyData.description, polyCapacity: polyData.capacity,
          }),
      );

      polyNames.push(`<option value="${polyData.id}">${polyData.name}</option>`);
    });
    $('#polyCard').append(polys);


    // ----------------- modal ------------------
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


    // ------------ Add Queue --------------
    $('#makeAppointmentModalSave').on('click', async () => {
      const data = {
        appointmentId: $('#makeAppointmentModalTimeSelect').val(),
        isAssurance: checkToNum($('#makeAppointmentModalAsuransi').is(':checked')),
        picture1: $('#makeAppointmentModalImage1'),
        picture2: $('#makeAppointmentModalImage2'),
        picture3: $('#makeAppointmentModalImage3'),
        picture4: $('#makeAppointmentModalImage4'),
        picture5: $('#makeAppointmentModalImage4'),
      };

      const datas = new FormData();
      datas.append('picture1', data.picture1[0].files[0]);
      datas.append('picture2', data.picture2[0].files[0]);
      datas.append('picture3', data.picture3[0].files[0]);
      datas.append('picture4', data.picture4[0].files[0]);
      datas.append('picture5', data.picture5[0].files[0]);

      for ( const key in data ) { // TODO: bikin fungsi & benerin kode (guard in apalah itu)
        datas.append(key, data[key]);
      }

      const status = await api.addQueue(datas);

      if (status === true) {
        console.log('success');
      }
    });
  },
};

function checkToNum(checked) {
  if (checked) {
    return 1;
  } else {
    return 0;
  }
}


export default Detail;
