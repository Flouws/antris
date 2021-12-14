import CONFIG from './config';

const API_ENDPOINT = {
  SIGN_UP: `${CONFIG.BASE_URL}/auth/signup`,
  SIGN_IN: `${CONFIG.BASE_URL}/auth/signin`,
  GET_USER_PROFILE: `${CONFIG.BASE_URL}/user/profile`,
  GET_HOSPITAL_PROFILE: `${CONFIG.BASE_URL}/hospital/profile`,
  GET_ALL_HOSPITALS: `${CONFIG.BASE_URL}/hospitals`,
  GET_DETAILS_ONE_HOSPITAL: (uuid) => `${CONFIG.BASE_URL}/hospitals/${uuid}`,
  GET_DETAILS_ONE_HOSPITAL_POLY: ({hospitalUuid, polyId}) =>
    `${CONFIG.BASE_URL}/hospitals/${hospitalUuid}/poly/${polyId}/appointment`,
};

export default API_ENDPOINT;
