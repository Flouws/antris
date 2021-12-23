/* eslint-disable guard-for-in */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import '../../component/search-bar.js';
import api from '../../global/api.js';
import {addPolyCard, dashboardHospitalCard, dashboardPolyCard, emptyCard} from '../../templates/template-creator.js';
import {addPolyModal, editHospitalModal} from '../../templates/template-modal.js';

const Dashboard = {
  async render() {
    $('bread-crumb').hide(); // remove bread-crumb

    const role = sessionStorage.getItem('role');

    if (role === 'user') {
      const userData = await api.getUserProfile();

      return `
        <div class="card-body d-flex justify-content-center mt-3">
          <h2><a href="#/profile">${userData.name}</a></h2>
        </div>
        <div class="container d-flex justify-content-center align-content-start flex-wrap reverse">
          <div class="card flex-fill mx-3 my-4 width-500">
            <search-bar class="mx-4 mt-4"></search-bar>

            <h3 class="title-grey mx-auto mt-3 mb-2">Featured Hospitals</h3>
            <div class="d-flex justify-content-center">
              <div class="row row-cols-1 row-cols-md-2 g-4 mx-1 mb-3" id="dashboardNearYouCardHolder">

              </div>
            </div>
          </div>

          <div class="card mx-3 my-4 width-400">
            <div class="card-body d-flex justify-content-top flex-column">
              <h2 class="title-grey mx-auto">Application Status</h2>
              <hr class="mx-3">
              <div id="dashboardHospitalStatus">
                <div class="card w-100">
                  <div class="card-header">
                    <b>Hari Ini</b>
                  </div>
                  <ul class="list-group list-group-flush" id="dashboardUserStatusTodayList">

                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      `;
    } else if (role === 'hospital') {
      const hospitalData = await api.getHospitalProfile();
      return `
      <div class="container d-flex justify-content-center align-content-start flex-wrap">

        <div class="card flex-fill mx-3 my-4 width-500">
          <div class="card-body d-flex justify-content-center">
            <h2><a href="#/edit_hospital_profile">${hospitalData.name} </a><a data-toggle="modal" data-target="#editHospitalModal" class="pointer"><img src="./images/edit-24.png" alt="edit"/></a></h2>
          </div>
            <hr class="mt-0 mx-3">
          <div class="d-flex justify-content-center">
            <div class="row row-cols-1 row-cols-md-2 g-4 mx-1 mb-3" id="dashboardPolyCardHolder">
  
            </div>
          </div>
        </div>

        <div class="card mx-3 my-4 width-400">
          <div class="card-body d-flex justify-content-top flex-column">
            <h2 class="title-grey mx-auto">Status</h2>
            <hr class="mx-3">
            <div id="dashboardHospitalStatus">
              <div class="card w-100">
                <div class="card-header">
                  <b>Hari Ini</b>
                </div>
                <ul class="list-group list-group-flush" id="dashboardHospitalStatusTodayList">

                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>

      ${editHospitalModal({editHospitalModalNameVal: hospitalData.name, editHospitalModalAddressVal: hospitalData.address, editHospitalModalPhoneVal: hospitalData.phone})}
      ${addPolyModal()}
      `;
    }
  },

  async afterRender() {
    const role = sessionStorage.getItem('role');

    if (role === 'user') {
      await afterRenderUser();
    } else if (role === 'hospital') {
      await afterRenderHospital();
    }
  },
};

