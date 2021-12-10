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
              <li>Can’t be the same as a previous password</li>
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
          <button type="button" class="btn btn-primary btn-sm" id="" data-toggle="modal" data-target="#makeAppointmentModal">Make Appointment</button> <!-- TODO: Ganti ID -->
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
};

