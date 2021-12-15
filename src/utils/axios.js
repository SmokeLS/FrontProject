import axios from 'axios';
import { isValidToken, setSession } from './jwt';

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
        try {
          const refresh = window.localStorage.getItem('refresh');

          if (refresh && isValidToken(refresh)) {
            const response = await axios.post('auth/jwt/refresh', { refresh });

            setSession(response.data.accessToken);
          } else {
            console.log('refresh is expired');
          }
        } catch (err) {
          console.error(err);
        }
        // Do something, call refreshToken() request for example;
        // return a request
        // return axios_instance(config);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
