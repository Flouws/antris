/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import '../../component/search-bar.js';
import api from '../../global/api.js';
import {editHospitalModal} from '../../templates/template-modal.js';

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
            <h2><a href="#/edit_hospital_profile">RS Janji jiwa </a><a data-toggle="modal" data-target="#editHospitalModal" class="pointer"><img src="./images/edit-24.png" alt="edit"/></a></h2>
          </div>
        </div>
        <div class="card mx-3 my-4 width-400">
          <div class="card-body">
            Status card
          </div>
        </div>
      </div>

      ${editHospitalModal({editHospitalModalNameVal: hospitalData.name, editHospitalModalAddressVal: hospitalData.address, editHospitalModalPhoneVal: hospitalData.phone})}
      `;
    }
  },

  async afterRender() {
    $('#editHospitalModalSave').on('click', async () => {
      const data = {
        name: $('#editHospitalModalName').val(),
        address: $('#editHospitalModalAddress').val(),
        phone: $('#editHospitalModalPhone').val(),
        description: await checkDesc($('#editHospitalModalDesc').val()),
      };
      await api.editHospitalProfile(data);
    });
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

export default Dashboard;
