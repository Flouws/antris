/* eslint-disable max-len */
import API_ENDPOINT from '../../global/api-endpoint';

const Profile = {
  async render() {
    const user = await fetch(API_ENDPOINT.GET_PROFILE, {
      method: 'GET',
      headers: {'x-access-token': sessionStorage.getItem('accessToken')},
    }).then((response) => response.json())
        .then((json) => {
          if (json.success) {
            return json.success.data.user;
          } else if (json.error) {
            window.location.href = '#/login';
          }
        })
        .catch((err) => {
        });

    const firstName = user.name.split(' ').slice(0, -1).join(' ');
    const lastName = user.name.split(' ').slice(-1).join(' ');
    const city = user.address.split(',').slice(0, -1).slice(-1).join(',');

    // TODO: implement change profile image and add phone number
    const userImageSrc = 'https://bootdey.com/img/Content/avatar/avatar6.png';
    const phone = '0811 9898601';

    // TODO: improve design
    return `
  <div class="container shadow-lg p-3 bg-white rounded" id="profile">
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
              <h2 class="mb-1">${firstName} ${lastName}</h2>
              <h3 class="">${city}</h3>
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
                  <td>${phone}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </form>
  </div>

  <!-- Modal -->
  <change-password></change-password>
      `;
  },

  async afterRender() {
  },
};

export default Profile;
