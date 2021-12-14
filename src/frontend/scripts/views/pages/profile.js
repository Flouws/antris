/* eslint-disable max-len */
import api from '../../global/api';

const Profile = {
  async render() {
    // TODO: improve design
    return `
  <div class="container shadow-lg p-3 bg-white rounded" id="profile">
    
  </div>

  <!-- Modal -->
  <change-password></change-password>
      `;
  },

  async afterRender() {
    const role = sessionStorage.getItem('role');
    let user;

    if (role === 'user') {
      user = await api.getUserProfile();
    } else if (role === 'hospital') {
      user = await api.getHospitalProfile();
    }

    const city = user.address.split(',').slice(0, -1).slice(-1).join(',');

    // TODO: implement change profile image
    const userImageSrc = 'https://bootdey.com/img/Content/avatar/avatar6.png';

    $('#profile').append(`
    <form>
      <div class="row mt-3 align-items-center">
        <div class="col-md-4 text-center mb-5">
          <div class="avatar avatar-xl">
            <img src="${userImageSrc}" alt="profile picture"
              class="avatar-img rounded-circle"/>
          </div>
        </div>
        <div class="col-sm">
          <div class="row align-items-center">
            <div class="col">
              <h2 class="mb-1">${user.name}</h2>
              <h3 class="">${city}</h3>
            </div>
          </div>
          <div class="col-sm">
            <h4>Biodata</h4>
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>${user.name}</td>
                </tr>
                <tr>
                  <th>Alamat</th>
                  <td>${user.address}</td>
                </tr>
                <tr>
                  <th>Password</th>
                  <td><a href="" class="link-primary" data-toggle="modal" data-target="#changePasswordModal">Change Password</a></td> <!-- TODO: Tambah fitur change password -->
                </tr>
              </tbody>
            </table>
            <h4>Kontak</h4>
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <th>Email</th>
                  <td>${user.email}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>${user.phone}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </form>`);
  },
};

export default Profile;
