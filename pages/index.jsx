import React from 'react';
import { HelmetLayout } from '../src/layouts';
import { HomeContainer } from '../src/containers';
import { authInitalize } from '../src/utils';

const HomePage = () => (
  <HelmetLayout
    title="Home"
    metaDescription="Home page which tell user lets authenticate."
  >
    <div className="flex-column-center">
      <h1 className="title">Home</h1>
      <HomeContainer />
    </div>
  </HelmetLayout>
);

HomePage.getInitialProps = async (ctx) => {
  await authInitalize(ctx);

  return {};
};

export default HomePage;
