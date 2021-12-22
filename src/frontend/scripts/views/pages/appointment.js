/* eslint-disable require-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable max-len */

import api from '../../global/api';
import {appendPages, dayConverter} from '../../global/public-function';
import UrlParser from '../../routes/url-parser';
import {appointmentDetailDeclineModal, appointmentDetailModal} from '../../templates/template-modal';

const AppointmentPage = {
  async render() {
    const param = UrlParser.parseActiveUrlWithoutCombiner().id;
    const hospitalId = param.split('_')[0];
    const polyId = param.split('_')[1];
    const appointmentId = param.split('_')[2];

    const polyData = await api.getDetailsOnePoly(polyId);
    const appointmentData = await api.getDetailsOneAppointment({polyId, appointmentId});

    const pages = [{link: '#/dashboard', text: 'Dashboard'}, {link: `#/hospital/${hospitalId}_${polyId}`, text: polyData.name}];
    appendPages({pages, lastPageText: `Appointment Slot ${appointmentId}`});

    return `
        <div class ="container mt-4">
            <h3 class="title-grey mb-1">Appointment Slot ${appointmentId}</h3>
            <h5 class="title-grey">${dayConverter(appointmentData.day)}, ${appointmentData.timeStart} - ${appointmentData.timeEnd}</h5>

            <div class="card w-100 mt-4">
                <div class="card-header">
                    <b>Waiting Queue List</b>
                </div>
                <ul class="list-group list-group-flush" id="appointmentPageQueueList">
                </ul>
            </div>

            <div class="card w-100 mt-4">
                <div class="card-header">
                    <b>Accepted Queue List</b>
                </div>
                <ul class="list-group list-group-flush" id="appointmentPageAcceptedQueueList">
                </ul>
            </div>

        </div>
        ${appointmentDetailModal()}
        ${appointmentDetailDeclineModal()}
      `;
  },

  async afterRender() {
    const param = UrlParser.parseActiveUrlWithoutCombiner().id;
    const appointmentId = param.split('_')[2];
    const thisAppointmentQueue = [];
    const thisAcceptedQueue = [];

    const queueData = await api.getAllQueue();

    queueData.success.data.queues.forEach((queue) => {
      if (appointmentId == queue.appointment.id) {
        if (queue.queueStatus.id > 0) {
          thisAcceptedQueue.push(queue); // process
        } else if (queue.queueStatus.id < 0) {
          // rejected
        } else {
          thisAppointmentQueue.push(queue); // belum accepted
        }
      }
    });

    renderLists({thisAppointmentQueue, thisAcceptedQueue});

    // ------------------ Detail -------------------
    $('.appointmentPageDetail').on('click', async () => {
      const thisAppointmentId = $(event.currentTarget).attr('name'); // TODO: Fix Depreciated

      thisAppointmentQueue.forEach((queue) => {
        if (queue.id == thisAppointmentId) {
          $('#appointmentDetailModalTime').val(`${queue.date}, Jam ${queue.appointment.timeStart} - ${queue.appointment.timeEnd}`);
          $('#appointmentDetailModalAssurance').val(isAssuranceToBool(queue.isAssurance));

          const queuePicture = [queue.picture1, queue.picture2, queue.picture3, queue.picture4, queue.picture5];

          if (queuePicture.every((element) => element === null) === true) {
            $('#appointmentDetailModalPictureDiv').empty();
          } else {
            const queuePictureFiltered = queuePicture.filter((element) => {
              return element != null;
            });

            $('#appointmentDetailModalPictureDiv').empty();
            $('#appointmentDetailModalPictureDiv').append(`
                <hr>
                <div class="form-group">
                    <label>Additional Pictures</label>

                    <div class="container">
                        <div class="row" id="appointmentDetailModalPictureDivRow">

                        </div>
                    </div>
                    
                </div>
            `);
            $('#appointmentDetailModalPictureDivRow').append(checkPicture(queuePictureFiltered));
          }
        }
      });
    });

    // ------------ Accept -------------
    $('.appointmentPageAccept').on('click', async () => {
      const thisAppointmentId = $(event.currentTarget).attr('name'); // TODO: Fix Depreciated

      const status = await api.acceptOneQueue(thisAppointmentId);
      if (status.success) {
        this.afterRender();
      }
    });

    // ------------ Decline ------------
    $('.appointmentPageDecline').on('click', async () => {
      const thisAppointmentId = $(event.currentTarget).attr('name'); // TODO: Fix Depreciated

      $('#appointmentDetailDeclineModalSave').on('click', async () => {
        const declineMessage = $('#appointmentDetailDeclineModalReason').val();

        const status = await api.rejectOneQueue({queueId: thisAppointmentId, rejectMessage: {'rejectMessage': declineMessage}});
        if (status.success) {
          this.afterRender();
        }
      });
    //   const status = await api.acceptOneQueue(thisAppointmentId);
    //   if (status.success) {
    //     this.afterRender();
    //   }
    });
  },
};


