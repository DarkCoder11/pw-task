/* eslint-disable  */
import React from 'react';

import { isServer } from '../../utils';
import configureStore from './configureStore';

const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

const getOrCreateStore = (initialState) => {
  if (isServer) {
    return configureStore(initialState);
  }

  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = configureStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
};

export default (App) => {
  return class AppWithRedux extends React.Component {
    static async getInitialProps(appContext) {
      const reduxStore = getOrCreateStore();

      appContext.ctx.reduxStore = reduxStore;

      let appProps = {};

      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext);
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
      };
    }

    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};
