import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const DataItem = (props) => {
  const { id, date, amount, balance, username, className } = props;
  const dataItemClasses = classNames('profile__data__item', {
    [className]: className,
  });

  return (
    <div className={dataItemClasses}>
      <div className="p-grid">
        <div className="p-col-12">
          ID: <b className="profile__data__item__title">#{id}</b>
        </div>
        <div className="p-col-12">
          Correspondent Name:{' '}
          <b className="profile__data__item__title">{username}</b>
        </div>
        <div className="p-col-12">
          Date: <b className="profile__data__item__title">{date}</b>
        </div>
        <div className="p-col-12">
          Amount: <b className="profile__data__item__title">{amount}</b>
        </div>
        <div className="p-col-12">
          Balance: <b className="profile__data__item__title">{balance}</b>
        </div>
      </div>
    </div>
  );
};

DataItem.propTypes = {
  id: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default DataItem;
