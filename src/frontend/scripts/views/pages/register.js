/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import API_ENDPOINT from '../../global/api-endpoint';
import checkError from '../../global/error-handling';

const Register = {
  async render() {
    $('nav').empty(); // remove navbar
    return `
  <section class="vh-100">
    <div class="container-fluid h-custom">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-9 col-lg-6 col-xl-5">
                <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.png" 
                    class="img-fluid" alt="Gambar Antris"> <!-- TODO: Ganti foto -->
            </div>
            <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form>
                    <div class="form-outline mb-2 mt-4">
                        <label>Email</label>
                        <input type="email" id="registerEmail" class="form-control form-control-lg"
                            placeholder="Enter a valid email address" />
                        <div class="invalid-feedback" id="registerEmailInvalid"></div>
                    </div>

                    <div class="form-outline mb-2">
                        <label>Name</label>
                        <input type="text" id="registerName" class="form-control form-control-lg"
                            placeholder="Enter your name" />
                        <div class="invalid-feedback" id="registerNameInvalid"></div>
                    </div>

                    <div class="form-outline mb-2">
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

                    <div class="d-flex justify-content-between align-items-center">
                        <div class="form-check mb-0">
                        </div>
                        <a href="#!" class="text-body">Forgot password?</a>
                    </div>

                    <div class="text-center text-lg-start mt-4 pt-2">
                        <button type="button" class="btn btn-primary btn-lg"
                            style="padding-left: 2.5rem; padding-right: 2.5rem;" id="RegisterButton">Register</button>
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
        address: null,
        picture: null,
        roleId: '1', // user
        isActive: null,
      };
      const rePassword = $('#registerPasswordConfirm').val();

      const checkErrorVal = checkError({register: true, user: user, rePassword: rePassword,
        emailInvalidId: '#registerEmailInvalid', nameInvalidId: '#registerNameInvalid',
        passwordInvalidId: '#registerPasswordInvalid', rePasswordInvalidId: '#registerRePasswordInvalid'});

      if (checkErrorVal === true) {
        fetch(`${API_ENDPOINT.SIGN_UP}`, {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {'Content-type': 'application/json'},
        }).then((response) => response.json())
            .then((json) => {
              if (json.success) {
                window.location.href = '#/dashboard';
              } else if (json.error) {
                $('#registerApiInvalid').html(json.error.message);
                $('#registerApiInvalid').show();
              }
            })
            .catch((err) => {
            });
      }
    });
  },
};

export default Register;
