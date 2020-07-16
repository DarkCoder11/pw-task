import React from 'react';
import { HelmetLayout } from '../src/layouts';
import { authInitalize } from '../src/utils';
import { ProfileContainer } from '../src/containers';

const ProfilePage = () => (
  <HelmetLayout
    title="Profile"
    metaDescription="Profile will give user opportunity to view transactions history."
  >
    <div className="flex-column-center">
      <h1 className="title">Profile</h1>
      <ProfileContainer />
    </div>
  </HelmetLayout>
);

ProfilePage.getInitialProps = async (ctx) => {
  await authInitalize(ctx, true);
  return {};
};

export default ProfilePage;
