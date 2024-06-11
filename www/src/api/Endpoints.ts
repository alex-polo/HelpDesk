const BASE_ENDPOINT = 'https://127.0.0.1:8443';

const Endpoints = {
  BASE_URL: BASE_ENDPOINT,
  AUTH: {
    login: `${BASE_ENDPOINT}/auth/jwt/login`,
    logout: `${BASE_ENDPOINT}/auth/jwt/logout`,
    user_profile: `${BASE_ENDPOINT}/users/me`,
  },
};

export default Endpoints;
