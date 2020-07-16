import React from 'react';
import { HelmetLayout } from '../src/layouts';
import { LoginContainer } from '../src/containers';
import { authInitalize } from '../src/utils';

const LoginPage = () => (
  <HelmetLayout
    title="Login"
    metaDescription="Login will give user opportunity to authenticate via email and password."
  >
    <div className="flex-column-center">
      <h1 className="title">Login</h1>
      <LoginContainer />
    </div>
  </HelmetLayout>
);

LoginPage.getInitialProps = async (ctx) => {
  await authInitalize(ctx);

  return {};
};

export default LoginPage;
