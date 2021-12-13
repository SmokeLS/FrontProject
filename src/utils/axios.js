import axios from 'axios';
import { AuthProvider } from '../contexts/JWTContext';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  // withCredentials: true,
  baseURL: 'http://51.250.7.40/'
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
// );

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        AuthProvider.isAuth(localStorage.getItem('refresh'));
        // Do something, call refreshToken() request for example;
        // return a request
        // return axios_instance(config);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
