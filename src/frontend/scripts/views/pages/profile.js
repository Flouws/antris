/* eslint-disable guard-for-in */
/* eslint-disable max-len */
import api from '../../global/api';
import {appendPages} from '../../global/public-function';
import {editProfileModal} from '../../templates/template-modal';

const Profile = {
  async render() {
    // TODO: improve design
    const pages = [{link: '#/dashboard', text: 'Dashboard'}];
    appendPages({pages, lastPageText: 'Profile'});

    const user = await api.getUserProfile();
    const city = user.address.split(',').slice(0, -1).slice(-1).join(',');

    // console.log(await api.getUserProfile(user.picture))

    return `
      <div class="container shadow-lg p-3 bg-white rounded" id="profile">
        <form>
          <div class="row mt-3 align-items-center">
            <div class="col-md-4 text-center mb-5">
              <div class="avatar avatar-xl">
                <img src="${api.getUserProfile(user.picture)}" alt="profile picture"
                  class="avatar-img rounded-circle"/>
              </div>
            </div>
            <div class="col-sm">
              <div class="row align-items-center">
                <div class="col">
                  <h2 class="mb-1 title-grey">${user.name} </a><a data-toggle="modal" data-target="#editProfileModal" class="pointer"><img src="./images/edit-24.png" alt="edit"/></a></h2>
                  <h3 class="">${city}</h3>
                </div>
              </div>
              <div class="col-sm">
                <h4 class="title-grey">Biodata</h4>
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
                <h4 class="title-grey">Kontak</h4>
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
        </form>
      </div>

      <!-- TODO: ganti ke modal template--> 
      <change-password></change-password>
      ${editProfileModal({editProfileModalName: user.name, editProfileModalAddress: user.address, editProfileModalPhone: user.phone})}
      `;
  },

  async afterRender() {
    $('#editProfileModalSave').on('click', async () => {
      const data = {
        name: $('#editProfileModalName').val(),
        address: $('#editProfileModalAddress').val(),
        phone: $('#editProfileModalPhone').val(),
        picture: $('#editProfileModalImage'),
      };
      const datas = new FormData();
      datas.append('picture', data.picture[0].files[0]);

      for ( const key in data ) {
        datas.append(key, data[key]);
      }

      await api.editUserProfile(datas);

      if (true) {
        // TODO: render ulang page
        location.reload();
      }
    });
  },
};

export default Profile;
