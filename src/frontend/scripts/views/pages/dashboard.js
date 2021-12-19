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
            <div class="card-body d-flex justify-content-center">
              <h2 class="title-grey">Your Application</h2>
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
          <div class="card-body d-flex justify-content-center">
            <h2 class="title-grey">Status card</h2>
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
    } else if (role === 'hospital') {
      await afterRenderHospital();
    }
  },
};

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

  polys.forEach((poly) => {
    $('#dashboardPolyCardHolder').append(dashboardPolyCard({polyImage: poly.picture, polyName: poly.name, polyDoctor: poly.doctor, polyDesc: poly.description, polyId: poly.id}));
  });

  // Kartu untuk add poly
  $('#dashboardPolyCardHolder').append(addPolyCard);

  // Kartu kosong biar design ga rusak
  if (polys.length < 1) {
    $('#dashboardPolyCardHolder').append(emptyCard);
  }
}


export default Dashboard;
