import React from 'react';
import { HelmetLayout } from '../src/layouts';
import { authInitalize } from '../src/utils';
import { CreateTransactionContainer } from '../src/containers';

const CreateTransactionPage = () => (
  <HelmetLayout
    title="Create transaction"
    metaDescription="Create transaction will give user opportunity to make new transactions."
  >
    <div className="flex-column-center">
      <h1 className="title">Create transaction</h1>
      <CreateTransactionContainer />
    </div>
  </HelmetLayout>
);

CreateTransactionPage.getInitialProps = async (ctx) => {
  await authInitalize(ctx, true);
  return {};
};

export default CreateTransactionPage;
