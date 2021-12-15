/* eslint-disable max-len */
/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import API_ENDPOINT from '../global/api-endpoint.js';

const api = {
  getAllHospitals: getAllHospitals,
  getDetailsOneHospital: (uuid) => getDetailsOneHospital(uuid),
  signIn: (user) => signIn(user),
  signUp: (user) => signUp(user),
  getUserProfile: getUserProfile,
  getHospitalProfile: getHospitalProfile,
  getDetailsOneHospitalPoly: ({hospitalUuid, polyId}) => getDetailsOneHospitalPoly({hospitalUuid, polyId}),
  editHospitalProfile: (data) => editHospitalProfile(data),
  getProfileImage: (pictName) => getProfileImage(pictName),
  run: run,
};

function run() {
  console.log('jalan');
}

function getAllHospitals() {
  return fetch(API_ENDPOINT.GET_ALL_HOSPITALS, {
    method: 'GET',
  }).then((response) => response.json())
      .then((json) => {
        if (json.success) {
          return json.success.data.hospitals;
        } else if (json.error) {
          // window.location.href = '#/login';
        }
      })
      .catch((err) => {
      });
}

function getDetailsOneHospital(uuid) {
  return fetch(API_ENDPOINT.GET_DETAILS_ONE_HOSPITAL(uuid), {
    method: 'GET',
  }).then((response) => response.json())
      .then((json) => {
        if (json.success) {
          return json.success.data.hospital;
        } else if (json.error) {
          // window.location.href = '#/login';
        }
      })
      .catch((err) => {
      });
}

function signIn(user) {
  return fetch(API_ENDPOINT.SIGN_IN, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {'Content-type': 'application/json'},
  }).then((response) => response.json())
      .then((json) => {
        if (json.success) {
          sessionStorage.clear();
          sessionStorage.setItem('accessToken', json.success.data.accessToken);
          sessionStorage.setItem('role', json.success.data.role);
          window.location.href = '#/dashboard';
        } else if (json.error) {
          $('#loginApiInvalid').html(json.error.message);
          $('#loginApiInvalid').show();
        }
      })
      .catch((err) => {
      });
}

function signUp(user) {
  return fetch(API_ENDPOINT.SIGN_UP, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {'Content-type': 'application/json'},
  }).then((response) => response.json())
      .then((json) => {
        if (json.success) {
          alert(json.success.data.message);
          window.location.href = '#/login';
        } else if (json.error) {
          $('#registerApiInvalid').html(json.error.message);
          $('#registerApiInvalid').show();
        }
      })
      .catch((err) => {
      });
}

function getUserProfile() {
  return fetch(API_ENDPOINT.GET_USER_PROFILE, {
    method: 'GET',
    headers: {'x-access-token': sessionStorage.getItem('accessToken')},
  }).then((response) => response.json())
      .then((json) => {
        if (json.success) {
          return json.success.data.user;
        } else if (json.error) {
          // window.location.href = '#/login';
        }
      })
      .catch((err) => {
      });
}

function getHospitalProfile() {
  return fetch(API_ENDPOINT.GET_HOSPITAL_PROFILE, {
    method: 'GET',
    headers: {'x-access-token': sessionStorage.getItem('accessToken')},
  }).then((response) => response.json())
      .then((json) => {
        if (json.success) {
          return json.success.data.user;
        } else if (json.error) {
          // window.location.href = '#/login';
        }
      })
      .catch((err) => {
      });
}

function getDetailsOneHospitalPoly({hospitalUuid, polyId}) {
  return fetch(API_ENDPOINT.GET_DETAILS_ONE_HOSPITAL_POLY({hospitalUuid, polyId}), {
    method: 'GET',
  }).then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((err) => {
      });
}

function editHospitalProfile(data) {
  return fetch(API_ENDPOINT.EDIT_HOSPITAL_PROFILE, {
    method: 'PATCH',
    body: data,
    headers: {
      'x-access-token': sessionStorage.getItem('accessToken'),
      // 'content-type': 'multipart/form-data',
    },
  }).then((response) => response.json())
      .then((json) => {
        if (json.success) {
          console.log(json);
          // TODO: bikin kaya popup kecil yang gausah dipencet: 'berhasil update profil'
          // data-dismiss="modal"
          // $('#editHospitalModalSave').attr(data-dismiss, 'modal'); // TODO: ???
        } else if (json.error) {
          console.log(json);
          alert(json.error.message);
        }
      })
      .catch((err) => {
      });
}

function getProfileImage(pictName) {
  return fetch(API_ENDPOINT.GET_PROFILE_IMAGE(pictName), {
    method: 'GET',
  }).then((response) => response.json())
      .then((json) => {
        console.log(json);
        // if (json.success) {
        //   return json.success.data.hospitals;
        // } else if (json.error) {
        //   // window.location.href = '#/login';
        // }
      })
      .catch((err) => {
      });
}

export default api;
