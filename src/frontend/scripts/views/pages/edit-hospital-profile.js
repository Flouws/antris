/* eslint-disable max-len */
import api from '../../global/api';
import {appendPages} from '../../global/public-function';
import {detailBody, polyCard} from '../../templates/template-creator';

const EditHospitalProfile = {
  async render() {
    const pages = [{link: '#/dashboard', text: 'Dashboard'}];
    appendPages({pages, lastPageText: 'Profile'});

    const hospitalData = await api.getHospitalProfile();
    const city = hospitalData.address.split(',').slice(0, -1).slice(-1).join(',');

    return `
      <div class="container" id="editHospitalProfilePage">
        ${detailBody({thisHospitalData: hospitalData, city})}
      </div>
      `;
  },

  async afterRender() {
    const polys = [];
    const polyNames = [];
    const hospitalData = await api.getHospitalProfile();
    const thisHospitalData = await api.getDetailsOneHospital(hospitalData.uuid);

    thisHospitalData.polys.forEach((polyData) => {
      polys.push(
          polyCard({polyImage: polyData.picture, polyName: polyData.name, polyId: polyData.id,
            polyDoctor: polyData.doctor, polyDesc: polyData.description, polyCapacity: polyData.capacity,
          }),
      );

      polyNames.push(`<option value="${polyData.id}">${polyData.name}</option>`);
    });
    $('#polyCard').append(polys);
  },
};

export default EditHospitalProfile;
