import { combineReducers } from 'redux';
import { user, auth, users } from '../../ducks';

const rootReducer = combineReducers({
  user,
  auth,
  users,
});

export default rootReducer;
