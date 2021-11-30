/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {changePasswordBody} from '../templates/template-creator';
class ChangePassword extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    this.innerHTML = `
  <div class="modal fade" id="changePasswordModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Change Password</h5>
          <img src="./images/close-24.png" data-dismiss="modal" class="pointer" alt="close" />
        </div>
        <div class="modal-body">
          ${changePasswordBody}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
    `;
  }
}

customElements.define('change-password', ChangePassword);


