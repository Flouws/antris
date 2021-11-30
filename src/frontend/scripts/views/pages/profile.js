/* eslint-disable max-len */
const Profile = {
  async render() {
    // TODO: bikin user model
    const firstName = 'Nicholas Stancio';
    const lastName = 'Saka';
    const gender = 'Laki-laki';
    const alamat = 'Jl. Raya Grand Boulevard BSD CIty, Sampora, Kec. Cisauk, Tangerang, Banten 15345';
    const userImageSrc = 'https://bootdey.com/img/Content/avatar/avatar6.png';
    const email = 'nicholas.stanciosaka@gmail.com';
    const phone = '0811 9898601';

    // TODO: improve design
    return `
  <div class="container" id="profile">
    <form>
      <div class="row mt-5 align-items-center">
        <div class="col-md-4 text-center mb-5">
          <div class="avatar avatar-xl">
            <img src="${userImageSrc}" alt="profile picture"
              class="avatar-img rounded-circle"/>
          </div>
        </div>
        <div class="col-sm">
          <div class="row align-items-center">
            <div class="col">
              <h2 class="mb-1">${firstName} ${lastName}</h2>
              <h3 class="">Banten, Tangerang Selatan</h3>
            </div>
          </div>
          <div class="col-sm">
            <h4>Biodata</h4>
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <th>First Name</th>
                  <td>${firstName}</td>
                </tr>
                <tr>
                  <th>Last Name</th>
                  <td>${lastName}</td>
                </tr>
                <tr>
                  <th>Jenis Kelamin</th>
                  <td>${gender}</td>
                </tr>
                <tr>
                  <th>Alamat</th>
                  <td>${alamat}</td>
                </tr>
                <tr>
                  <th>Password</th>
                  <td><a href="" class="link-primary" data-toggle="modal" data-target="#changePasswordModal">Change Password</a></td>
                </tr>
              </tbody>
            </table>
            <h4>Kontak</h4>
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <th>Email</th>
                  <td>${email}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>${phone}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </form>
  </div>
      `;
  },

  async afterRender() {
  },
};

export default Profile;
