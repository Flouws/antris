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
  getPolyImage: (pictName) => getPolyImage(pictName),
  addPoly: (poly) => addPoly(poly),
  getAllPolys: getAllPolys,
  getDetailsOnePoly: (polyId) => getDetailsOnePoly(polyId),
  getAllAppointments: (polyId) => getAllAppointments(polyId),
  addAppointment: ({polyId, appointment}) => addAppointment({polyId, appointment}),
  addQueue: (data) => addQueue(data),
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
  return API_ENDPOINT.GET_PROFILE_IMAGE(pictName);
}

function getPolyImage(pictName) {
  return API_ENDPOINT.GET_POLY_IMAGE(pictName);
}

function addPoly(poly) {
  return fetch(API_ENDPOINT.ADD_POLY, {
    method: 'POST',
    body: poly,
    headers: {'x-access-token': sessionStorage.getItem('accessToken')},
  }).then((response) => response.json())
      .then((json) => {
        if (json.success) {
          return true;
        } else if (json.error) {
          alert(json.error.message);
          return false;
        }
      })
      .catch((err) => {
      });
}

function getAllPolys() {
  return fetch(API_ENDPOINT.GET_ALL_POLYS, {
    method: 'GET',
    headers: {'x-access-token': sessionStorage.getItem('accessToken')},
  }).then((response) => response.json())
      .then((json) => {
        if (json.success) {
          return json.success.data.polys;
        } else if (json.error) {
          // window.location.href = '#/login';
        }
      })
      .catch((err) => {
      });
}

function getDetailsOnePoly(polyId) {
  return fetch(API_ENDPOINT.GET_DETAILS_ONE_POLY(polyId), {
    method: 'GET',
    headers: {'x-access-token': sessionStorage.getItem('accessToken')},
  }).then((response) => response.json())
      .then((json) => {
        if (json.success) {
          return json.success.data.poly;
        } else if (json.error) {
          // window.location.href = '#/login';
        }
      })
      .catch((err) => {
      });
}

function getAllAppointments(polyId) {
  return fetch(API_ENDPOINT.GET_ALL_APPOINTMENTS(polyId), {
    method: 'GET',
    headers: {'x-access-token': sessionStorage.getItem('accessToken')},
  }).then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((err) => {
      });
}

function addAppointment({polyId, appointment}) {
  return fetch(API_ENDPOINT.ADD_APPOINTMENT(polyId), {
    method: 'POST',
    body: JSON.stringify(appointment),
    headers: {'x-access-token': sessionStorage.getItem('accessToken'), 'Content-Type': 'application/json'},
  }).then((response) => response.json())
      .then((json) => {
        if (json.success) {
          return true;
        } else if (json.error) {
          return false;
        }
      })
      .catch((err) => {
      });
}

function addQueue(data) {
  return fetch(API_ENDPOINT.ADD_QUEUE, {
    method: 'POST',
    body: data,
    headers: {'x-access-token': sessionStorage.getItem('accessToken')},
  }).then((response) => response.json())
      .then((json) => {
        if (json.success) {
          alert(json.success.data.message);
        } else if (json.error) {
          alert(json.error.message);
        }
      })
      .catch((err) => {
      });
}

export default api;
