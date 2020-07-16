import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

const HelmetLayout = (props) => {
  const { children, title, metaDescription } = props;

  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        {metaDescription && (
          <meta name="description" content={metaDescription} />
        )}
      </Head>
      {children}
    </>
  );
};

HelmetLayout.defaultProps = {
  title: '',
  metaDescription: '',
};

HelmetLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  metaDescription: PropTypes.string,
};

export default HelmetLayout;
