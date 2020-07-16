import { createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from './reducer';
import createMiddleware from './middleware';

const middleware = createMiddleware(thunkMiddleware);

export default (initialState = {}) => {
  return createStore(reducers, initialState, middleware);
};
