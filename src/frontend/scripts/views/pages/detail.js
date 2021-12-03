/* eslint-disable max-len */
import UrlParser from '../../routes/url-parser';

const Detail = {
  // TODO: buat jadi model
  // TODO: Rapihin Design
  async render() {
    const rsName = 'RSUD Tangerang Selatan';
    const rsProvince = 'Tangerang Selatan, Banten';
    const rsEmail = 'rsudtangsel@antris.com';
    const rsPhone = '(021) 7492398';
    const rsAddress = 'Jl. Pajajaran No.101, Pamulang Bar., Kec. Pamulang, Kota Tangerang Selatan, Banten 15417';
    const rsDesc = `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.`;

    return `
  <div class="container" id="detailPage">
    <div class="row justify-content-center">
      <div class="col-md-7 col-lg-4 mb-5 mb-lg-0 wow fadeIn">
        <div class="card border-0 shadow">
          <img src="https://www.bootdey.com/img/Content/avatar/avatar6.png" alt="Gambar RS">
          <div class="card-body p-1-9 p-xl-5">
            <div class="mb-4">
              <h3 class="h4 mb-0">${rsName}</h3>
              <span class="text-primary">${rsProvince}</span>
            </div>
            <ul class="list-unstyled mb-4">
              <li class="mb-3"><a href="#!"><i
                    class="far fa-envelope display-25 me-3 text-secondary"></i>${rsEmail}</a></li>
              <li class="mb-3"><a href="#!"><i class="fas fa-mobile-alt display-25 me-3 text-secondary"></i>${rsPhone}</a></li>
              <li><a href="#!"><i class="fas fa-map-marker-alt display-25 me-3 text-secondary"></i>${rsAddress}</a></li>
            </ul>
            <ul class="social-icon-style2 ps-0">
              <li><a href="#!" class="rounded-3"><i class="fab fa-facebook-f"></i></a></li>
              <li><a href="#!" class="rounded-3"><i class="fab fa-twitter"></i></a></li>
              <li><a href="#!" class="rounded-3"><i class="fab fa-youtube"></i></a></li>
              <li><a href="#!" class="rounded-3"><i class="fab fa-linkedin-in"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="ps-lg-1-6 ps-xl-5">
          <div class="mb-5 wow fadeIn">
            <div class="text-start mb-1-6 wow fadeIn">
              <h2 class="h1 mb-0 text-primary">About</h2>
            </div>
            <p>Deskripsi Singkat RS</p>
            <p class="mb-0">${rsDesc}</p>
          </div>
          <div class="mb-5 wow fadeIn">
            <div class="text-start mb-1-6 wow fadeIn">
              <h2 class="mb-0 text-primary">Doctors</h2>
            </div>
            <div class="row mt-n4" id="doctorList">

            </div>
          </div>
          <button type="button" class="btn btn-primary btn-lg btn-block">Buat Janji</button>
        </div>
      </div>
    </div>
  </div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    console.log(url);
    // const restaurantData = await RestaurantSource.detailRestaurant(url.id);
    const doctorList = [`
    <div class="col-sm-6 col-xl-4 mt-4">
      <div class="card text-center border-0 rounded-3">
        <div class="card-body">
          <i class="ti-pencil-alt icon-box medium rounded-3 mb-4"></i>
          <h3 class="h5 mb-3">Career Start</h3>
          <p class="mb-0">After complete engineer join HU Signage Ltd as a project manager</p>
        </div>
      </div>
    </div>
    `]; // TODO: connect ke backend
    for (let i = 0; i < 6; i++) {
      $('#doctorList').append(doctorList);
    }
  },
};

export default Detail;


// <div class="col-sm-6 col-xl-4 mt-4">
// <div class="card text-center border-0 rounded-3">
//   <div class="card-body">
//     <i class="ti-bookmark-alt icon-box medium rounded-3 mb-4"></i>
//     <h3 class="h5 mb-3">Education</h3>
//     <p class="mb-0">University of defgtion, fecat complete ME of synage</p>
//   </div>
// </div>
// </div>

// <div class="col-sm-6 col-xl-4 mt-4">
// <div class="card text-center border-0 rounded-3">
//   <div class="card-body">
//     <i class="ti-pencil-alt icon-box medium rounded-3 mb-4"></i>
//     <h3 class="h5 mb-3">Career Start</h3>
//     <p class="mb-0">After complete engineer join HU Signage Ltd as a project manager</p>
//   </div>
// </div>
// </div>

// <div class="col-sm-6 col-xl-4 mt-4">
// <div class="card text-center border-0 rounded-3">
//   <div class="card-body">
//     <i class="ti-medall-alt icon-box medium rounded-3 mb-4"></i>
//     <h3 class="h5 mb-3">Experience</h3>
//     <p class="mb-0">About 20 years of experience and professional in signage</p>
//   </div>
// </div>
// </div>
