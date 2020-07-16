import React from 'react';
import { authInitalize } from '../src/utils';
import { HelmetLayout } from '../src/layouts';
import { RegisterContainer } from '../src/containers';

const RegisterPage = () => (
  <HelmetLayout
    title="Registration"
    metaDescription="Registration will register user and immediately authenticate."
  >
    <div className="flex-column-center">
      <h1 className="title">Registration</h1>
      <RegisterContainer />
    </div>
  </HelmetLayout>
);

RegisterPage.getInitialProps = async (ctx) => {
  await authInitalize(ctx);

  return {};
};

export default RegisterPage;
