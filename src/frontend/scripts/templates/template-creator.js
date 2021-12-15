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

const polyCard = ({polyImage, polyName, polyDoctor, polyDesc, polyCapacity}) => {
  if (polyImage === null) {
    polyImage = 'http://envato.jayasankarkr.in/code/profile/assets/img/profile-4.jpg'; // TODO: Cari gambar yang cocok
  }
  return `
    <div class="profile-card-4 text-center">
      <img src="${polyImage}" class="img img-responsive" alt="poly image">
      <div class="profile-content">
        <div class="profile-name">
          ${polyName}
          <p>${polyDoctor}</p>
        </div>
        <div class="profile-description">${polyDesc}</div>
        <div class="d-flex align-content-center flex-wrap ">
          <div class="col">
            <div class="profile-overview">
              <p>CAPACITY</p>
              <h4>${polyCapacity}</h4>
            </div>
          </div>
          <div class="poly-card-mid">
            <div class="profile-overview">
              <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#makeAppointmentModal">Make Appointment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
`;
};

const detailBody = ({thisHospitalData, city}) => { // TODO: Fix design
  console.log(thisHospitalData);
  return `
  <div class="row justify-content-center">
    <div class="col-md-7 col-lg-4 mb-5 mb-lg-0 wow fadeIn">
      <div class="card border-0 shadow">
        <img src="${thisHospitalData.image}" alt="Gambar RS">
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
            <h2 class="h1 mb-0 text-primary">Tentang ${thisHospitalData.name}</h2>
          </div>
          <p class="mb-0">${thisHospitalData.description}</p>
        </div>
        <div class="mb-5 wow fadeIn">
          <div class="text-start mb-1-6 wow fadeIn">
            <h2 class="mb-0 text-primary">Poliklinik di ${thisHospitalData.name}</h2>
          </div>
            <div class="container">
              <div class="d-flex align-content-start flex-wrap"  id="polyCard">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
`;
};

export {
  changePasswordBody,
  polyCard,
  detailBody,
};

