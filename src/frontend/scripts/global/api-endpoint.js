import CONFIG from './config';

const API_ENDPOINT = {
  SIGN_UP: `${CONFIG.BASE_URL}/auth/signup`,
  SIGN_IN: `${CONFIG.BASE_URL}/auth/signin`,
  GET_PROFILE: `${CONFIG.BASE_URL}/user/profile`,
};

export default API_ENDPOINT;