async function afterRenderUser() {
  const hospitals = await api.getAllHospitals();
  let shuffledHospitals = hospitals.sort(() => Math.floor(Math.random() * hospitals.length)); // TODO: shuffle masih gagal

  shuffledHospitals = shuffledHospitals.slice(0, 4);
  $('#dashboardNearYouCardHolder').empty();

  shuffledHospitals.forEach((hospital) => {
    $('#dashboardNearYouCardHolder').append(dashboardHospitalCard({hospitalImage: hospital.picture, hospitalName: hospital.name, hospitalPhone: hospital.phone, hospitalDesc: hospital.description, hospitalId: hospital.uuid}));
  });

  // Kartu kosong biar design ga rusak
  if (shuffledHospitals.length === 1) {
    $('#dashboardNearYouCardHolder').append(emptyCard);
  }

  if (shuffledHospitals.length === 0) {
    // TODO: tambah text no hospital
  }

  $('.dashboardPolyCard').on('click', async () => {
    const param = $(event.currentTarget).attr('name'); // TODO: Fix Depreciated

    window.location.href = `#/detail/${param}`;
  });

  // ---------------------- Status ------------------------
  const queueDataStatus = await api.getAllUserQueue();

  if (queueDataStatus.success) {
    $('#dashboardUserStatusTodayList').empty();
    queueDataStatus.success.data.queues.forEach(async (queue) => {
      $('#dashboardUserStatusTodayList').append(`
         <li class="list-group-item">${await userStatusList({queueData: queue})}</li>`);
    });
  }
}

async function afterRenderHospital() {
  // ------------ Edit Hospital Profile (Modal) -----------------
  // TODO: render ulang judul pas save
  const hospitalData = await api.getHospitalProfile();

  $('#editHospitalModalSave').on('click', async () => {
    const data = {
      name: $('#editHospitalModalName').val(),
      address: $('#editHospitalModalAddress').val(),
      phone: $('#editHospitalModalPhone').val(),
      description: await checkDesc({desc: $('#editHospitalModalDesc').val(), hospitalData}),
      picture: $('#editHospitalModalImage'),
    };
    const datas = new FormData();
    datas.append('picture', data.picture[0].files[0]);

    for ( const key in data ) {
      datas.append(key, data[key]);
    }

    await api.editHospitalProfile(datas);
  });

  // ---------------- Add Polyclinic (Modal) ---------------------
  $('#addPolyModalSave').on('click', async () => {
    const data = {
      name: $('#addPolyModalName').val(),
      doctor: $('#addPolyModalDoctor').val(),
      capacity: $('#addPolyModalCapacity').val(),
      description: $('#addPolyModalDescription').val(),
      picture: $('#addPolyModalImage'),
    };
    const datas = new FormData();
    datas.append('picture', data.picture[0].files[0]);

    for ( const key in data ) { // TODO: bikin fungsi & benerin kode (guard in apalah itu)
      datas.append(key, data[key]);
    }

    const status = await api.addPoly(datas);

    if (status === true) {
      await renderPolyCards({addPolyCard, emptyCard});
    }
  });

  // ---------------------- Poly cards --------------------
  // TODO: design break pas < 300 px
  await renderPolyCards({addPolyCard, emptyCard});

  // ----------------------- Add Appointment ---------------------------
  $('.dashboardPolyCard').on('click', async () => {
    const param = `${hospitalData.uuid}_${$(event.currentTarget).attr('name')}`; // TODO: Fix Depreciated

    window.location.href = `#/hospital/${param}`;
  });

  // ----------------------- Status -----------------------------
  await renderHospitalStatus();
}

async function renderHospitalStatus() {
  const todayQueueDataStatus = await api.getAllTodayQueue();
  if (todayQueueDataStatus.success) {
    $('#dashboardHospitalStatusTodayList').empty();
    todayQueueDataStatus.success.data.queues.forEach((queue) => {
      if (queue.queueStatus.id > 0 && queue.queueStatus.id < 3) {
        $('#dashboardHospitalStatusTodayList').append(`
        <li class="list-group-item">${statusList({queueData: queue})}</li>`);
      }
    });
  } else {
    $('#dashboardHospitalStatusTodayList').empty();
    $('#dashboardHospitalStatusTodayList').append(`<li class="list-group-item">
      <h6 class="mb-0">No queue for today</h6>
      </li>`);
  }

  $('.statusListStartProcess').on('click', async () => {
    const queueId = $(event.currentTarget).attr('name'); // TODO: Fix Depreciated
    const status = await api.processOneQueue(queueId);
    if (status.success) {
      await renderHospitalStatus();
    }
  });

  $('.statusListFinishProcess').on('click', async () => {
    const queueId = $(event.currentTarget).attr('name'); // TODO: Fix Depreciated
    const status = await api.finishOneQueue(queueId);
    if (status.success) {
      await renderHospitalStatus();
    }
  });
}

