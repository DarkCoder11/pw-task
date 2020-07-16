import { axiosInstance } from '../libraries';

const GET_USERS = '@PW/users/GET';

export default (state = [], action = {}) => {
  switch (action.type) {
    case GET_USERS:
      return action.users;

    default:
      return state;
  }
};

export const loadUsers = (users) => {
  return { type: GET_USERS, users };
};

export const getUsers = (filter) => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    const { token } = getState().auth;

    try {
      const { data } = await axiosInstance.post(
        '/users/list',
        { filter },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      resolve(data.users);
      dispatch(loadUsers(data.users));
    } catch (error) {
      reject(error);
    }
  });
