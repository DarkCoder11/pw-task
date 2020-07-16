import * as R from 'ramda';
import { getUserInfo, logoutUser } from './user';
import { axiosInstance, setCookie, removeCookie } from '../libraries';

const GET_TOKEN = '@PW/auth/GET';

const initialState = {
  token: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};

export const loadToken = (token) => {
  return { type: GET_TOKEN, token };
};

export const login = (email, password) => (dispatch) =>
  new Promise(async (resolve, reject) => {
    try {
      const { data } = await axiosInstance.post('/sessions/create', {
        email,
        password,
      });

      dispatch(loadToken(data.id_token));
      setCookie('token', data.id_token);
      dispatch(getUserInfo());
      resolve(data);
    } catch (error) {
      const data = R.path(['response', 'data', 'message'], error);
      const msg = data || 'Something went wrong';
      reject(msg);
    }
  });

export const register = (username, password, email) => (dispatch) =>
  new Promise(async (resolve, reject) => {
    try {
      const { data } = await axiosInstance.post('/users', {
        username,
        password,
        email,
      });

      dispatch(loadToken(data.id_token));
      setCookie('token', data.id_token);
      dispatch(getUserInfo());
      resolve(data);
    } catch (error) {
      const data = R.path(['response', 'data', 'message'], error);
      const msg = data || 'Something went wrong';
      reject(msg);
    }
  });

export const logout = () => async (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    const { token } = getState().auth;

    try {
      await axiosInstance.get('/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(logoutUser());
      dispatch(loadToken(null));
      removeCookie('token');
      resolve();
    } catch (error) {
      reject(error);
    }
  });
