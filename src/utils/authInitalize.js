import Router from 'next/router';

import { paths } from '../routes';
import { getCookie } from '../libraries';
import { loadToken } from '../ducks/auth';
import { getUserInfo } from '../ducks/user';

export default (ctx, isAuthRequired) =>
  new Promise(async (resolve) => {
    const isServer = typeof window === 'undefined';

    if (isServer) {
      const token = getCookie('token', ctx.req);

      if (token) {
        ctx.reduxStore.dispatch(loadToken(token));
        await ctx.reduxStore.dispatch(getUserInfo());
      }

      if (isAuthRequired && !token) {
        ctx.res.writeHead(301, {
          Location: paths.login,
        });
        ctx.res.end();
      }

      if (
        token &&
        (ctx.pathname === paths.login || ctx.pathname === paths.register)
      ) {
        ctx.res.writeHead(301, {
          Location: paths.home,
        });
        ctx.res.end();
      }

      resolve(token);
    } else {
      const { token } = ctx.reduxStore.getState().auth;

      if (isAuthRequired && !token) {
        Router.push(paths.login);
      }

      if (
        token &&
        (ctx.pathname === paths.login || ctx.pathname === paths.register)
      ) {
        Router.push(paths.home);
      }

      resolve(token);
    }
  });
