// const BASE_ENDPOINT = 'https://127.0.0.1:8443';
const BASE_ENDPOINT = 'http://127.0.0.1:8443';

const Endpoints = {
  BASE_URL: BASE_ENDPOINT,
  AUTH: {
    login: `${BASE_ENDPOINT}/auth/jwt/login`,
    logout: `${BASE_ENDPOINT}/auth/jwt/logout`,
    user_profile: `${BASE_ENDPOINT}/users/me`,
  },
  OBJECTUS: {
    get_tg_users: `${BASE_ENDPOINT}/frontend/get-tg-users`,
    get_objects: `${BASE_ENDPOINT}/frontend/get-objects`,
    create_object: `${BASE_ENDPOINT}/frontend/create-object`,
  },
};

export default Endpoints;
