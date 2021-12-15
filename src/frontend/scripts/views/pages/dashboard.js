/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import '../../component/search-bar.js';
import api from '../../global/api.js';
import {addPolyModal, editHospitalModal} from '../../templates/template-modal.js';
import {serialize} from 'object-to-formdata';

const Dashboard = {

  async render() {
    $('bread-crumb').hide(); // remove pagebar

    const role = sessionStorage.getItem('role');

    if (role === 'user') {
      return `
        <search-bar></search-bar>
      `;
    } else if (role === 'hospital') {
      const hospitalData = await api.getHospitalProfile();
      return `
      <div class="container d-flex justify-content-center align-content-start flex-wrap">

        <div class="card flex-fill mx-3 my-4 width-500">
          <div class="card-body d-flex justify-content-center">
          <!-- TODO: panggil detail page dia, jgn bikin baru -->
            <h2><a href="#/edit_hospital_profile">RS Janji jiwa </a><a data-toggle="modal" data-target="#editHospitalModal" class="pointer"><img src="./images/edit-24.png" alt="edit"/></a></h2>
          </div>
            <hr class="mt-0 mx-3">
          <div class="d-flex justify-content-center" id="dashboardPolyCardHolder">
            
          </div>
        </div>

        <div class="card mx-3 my-4 width-400">
          <div class="card-body d-flex justify-content-center">
            <h2><a href="">Status card</a></h2>
          </div>
        </div>

      </div>

      ${editHospitalModal({editHospitalModalNameVal: hospitalData.name, editHospitalModalAddressVal: hospitalData.address, editHospitalModalPhoneVal: hospitalData.phone})}
      ${addPolyModal()}
      `;
    }
  },

  async afterRender() {
    // Edit Hospital Profile (Modal)
    $('#editHospitalModalSave').on('click', async () => {
      const data = {
        name: $('#editHospitalModalName').val(),
        address: $('#editHospitalModalAddress').val(),
        phone: $('#editHospitalModalPhone').val(),
        description: await checkDesc($('#editHospitalModalDesc').val()),
        picture: $('#editHospitalModalImage'),
        // picture: new File([$('#editHospitalModalImage').prop('files')], $('#editHospitalModalImage').val().split('\\').pop()),
      };
      const datas = new FormData();
      datas.append('picture', data.picture[0].files[0]);
      // console.log(data.picture[0].files[0]);

      // for (const pair of formData.entries()) {
      //   console.log(pair[0]+ ', ' + pair[1]);
      // }

      await api.editHospitalProfile(datas);
      // console.log(data);
    });

    // Add Polyclinic (Modal)
    $('#addPolyModalSave').on('click', async () => {
      const data = {
        name: $('#addPolyModalName').val(),
        doctor: $('#addPolyModalDoctor').val(),
        capacity: $('#addPolyModalCapacity').val(),
        description: $('#addPolyModalDescription').val(),
        // picture: $('#editHospitalModalImage').val(),
        picture: new File([$('#addPolyModalImage').prop('files')], $('#addPolyModalImage').val().split('\\').pop()),
      };
      const formData = serialize(data);

      for (const pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
      }

      // await api.editHospitalProfile(formData.entries());
      // console.log(data);
    });

    // Poly cards TODO: ilangin empty card kalo poly > 0
    $('#dashboardPolyCardHolder').append(`
      <div class="row row-cols-1 row-cols-md-2 g-4 mx-1 mb-3">

        <div class="col">
          <div class="card h-100">
            <img src="http://envato.jayasankarkr.in/code/profile/assets/img/profile-4.jpg" class="card-img-top" alt="Foto Poly">
            <div class="card-body">
              <h5 class="card-title mb-0">Poliklinik kesesatan</h5>
              <small class="text-muted">Dokter Andreas</small>
              <p class="card-text">Deskripsi dari dokter</p>
            </div>
          </div>
        </div>

        ${addPolyCard}
        ${emptyCard}

      </div>
    `);
  },
};

async function checkDesc(desc) {
  const hospitalData = await api.getHospitalProfile();
  if (desc === '') {
    return hospitalData.description;
  } else {
    return desc;
  }
}

// Pindahin
const emptyCard = `
  <div class="col" id="emptyCard">
    <div class="card h-100 empty-poly-card pointer">
    </div>
  </div>
`;

const addPolyCard = `
  <div class="col">
    <div class="card h-100 add-poly-card pointer" data-toggle="modal" data-target="#addPolyModal">
        <img src="./images/icons8-plus-math-90.png" class="add-poly-card-img" alt="Foto Poly">
    </div>
  </div>
`;

export default Dashboard;
