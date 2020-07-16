import React from 'react';
import PropTypes from 'prop-types';
import { SidebarContainer } from '../../containers';

const MenuLayout = ({ children }) => (
  <div className="layout-wrapper layout-static">
    <SidebarContainer />
    <div className="layout-main">{children}</div>
  </div>
);

MenuLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MenuLayout;
