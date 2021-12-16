/* eslint-disable guard-for-in */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import '../../component/search-bar.js';
import api from '../../global/api.js';
import {addPolyModal, editHospitalModal} from '../../templates/template-modal.js';

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
          <div class="d-flex justify-content-center">
            <div class="row row-cols-1 row-cols-md-2 g-4 mx-1 mb-3" id="dashboardPolyCardHolder">
  
            </div>
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
      };
      const datas = new FormData();
      datas.append('picture', data.picture[0].files[0]);

      for ( const key in data ) {
        datas.append(key, data[key]);
      }

      await api.editHospitalProfile(datas);
    });

    // Add Polyclinic (Modal)
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
      console.log(status);
      if (status === true) {
        console.log(status);
        await renderPolyCards({addPolyCard, emptyCard});
      }
    });

    // Poly cards
    // TODO: design break pas < 300 px

    await renderPolyCards({addPolyCard, emptyCard});
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

async function renderPolyCards({addPolyCard, emptyCard}) {
  $('#dashboardPolyCardHolder').empty();

  const polys = await api.getAllPolys();

  polys.forEach((poly) => {
    $('#dashboardPolyCardHolder').append(dashboardPolyCard({polyImage: poly.picture, polyName: poly.name, polyDoctor: poly.doctor, polyDesc: poly.description}));
  });

  // Kartu untuk add poly
  $('#dashboardPolyCardHolder').append(addPolyCard);

  // Kartu kosong biar design ga rusak
  if (polys.length < 1) {
    $('#dashboardPolyCardHolder').append(emptyCard);
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
  <div class="card h-100 add-poly-card pointer api-poly-card-pict" data-toggle="modal" data-target="#addPolyModal">
      <img src="./images/icons8-plus-math-90.png" class="add-poly-card-img" alt="Foto Poly">
  </div>
</div>
`;

const dashboardPolyCard = ({polyImage, polyName, polyDoctor, polyDesc}) => `
<div class="col">
  <div class="card h-100 api-poly-card-pict">
    <img src="${api.getPolyImage(polyImage)}" class="card-img-top img-fluid w-100" alt="Foto Poly">
    <div class="card-body">
      <h5 class="card-title mb-0">${polyName}</h5>
      <small class="text-muted">${polyDoctor}</small>
      <p class="card-text">${polyDesc}</p>
    </div>
  </div>
</div>
`;

export default Dashboard;
