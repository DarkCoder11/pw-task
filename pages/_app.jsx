import React from 'react';
import NextApp from 'next/app';
import Router from 'next/router';
import { Provider } from 'react-redux';
import NextNprogress from 'nextjs-progressbar';

import { MenuLayout } from '../src/layouts';
import { withReduxStore } from '../src/libraries';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../src/styles/index.scss';

class MyApp extends NextApp {
  componentDidMount() {
    Router.events.on('routeChangeComplete', () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    });
  }

  render() {
    const { reduxStore, Component, pageProps } = this.props;

    return (
      <Provider store={reduxStore}>
        <NextNprogress options={{ showSpinner: false }} />
        <MenuLayout>
          <Component {...pageProps} />
        </MenuLayout>
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);
