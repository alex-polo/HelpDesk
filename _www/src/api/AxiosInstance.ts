import axios from 'axios';
import Endpoints from './Endpoints';

const axiosInstance = axios.create({
  baseURL: Endpoints.BASE_URL,
});

axiosInstance.defaults.timeout = 12500;
axiosInstance.defaults.headers['Content-Type'] = 'application/json';
// axiosInstance.defaults.headers['Accept'] = 'application/json';

export default axiosInstance;