function statusList({queueData}) {
  let statusButton;
  if (queueData.queueStatus.id == 1) {
    statusButton = `<button type="button" class="btn btn-success btn-sm statusListStartProcess" id="statusListStartProcess" name="${queueData.id}">Start Process</button>`;
  } else if (queueData.queueStatus.id == 2) {
    statusButton = `<button type="button" class="btn btn-warning btn-sm statusListFinishProcess" id="statusListFinishProcess" name="${queueData.id}">Finish Process</button>`;
  }
  return `
    <div class="row">
        <div class="col-auto">
          <h6 class="mb-0 mt-2">${queueData.appointment.poly.name} (No. urut ${queueData.queue})</h6>
        </div>
        <div class="col-auto ms-auto">
          <span class="title-grey">${queueData.queueStatus.name}</span>
        </div>
    </div>

    <div class="row">
        <div class="col-auto">
        <span class="">${queueData.user.name}</span>
        </div>
        <div class="col-auto ms-auto">
            ${statusButton}
        </div>
    </div>
`;
}

async function userStatusList({queueData}) {
  let color;
  let display = 'block';
  let notDisplay = 'none';
  let mt = 2;

  const currectQueue = await api.getCurrentAppointmentQueue(queueData.appointment.id);
  console.log(currectQueue);

  if (queueData.queueStatus.id == 100) { // Finished
    color = 'green';
  } else if (queueData.queueStatus.id == -1) { // Finished
    color = 'red';
    display = 'none';
    notDisplay = 'block';
    mt = 0;
  }
  return `
    <div class="row">
        <div class="col-auto">
          <h6 class="mb-0 mt-${mt}">${queueData.appointment.poly.name}</h6>
        </div>
        <div class="col-auto ms-auto">
          <span class="title-grey" style="color:${color};">${queueData.queueStatus.name}</span>
        </div>
    </div>

    <div class="row">
        <div class="col-auto">
          <span style="display:${display};">Urutan <b>${queueData.queue}</b> dari <b>${currectQueue.currentQueue}</b></span>
          <span style="display:${notDisplay};">Reject Message: <b>${queueData.rejectMessage}</b></span>
        </div>
        <div class="col-auto ms-auto">
        </div>
    </div>
`;
}

async function checkDesc({desc, hospitalData}) {
  if (desc === '') {
    return hospitalData.description;
  } else {
    return desc;
  }
}

async function renderPolyCards({addPolyCard, emptyCard}) {
  $('#dashboardPolyCardHolder').empty();
  const polys = await api.getAllPolys();

  const queueData = await api.getAllQueue();
  console.log(queueData);

  if (queueData.success) {

  }

  if (polys == undefined) {
    console.log('polys');
  } else {
    const queueArray = [];
    polys.forEach(async (poly) => {
      queueArray[poly.id] = 0;

      if (queueData.success) {
        queueData.success.data.queues.forEach((queue) => {
          if (poly.id == queue.appointment.poly.id && queue.queueStatus.id == 0) {
            if (queue.queueStatus.id == 0) {
              queueArray[poly.id] ++;
            }
          }
        });
      }

      $('#dashboardPolyCardHolder').append(dashboardPolyCard({polyImage: poly.picture, polyName: poly.name, polyDoctor: poly.doctor, polyDesc: poly.description, polyId: poly.id, queueSum: queueArray[poly.id]}));
    });
  }
  // Kartu untuk add poly
  $('#dashboardPolyCardHolder').append(addPolyCard);
}


export default Dashboard;
