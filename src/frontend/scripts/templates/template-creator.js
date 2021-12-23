import api from '../global/api';

/* eslint-disable max-len */
const changePasswordBody = `
<div class="container">
  <div class="row justify-content-center">
    <div class="col-12 mx-auto">
      <form>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="inputPassword4">Old Password</label>
              <input type="password" class="form-control" id="inputPassword4" />
            </div>
            <div class="form-group">
              <label for="inputPassword5">New Password</label>
              <input type="password" class="form-control" id="inputPassword5" />
            </div>
            <div class="form-group">
              <label for="inputPassword6">Confirm Password</label>
              <input type="password" class="form-control" id="inputPassword6" />
            </div>
          </div>
          <div class="col-md-6">
            <p class="mb-2">Password requirements</p>
            <p class="small text-muted mb-2">To create a new password, 
              you have to meet all of the following requirements:</p>
            <ul class="small text-muted pl-4 mb-0">
              <li>Minimum 8 character</li>
              <li>At least one special character</li>
              <li>At least one number</li>
              <li>Can't be the same as a previous password</li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
`;

const polyCard = ({polyImage, polyName, polyDoctor, polyDesc, polyCapacity, polyId}) => {
  return `
  <div class="col">
    <div class="card h-100 min-w-192-75 pointer detailPolyCard" name="${polyId}" data-toggle="modal" data-target="#makeAppointmentModal">
      <img src="${api.getPolyImage(polyImage)}" class="card-img-top img-fluid w-100" alt="Foto Poly">
      <div class="card-body">
        <h5 class="card-title mb-0">${polyName}</h5>
        <small class="text-muted">${polyDoctor}</small>
        <p class="card-text">${polyDesc}</p>
      </div>
    </div>
  </div>
`;
};

const detailBody = ({thisHospitalData, city}) => { // TODO: Fix design
  return `
  <div class="row justify-content-center">
    <div class="col-md-7 col-lg-4 mb-5 mb-lg-0 wow fadeIn">
      <div class="card">
        <img src="${api.getProfileImage(thisHospitalData.picture)}" alt="Gambar RS">
        <div class="card-body p-1-9 p-xl-5">
          <div class="mb-4">
            <h3 class="h4 mb-0">${thisHospitalData.name}</h3>
            <span class="text-primary">${city}</span>
          </div>
          <ul class="list-unstyled mb-4">
            <li class="mb-3"><a href="#!"><i class="fas fa-mobile-alt display-25 me-3 text-secondary"></i>${thisHospitalData.phone}</a></li>
            <li><a href="#!"><i class="fas fa-map-marker-alt display-25 me-3 text-secondary"></i>${thisHospitalData.address}</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-lg-8">
      <div class="ps-lg-1-6 ps-xl-5">
        <div class="mb-5 wow fadeIn">
          <div class="text-start mb-1-6 wow fadeIn">
            <h2 class="mb-0 title-grey">Poliklinik di ${thisHospitalData.name}</h2>
          </div>
              <div class="row row-cols-1 row-cols-md-2 g-4 mb-3"  id="polyCard">

              </div>
          </div>
        </div>
      </div>
    </div>
`;
};

const emptyCard = `
  <div class="col" id="emptyCard">
    <div class="card h-100 empty-poly-card pointer">
    </div>
  </div>
`;

const addPolyCard = `
<div class="col">
  <div class="card h-100 add-poly-card pointer min-w-192-75" data-toggle="modal" data-target="#addPolyModal">
      <img src="./images/icons8-plus-math-90.png" class="add-poly-card-img" alt="Foto Poly">
  </div>
</div>
`;

const dashboardPolyCard = ({polyImage, polyName, polyDoctor, polyDesc, polyId}) => `
<div class="col">
  <div class="card h-100 min-w-192-75 pointer dashboardPolyCard" name="${polyId}">
    <div class="topright mt-2">
      <a class="border border-danger rounded-circle px-2 pointer fill-red">2</a> // TODO: PENTING
    </div>
    <img src="${api.getPolyImage(polyImage)}" class="card-img-top img-fluid w-100" alt="Foto Poly">
    <div class="card-body">
      <h5 class="card-title mb-0">${polyName}</h5>
      <small class="text-muted">${polyDoctor}</small>
      <p class="card-text">${polyDesc}</p>
    </div>
  </div>
</div>
`;

const dashboardHospitalCard = ({hospitalImage, hospitalName, hospitalPhone, hospitalDesc, hospitalId}) => `
<div class="col">
  <div class="card h-100 min-w-192-75 pointer dashboardPolyCard" name="${hospitalId}">
    <img src="${api.getProfileImage(hospitalImage)}" class="card-img-top img-fluid w-100" alt="Foto Poly">
    <div class="card-body">
      <h5 class="card-title mb-0">${hospitalName}</h5>
      <small class="text-muted">${hospitalPhone}</small>
      <p class="card-text">${hospitalDesc}</p>
    </div>
  </div>
</div>
`;

export {
  changePasswordBody,
  polyCard,
  detailBody,
  emptyCard,
  addPolyCard,
  dashboardPolyCard,
  dashboardHospitalCard,
};

