const Error = {
  async render() {
    const errorType = '404';
    const errorDesc = 'The page you are looking for was not found.';

    $('nav').empty(); // remove navbar

    return `
  <div class="d-flex flex-row align-items-center" id="error-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-12 text-center">
          <span class="display-1 d-block">${errorType}</span>
          <div class="mb-4 lead">${errorDesc}</div>
          <a href="/" class="btn btn-link">Back to Home</a>
        </div>
      </div>
    </div>
  </div>
      `;
  },

  async afterRender() {
  },
};

export default Error;
