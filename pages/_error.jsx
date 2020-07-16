import React from 'react';
import { HelmetLayout } from '../src/layouts';
import { authInitalize } from '../src/utils';

const ErrorPage = () => (
  <HelmetLayout
    title="Page not found"
    metaDescription="Page with that url not found in PW app."
  >
    <div className="full-height-center">
      <h1 className="title">Page Not Found</h1>
    </div>
  </HelmetLayout>
);

ErrorPage.getInitialProps = async (ctx) => {
  await authInitalize(ctx);

  return {};
};

export default ErrorPage;
