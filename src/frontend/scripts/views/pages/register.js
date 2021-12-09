/* eslint-disable max-len */
import API_ENDPOINT from '../../global/api-endpoint';
const Register = {
  async render() {
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
                    <div class="form-outline mb-4 mt-4">
                        <input type="email" id="registerEmail" class="form-control form-control-lg"
                            placeholder="Enter a valid email address" />
                    </div>

                    <div class="form-outline mb-4">
                        <input type="text" id="registerName" class="form-control form-control-lg"
                            placeholder="Enter your name" />
                    </div>

                    <div class="form-outline mb-4">
                        <input type="password" id="registerPassword" class="form-control form-control-lg"
                            placeholder="Enter password" />
                    </div>

                    <div class="form-outline mb-3">
                        <input type="password" id="registerPasswordConfirm" class="form-control form-control-lg"
                            placeholder="Re-enter password" />
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        <div class="form-check mb-0">
                            <input class="form-check-input me-2" type="checkbox" value="" id="registerRememberMe" />
                            <label class="form-check-label" for="registerRememberMe">
                                Remember me
                            </label>
                        </div>
                        <a href="#!" class="text-body">Forgot password?</a>
                    </div>

                    <div class="text-center text-lg-start mt-4 pt-2">
                        <button type="button" class="btn btn-primary btn-lg"
                            style="padding-left: 2.5rem; padding-right: 2.5rem;" id="RegisterButton">Register</button>
                        <p class="small fw-bold mt-2 pt-1 mb-0">Already have an account? <a href="#/login"
                                class="link-danger">Login</a></p>
                    </div>

                </form>
            </div>
        </div>
    </div>
  </section>
        `;
  },

  async afterRender() {
    // passwordConfirm: $('#registerPasswordConfirm').val(),
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

      console.log(JSON.stringify(user));

      fetch(`${API_ENDPOINT.SIGN_UP}`, {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'same-origin',
        body: JSON.stringify(user),
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
      }).then((response) => response.json())
          .then((json) => console.log(json))
          .catch((err) => console.log(err));
    });
  },
};

export default Register;
