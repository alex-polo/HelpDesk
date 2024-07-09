const BASE_ENDPOINT = 'http://127.0.0.1:8443';
// const BASE_ENDPOINT = 'https://objectus.ru:8444';

const Endpoints = {
  BASE_URL: BASE_ENDPOINT,
  AUTH: {
    login: `${BASE_ENDPOINT}/auth/jwt/login`,
    logout: `${BASE_ENDPOINT}/auth/jwt/logout`,
    user_profile: `${BASE_ENDPOINT}/users/me`,
  },
  OBJECTUS: {
    get_tg_users: `${BASE_ENDPOINT}/frontend/get-tg-users`,
    create_organization: `${BASE_ENDPOINT}/frontend/create-organization`,
    update_organization: `${BASE_ENDPOINT}/frontend/update-organization`,
    get_organization: `${BASE_ENDPOINT}/frontend/get-organization`,
    get_objects: `${BASE_ENDPOINT}/frontend/get-objects`,
    create_object: `${BASE_ENDPOINT}/frontend/create-object`,
    get_all_users: `${BASE_ENDPOINT}/frontend/get-all-users`,
  },
};

export default Endpoints;
