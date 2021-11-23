/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
class Register extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    this.innerHTML = `
  <section class="vh-100">
      <div class="container-fluid h-custom">
          <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-md-9 col-lg-6 col-xl-5">
                  <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.png"
                      class="img-fluid" alt="Gambar Antris">
              </div>
              <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                  <form>
                      <div class="form-outline mb-4 mt-4">
                          <input type="email" id="register-email" class="form-control form-control-lg"
                              placeholder="Enter a valid email address" />
                      </div>

                      <div class="form-outline mb-4">
                          <input type="text" id="register-name" class="form-control form-control-lg"
                              placeholder="Enter your name" />
                      </div>

                      <div class="form-outline mb-4">
                          <input type="password" id="register-password" class="form-control form-control-lg"
                              placeholder="Enter password" />
                      </div>

                      <div class="form-outline mb-3">
                          <input type="password" id="register-password-confirm" class="form-control form-control-lg"
                              placeholder="Re-enter password" />
                      </div>

                      <div class="d-flex justify-content-between align-items-center">
                          <div class="form-check mb-0">
                              <input class="form-check-input me-2" type="checkbox" value="" id="register-form" />
                              <label class="form-check-label" for="register-form">
                                  Remember me
                              </label>
                          </div>
                          <a href="#!" class="text-body">Forgot password?</a>
                      </div>

                      <div class="text-center text-lg-start mt-4 pt-2">
                          <button type="button" class="btn btn-primary btn-lg"
                              style="padding-left: 2.5rem; padding-right: 2.5rem;">Register</button>
                          <p class="small fw-bold mt-2 pt-1 mb-0">Already have an account? <a href="#/login"
                                  class="link-danger">Login</a></p>
                      </div>

                  </form>
              </div>
          </div>
      </div>
  </section>
         `;
  }
}

customElements.define('register-page', Register);
