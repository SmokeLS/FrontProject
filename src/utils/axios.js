import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  // withCredentials: true,
  baseURL: 'http://51.250.7.40/'
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