const appointmentPageQueue = ({queue}) => `
    <div class="row">
        <div class="col-auto">
            <h5 class="mb-0 pt-1">${queue.user.name} (ID-${queue.id})</h5>
        </div>
    </div>

    <div class="row">
        <div class="col-auto">
            <a class="pb-1 pointer link-primary appointmentPageDetail" data-toggle="modal" data-target="#appointmentDetailModal" name="${queue.id}">details</a>
        </div>
        <div class="col-auto ms-auto mt-1">
            <button type="button" class="btn btn-success btn-sm appointmentPageAccept" id="appointmentPageAccept" name="${queue.id}">Accept</button>
            <button type="button" class="btn btn-outline-danger btn-sm appointmentPageDecline" id="appointmentPageDecline" name="${queue.id}" data-toggle="modal" data-target="#appointmentDetailDeclineModal">Decline</button>
        </div>
    </div>
`;

const appointmentPageQueueAccepted = ({queue}) => `
    <div class="row">
        <div class="col-auto">
            <h5 class="mb-0 pt-1">${queue.user.name} (ID-${queue.id})</h5>
        </div>
    </div>

    <div class="row">
        <div class="col-auto">
            <a class="pb-1 pointer link-primary appointmentPageDetail" data-toggle="modal" data-target="#appointmentDetailModal" name="${queue.id}">details</a>
        </div>
    </div>
`;

function isAssuranceToBool(isAssurance) {
  if (isAssurance < 1) {
    return false;
  } else {
    return true;
  }
}

function checkPicture(queuePictureFiltered) {
  if (queuePictureFiltered.length === 1) {
    return `
        <div class="col"><img src="${api.getQueueImage(queuePictureFiltered[0])}" class="w-100"></div>
        <div class="w-100"></div>
     `;
  } else if (queuePictureFiltered.length === 2) {
    return `
        <div class="col"><img src="${api.getQueueImage(queuePictureFiltered[0])}" class="w-100"></div>
        <div class="col"><img src="${api.getQueueImage(queuePictureFiltered[1])}" class="w-100"></div>
        <div class="w-100"></div>
     `;
  } else if (queuePictureFiltered.length === 3) {
    return `
        <div class="col"><img src="${api.getQueueImage(queuePictureFiltered[0])}" class="w-100"></div>
        <div class="col"><img src="${api.getQueueImage(queuePictureFiltered[1])}" class="w-100"></div>
        <div class="w-100"></div>
        <div class="col"><img src="${api.getQueueImage(queuePictureFiltered[2])}" class="w-100"></div>
     `;
  } else if (queuePictureFiltered.length === 4) {
    return `
        <div class="col"><img src="${api.getQueueImage(queuePictureFiltered[0])}" class="w-100"></div>
        <div class="col"><img src="${api.getQueueImage(queuePictureFiltered[1])}" class="w-100"></div>
        <div class="w-100"></div>
        <div class="col"><img src="${api.getQueueImage(queuePictureFiltered[2])}" class="w-100"></div>
        <div class="col"><img src="${api.getQueueImage(queuePictureFiltered[3])}" class="w-100"></div>
        <div class="w-100"></div>
     `;
  } else if (queuePictureFiltered.length === 5) {
    return `
        <div class="col"><img src="${api.getQueueImage(queuePictureFiltered[0])}" class="w-100"></div>
        <div class="col"><img src="${api.getQueueImage(queuePictureFiltered[1])}" class="w-100"></div>
        <div class="w-100"></div>
        <div class="col"><img src="${api.getQueueImage(queuePictureFiltered[2])}" class="w-100"></div>
        <div class="col"><img src="${api.getQueueImage(queuePictureFiltered[3])}" class="w-100"></div>
        <div class="w-100"></div>
        <div class="col"><img src="${api.getQueueImage(queuePictureFiltered[4])}" class="w-50"></div>
     `;
  }
}

function renderLists({thisAppointmentQueue, thisAcceptedQueue}) {
  $('#appointmentPageQueueList').empty();
  $('#appointmentPageAcceptedQueueList').empty();

  // --------------- Append waiting to list ----------------
  thisAppointmentQueue.forEach((queue) => {
    $('#appointmentPageQueueList').append(`<li class="list-group-item">${appointmentPageQueue({queue})}</li>`);
  });

  // --------------- Append accepted to list ----------------
  thisAcceptedQueue.forEach((queue) => {
    $('#appointmentPageAcceptedQueueList').append(`<li class="list-group-item">${appointmentPageQueueAccepted({queue})}</li>`);
  });
}

export default AppointmentPage;
