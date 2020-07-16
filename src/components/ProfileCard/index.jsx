import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Button } from 'primereact/button';

import { paths } from '../../routes';
import { logout } from '../../ducks/auth';

const ProfileCard = (props) => {
  const { name, balance, logoutHandler, token } = props;

  const logoutUserHandler = () => {
    logoutHandler();
    Router.push(paths.login);
  };

  if (!token) {
    return null;
  }

  return (
    <div className="flex-column-center">
      <div className="flex-column-center">
        <span className="flex-row-center profile__item">
          <span>Username: </span>
          <h2 className="ml-10 fz-13"> {name}</h2>
        </span>
        <span className="profile__item">
          <span>Balance: </span>
          <span className="ml-10 fz-13"> {balance}</span>
        </span>
      </div>
      <Button
        label="Logout"
        onClick={logoutUserHandler}
        className="p-button-info"
      />
    </div>
  );
};

ProfileCard.defaultProps = {
  name: '',
  balance: 0,
  token: '',
};

ProfileCard.propTypes = {
  token: PropTypes.string,
  name: PropTypes.string,
  balance: PropTypes.number,
  logoutHandler: PropTypes.func.isRequired,
};

const mapStateToProps = createSelector(
  R.path(['auth', 'token']),
  R.path(['user', 'name']),
  R.path(['user', 'balance']),
  (token, name, balance) => ({
    token,
    name,
    balance,
  }),
);

const mapDispatchToProps = { logoutHandler: logout };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard);
