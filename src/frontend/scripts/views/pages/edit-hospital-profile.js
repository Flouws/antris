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
    // $('#editHospitalProfilePage').append(`
    // <div class="row justify-content-center">
    //   <div class="col-md-7 col-lg-4 mb-5 mb-lg-0 wow fadeIn">
    //     <div class="card border-0 shadow">
    //       <img src="https://www.bootdey.com/img/Content/avatar/avatar6.png" alt="Gambar RS">
    //       <div class="card-body p-1-9 p-xl-5">
    //         <div class="mb-4">
    //           <h3 class="h4 mb-0">${hospitalData.name}</h3>
    //           <span class="text-primary">${city}</span>
    //         </div>
    //         <ul class="list-unstyled">
    //           <li class="mb-3"><a href="#!"><i
    //                 class="fas fa-mobile-alt display-25 me-3 text-secondary"></i>${hospitalData.phone}</a></li>
    //           <li><a href="#!"><i
    //                 class="fas fa-map-marker-alt display-25 me-3 text-secondary"></i>${hospitalData.address}</a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    //   <div class="col-lg-8">
    //     <div class="ps-lg-1-6 ps-xl-5">
    //       <div class="mb-5 wow fadeIn">
    //         <div class="text-start mb-1-6 wow fadeIn">
    //           <h2 class="mb-0">Tentang ${hospitalData.name} <a data-toggle="modal" data-target="#editHospitalModal" class="pointer"><img src="./images/edit-24.png" class ="editImage" alt="edit"/></a></h2>
    //         </div>
    //         <p class="mb-0">${hospitalData.description}</p>
    //       </div>
    //       <div class="mb-5 wow fadeIn">
    //         <div class="text-start mb-1-6 wow fadeIn">
    //           <h2 class="mb-0">Poliklinik di ${hospitalData.name}</h2>
    //         </div>
    //         <div class="container">
    //           <div class="d-flex align-content-start flex-wrap" id="editHospitalProfilePolyCard">
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // <!-- Modal -->
    // ${editHospitalModal({editHospitalModalNameVal: hospitalData.name, editHospitalModalAddressVal: hospitalData.address, editHospitalModalPhoneVal: hospitalData.phone})}
    // `);

    const polys = [];
    const polyNames = [];
    const hospitalData = await api.getHospitalProfile();
    const thisHospitalData = await api.getDetailsOneHospital(hospitalData.uuid);

    thisHospitalData.polys.forEach((polyData) => {
      console.log(polyData);
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
