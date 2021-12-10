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

const polyCard = `
<div class="profile-card-4 text-center">
  <img src="http://envato.jayasankarkr.in/code/profile/assets/img/profile-4.jpg" class="img img-responsive">
  <div class="profile-content">
    <div class="profile-name">
      John Doe
      <p>@johndoedesigner</p>
    </div>
    <div class="profile-description">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.</div>
    <div class="d-flex align-content-center flex-wrap ">
      <div class="col">
        <div class="profile-overview">
          <p>CAPACITY</p>
          <h4>1000</h4>
        </div>
      </div>
      <div class="abc">
        <div class="profile-overview">
          <button type="button" class="btn btn-primary btn-sm" id="tes">Make Appointment</button>
        </div>
      </div>
    </div>
  </div>
</div>
`;

export {
  changePasswordBody,
  polyCard,
};

