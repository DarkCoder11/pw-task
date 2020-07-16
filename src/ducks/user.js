import * as R from 'ramda';
import { axiosInstance } from '../libraries';

const GET_USER_INFO = '@PW/user/GET';
const CREATE_USER_TRANSACTION = '@PW/user/POST';
const SET_LOGGED_OUT = '@PW/user/SET';

const initialState = {
  id: null,
  name: null,
  email: null,
  balance: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...state,
        ...action.userInfo,
      };
    case SET_LOGGED_OUT:
      return {
        ...state,
        id: null,
        name: null,
        email: null,
        balance: null,
      };
    case CREATE_USER_TRANSACTION:
      return {
        ...state,
        trans_token: [...state.trans_token, action.trans_token],
      };
    default:
      return state;
  }
};

export const loadUserTransaction = (trans_token) => {
  return { type: CREATE_USER_TRANSACTION, trans_token };
};

export const loadUserInfo = (userInfo) => {
  return { type: GET_USER_INFO, userInfo };
};

export const logoutUser = () => {
  return { type: SET_LOGGED_OUT };
};

export const getUserInfo = () => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    const { token } = getState().auth;

    try {
      const userInfo = axiosInstance.get('/user-info', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userTransactions = axiosInstance.get('/transactions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const [info, transactions] = await Promise.all([
        userInfo,
        userTransactions,
      ]);

      dispatch(
        loadUserInfo({
          ...info.data.user,
          trans_token: transactions.data.trans_token.map((item) => ({
            ...item,
            // eslint-disable-next-line no-underscore-dangle
            id: item._id,
          })),
        }),
      );
      resolve(info, transactions);
    } catch (error) {
      reject(error);
    }
  });

export const createUserTransation = (name, amount) => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    const { token } = getState().auth;

    try {
      await axiosInstance.post(
        '/transactions',
        {
          name: name.name || name,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      dispatch(getUserInfo());
      resolve();
    } catch (error) {
      const data = R.path(['response', 'data', 'message'], error);
      const msg = data || 'Something went wrong';
      reject(msg);
    }
  });
