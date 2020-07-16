import React from 'react';
import PropTypes from 'prop-types';
import NextLink from '../NextLink';

const SidebarItem = ({ to, content }) => (
  <li>
    <NextLink to={to} activeClassName="active-route">
      {content}
    </NextLink>
  </li>
);

SidebarItem.propTypes = {
  to: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default SidebarItem;
