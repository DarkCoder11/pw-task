import { applyMiddleware, compose } from 'redux';

const createMiddleware = (clientMiddleware) => {
  const middleware = applyMiddleware(clientMiddleware);
  const composeEnhancers =
    typeof window === 'object' &&
    process.env.NODE_ENV === 'development' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  return composeEnhancers(middleware);
};

export default createMiddleware;
