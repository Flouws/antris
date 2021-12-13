/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import api from '../../global/api';
import {checkError} from '../../global/error-handling';

const Register = {
  async render() {
    $('nav').empty(); // remove navbar
    return `
    <section class="vh-80 d-flex flex-row align-items-center">
      <div class="container-fluid h-custom">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-9 col-lg-6 col-xl-5">
            <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.png" class="img-fluid"
              alt="Gambar Antris"> <!-- TODO: Ganti foto -->
          </div>
          <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form class="mb-4">
              <div class="form-outline mb-3 mt-4">
                <label>Email</label>
                <input type="email" id="registerEmail" class="form-control form-control-lg"
                  placeholder="Enter a valid email address" />
                <div class="invalid-feedback" id="registerEmailInvalid"></div>
              </div>

              <div class="form-outline mb-3">
                <label>Name</label>
                <input type="text" id="registerName" class="form-control form-control-lg" placeholder="Enter your name" />
                <div class="invalid-feedback" id="registerNameInvalid"></div>
              </div>

              <div class="row mb-3">
                <div class="col">
                  <div class="form-outline">
                    <label class="form-label">City</label>
                    <input type="text" id="registerCity" class="form-control form-control-lg"
                      placeholder="Enter your city" />
                    <div class="invalid-feedback" id="registerCityInvalid"></div>
                  </div>
                </div>
                <div class="col">
                  <div class="form-outline">
                    <label class="form-label">Zip Code</label>
                    <input type="email" id="registerZip" class="form-control form-control-lg"
                      placeholder="Enter your zip code" />
                    <div class="invalid-feedback" id="registerZipInvalid"></div>
                  </div>
                </div>
              </div>

              <div class="form-outline mb-3">
                <label>Address</label>
                <input type="text" id="registerAddress" class="form-control form-control-lg"
                  placeholder="Enter your address" />
                <div class="invalid-feedback" id="registerAddressInvalid"></div>
              </div>

              <div class="form-outline mb-3">
                <label>Password</label>
                <input type="password" id="registerPassword" class="form-control form-control-lg"
                  placeholder="Enter password" />
                <div class="invalid-feedback" id="registerPasswordInvalid"></div>
              </div>

              <div class="form-outline mb-3">
                <label>Re-enter Password</label>
                <input type="password" id="registerPasswordConfirm" class="form-control form-control-lg"
                  placeholder="Re-enter password" />
                <div class="invalid-feedback" id="registerRePasswordInvalid"></div>
              </div>

              <div class="text-center text-lg-start mt-4 pt-2">
                <button type="button" class="btn btn-primary btn-lg" style="padding-left: 2.5rem; padding-right: 2.5rem;"
                  id="RegisterButton">Register</button>
                <p class="small fw-bold mt-2 pt-1 mb-0">Already have an account? <a href="#/login"
                    class="link-danger">Login</a></p>
                <div class="invalid-feedback" id="registerApiInvalid"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
        `;
  },

  async afterRender() {
    $('#RegisterButton').on('click', () => {
      const user = {
        name: $('#registerName').val(),
        email: $('#registerEmail').val(),
        password: $('#registerPassword').val(),
        address: `${$('#registerAddress').val()}, ${$('#registerCity').val()}, ${$('#registerZip').val()}`,
        picture: null,
        roleId: '1', // user
        isActive: null,
      };
      const rePassword = $('#registerPasswordConfirm').val();

      const checkErrorVal = checkError({register: true, user: user, rePassword: rePassword,
        emailInvalidId: '#registerEmailInvalid', nameInvalidId: '#registerNameInvalid',
        passwordInvalidId: '#registerPasswordInvalid', rePasswordInvalidId: '#registerRePasswordInvalid',
        cityInvalidId: '#registerCityInvalid', zipInvalidId: '#registerZipInvalid', addressInvalidId: '#registerAddressInvalid',
      });

      if (checkErrorVal === true) {
        api.signUp(user);
      }
    });
  },
};

export default Register;
