import axios from 'axios';
import { useReducer } from 'react';
import { initialState, reducer } from '../contexts/JWTContext';
import { isValidToken, setSession } from './jwt';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: 'http://62.84.113.176/'
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
            const response = await axios.post('http://62.84.113.176/auth/jwt/refresh', { refresh });
            setSession(response.data.access);
          } else {
            const [state, dispatch] = useReducer(reducer, initialState);
            console.log('refresh is expired', state);
            localStorage.clear();
            dispatch({
              type: 'INITIALIZE',
              payload: {
                isAuthenticated: false,
                user: null,
                userStatistics: null
              }
            });
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

// // Add a request interceptor
// axiosInstance.interceptors.request.use(
//   (config) =>
//     // Do something before request is sent
//     config,
//   (error) =>
//     // Do something with request error
//     Promise.reject(error)
// );

// // Add a response interceptor
// axiosInstance.interceptors.response.use(
//   (response) =>
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     response,
//   (error) =>
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     Promise.reject(error)
// );

export default axiosInstance;
