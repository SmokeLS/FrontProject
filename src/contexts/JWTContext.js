import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession, setRefreshToken } from '../utils/jwt';

// ----------------------------------------------------------------------

export const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  userStatistics: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user, userStatistics } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      userStatistics
    };
  },
  AUTOLOGIN: (state, action) => {
    const { user, userStatistics } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      isInitialized: true,
      user,
      userStatistics
    };
  },
  LOGIN: (state, action) => {
    const { user, userStatistics } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      userStatistics
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }
};

export const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  isAuth: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await axios.get('api/v1/users/me/');

          const user = { ...response.data };

          const responseStatistics = await axios.get('api/v1/users/my_sd_statistics/');
          const userStatistics = { ...responseStatistics.data };

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
              userStatistics
            }
          });
        } else if (window.localStorage.getItem('accessToken')) {
          isAuth();
        } else {
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
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
            userStatistics: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (username, password) => {
    const response = await axios.post('auth/jwt/create/', {
      username,
      password
    });

    const { access, refresh } = response.data;
    setSession(access);
    setRefreshToken(refresh);

    // login
    const responseUser = await axios.get('api/v1/users/me/');
    const user = { ...responseUser.data };

    // statistics

    const responseStatistics = await axios.get('api/v1/users/my_sd_statistics/');
    const userStatistics = { ...responseStatistics.data };

    dispatch({
      type: 'LOGIN',
      payload: { user, userStatistics }
    });
  };

  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post('api/account/register', {
      email,
      password,
      firstName,
      lastName
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    });
  };

  const logout = async () => {
    setSession(null);
    setRefreshToken(null);
    dispatch({ type: 'LOGOUT' });
  };

  const isAuth = async () => {
    try {
      const refresh = window.localStorage.getItem('refresh');
      const response = await axios.post('auth/jwt/refresh', { refresh });

      console.log(response);

      localStorage.setItem('accessToken', response.data.access);
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.access}`;

      const responseUser = await axios.get('api/v1/users/me/');
      const user = { ...responseUser.data };

      // statistics

      const responseStatistics = await axios.get('api/v1/users/my_sd_statistics/');
      const userStatistics = { ...responseStatistics.data };

      dispatch({
        type: 'AUTOLOGIN',
        payload: { user, userStatistics }
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: 'INITIALIZE',
        payload: {
          isAuthenticated: false,
          user: null,
          userStatistics: null
        }
      });
    }
  };

  // const resetPassword = () => {};

  // const updateProfile = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        isAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
