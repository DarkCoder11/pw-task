import React, { useState, useRef, useEffect } from 'react';
import * as R from 'ramda';
import { map } from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { createSelector } from 'reselect';

import { useWindowSize, useOutsideClick } from '../../utils';
import { SidebarItem, Logo, ProfileCard } from '../../components';

const SidebarContainer = ({ sidebarItems, token }) => {
  const { width } = useWindowSize();
  const { pathname } = useRouter();
  const sidebarRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const closeDrawer = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    closeDrawer();
  }, [pathname]);

  useOutsideClick(sidebarRef, () => {
    closeDrawer();
  });

  const drawerHandler = () => {
    setIsOpen(!isOpen);
  };

  const renderItems = () => {
    return map(sidebarItems, (sidebarItem) => {
      const { id, isPrivate, ...restSidebarItem } = sidebarItem;
      const protectedItems = isPrivate && (
        <SidebarItem key={id} {...restSidebarItem} />
      );
      const publicItems = !isPrivate && (
        <SidebarItem key={id} {...restSidebarItem} />
      );

      return token ? protectedItems : publicItems;
    });
  };

  return (
    <>
      {width < 992 && (
        <button
          type="button"
          className="layout-sidebar__drawer"
          onClick={drawerHandler}
        >
          <img src="/img/menu.png" alt="menu" />
        </button>
      )}
      <div
        ref={sidebarRef}
        className={classNames('layout-sidebar', 'layout-sidebar-dark', {
          'layout-sidebar__hidden': isOpen,
        })}
      >
        <Logo />
        <ProfileCard />
        <div className="layout-menu-container">
          <ul className="layout-menu">{renderItems()}</ul>
        </div>
      </div>
    </>
  );
};

SidebarContainer.defaultProps = {
  token: '',
};

SidebarContainer.propTypes = {
  token: PropTypes.string,
  sidebarItems: PropTypes.array.isRequired,
};

const mapStateToProps = createSelector(R.path(['auth', 'token']), (token) => ({
  token,
}));

export default connect(mapStateToProps)(SidebarContainer);
