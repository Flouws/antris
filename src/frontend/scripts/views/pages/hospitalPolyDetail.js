/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import api from '../../global/api';
import UrlParser from '../../routes/url-parser';
import {dashboardPolyCard} from '../../templates/template-creator';
import {appendPages} from '../../global/public-function';
import {addAppointmentModal} from '../../templates/template-modal';
import {dayConverter} from '../../global/public-function';

const HospitalPolyDetail = {
  async render() {
    const param = UrlParser.parseActiveUrlWithoutCombiner().id;
    const polyId = param.split('_')[1];

    const polyData = await api.getDetailsOnePoly(polyId);
    const appointmentStatus = await api.getAllAppointments(polyId);

    const pages = [{link: '#/dashboard', text: 'Dashboard'}];
    appendPages({pages, lastPageText: polyData.name});

    if (appointmentStatus.success) {
      console.log('sukses');
    } else {
      console.log('no app'); // TODO: bikin kaya screen poly no appointment
    }

    return `
      <div class="container my-5">
        <div class="card">

          <div class="d-flex justify-content-center my-3 flex-wrap">
            <div class="row row-cols-1 row-cols-md-1 g-4 mx-1 mb-3 no-zoom flex-shrink-0" id="HospitalDetailScreenCard">
              ${dashboardPolyCard({polyImage: polyData.picture, polyName: polyData.name, polyDoctor: polyData.doctor, polyDesc: polyData.description, polyId: polyData.id})}
            </div>

            <div class="flex-grow-1 d-flex flex-wrap mx-5 flex-column">
              <h3 class="title-grey mx-auto mb-3">Appointment Schedule</h3>

              <div class="flex-grow-1 d-flex flex-wrap mx-2 flex-column" id="hospitalDetailAppointmentCardHolder">

              </div>

            </div>
          </div>

        </div>
      </div>

      ${addAppointmentModal()}
    `;
  },

  async afterRender() {
    const param = UrlParser.parseActiveUrlWithoutCombiner().id;
    const polyId = param.split('_')[1];

    await renderPolyCards(addAppointmentCard);

    $('#addAppointmentModalSave').on('click', async () => {
      const data = {
        day: $('#addAppointmentModalSelect').val(),
        timeStart: $('#addAppointmentModalStart').val(),
        timeEnd: $('#addAppointmentModalEnd').val(),
      };

      const status = await api.addAppointment({polyId, appointment: data});
      if (status === true) {
        await renderPolyCards(addAppointmentCard);
      }
    });
  },
};

async function renderPolyCards(addAppointmentCard) {
  $('#hospitalDetailAppointmentCardHolder').empty();

  const param = UrlParser.parseActiveUrlWithoutCombiner().id;
  const polyId = param.split('_')[1];

  const appointmentStatus = await api.getAllAppointments(polyId);

  for (let i = 1; i < 8; i++) {
    $('#hospitalDetailAppointmentCardHolder').append(hospitalDetailAppointmentCard({
      day: dayConverter(i),
    }));
  }


  if (appointmentStatus.success) {
    const param = UrlParser.parseActiveUrlWithoutCombiner().id;
    const hospitalId = param.split('_')[0];
    const queueData = await api.getAllQueue();

    // --------------------------------------------------------------------------
    const appointmentIdArray = [];

    appointmentStatus.success.data.appointments.forEach((appointment) => {
      appointmentIdArray[appointment.id] = 0;

      queueData.success.data.queues.forEach((queue) => {
        if (appointment.id == queue.appointment.id) {
          if (queue.queueStatus.id > 0) {
            // process
          } else if (queue.queueStatus.id < 0) {
            // rejected
          } else {
            appointmentIdArray[appointment.id] ++;
          }
        }
      });

      $(`#hospitalDetailAppointmentCard_${dayConverter(appointment.day)}`).append(`
        <h5 class="card-subtitle mb-2 mt-1 text-muted"><a class="border border-danger rounded-circle px-2 pointer" 
          id="#hospitalDetailAppointmentCard_${appointment.id}" href="#/appointment/${hospitalId}_${polyId}_${appointment.id}">${appointmentIdArray[appointment.id]}</a> 
          ${appointment.timeStart} - ${appointment.timeEnd}</h5>
        `,
      );
    });
  } else {
    console.log('no app'); // TODO: bikin kaya screen poly no appointment
  }

  // Kartu untuk add poly
  $('#hospitalDetailAppointmentCardHolder').append(addAppointmentCard);
}

const addAppointmentCard = `
  <div class="card w-100 my-1 add-appointment-card pointer" data-toggle="modal" data-target="#addAppointmentModal">
    <div class="card-body">
      <h5 class="d-inline text-muted">Add Appointment Schedule</h5>
    </div>
  </div>
`;

const hospitalDetailAppointmentCard = ({day}) => `
  <div class="card w-100 my-1">
    <div class="card-body" id="hospitalDetailAppointmentCard_${day}">
      <h5 class="">${day}:</h5>
    </div>
  </div>
`;

// const hospitalDetailAppointmentCard = ({day, timeStart, timeEnd}) => `
//   <div class="card w-100 my-1">
//     <div class="card-body">
//       <h5 class="">${day}:</h5>
//       <h5 class="card-subtitle mb-2 text-muted">${timeStart} - ${timeEnd}</h5>
//     </div>
//   </div>
// `;

export default HospitalPolyDetail;
