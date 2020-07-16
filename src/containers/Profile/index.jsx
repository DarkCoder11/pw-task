import React, { useState } from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Dropdown } from 'primereact/dropdown';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';

import { DataItem } from '../../components';
import { sortArrByDate } from '../../utils';

const ProfileContainer = ({ user }) => {
  const [first, setFirst] = useState(0);
  const [layout, setLayout] = useState('list');
  const [sortKey, setSortKey] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const sortedTransaction = sortArrByDate(user.trans_token, 'date', 'desc');

  const onSortChange = ({ value }) => {
    if (value.indexOf('!') === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  };

  const itemTemplate = (transaction = {}, layoutTemplate) => {
    if (!transaction) {
      return null;
    }

    if (layoutTemplate === 'list') {
      return <DataItem {...transaction} className="p-grid" />;
    }
    if (layoutTemplate === 'grid') {
      return <DataItem {...transaction} className="p-col-12 p-md-3" />;
    }
  };

  const sortOptions = [
    { label: 'Correspondent name', value: 'username' },
    { label: 'Date', value: 'date' },
    { label: 'Amount', value: 'amount' },
  ];

  return (
    <div className="flex-column-center">
      <div className="p-grid w-100 profile__filter__row">
        <div className="p-col-6" style={{ textAlign: 'left' }}>
          <Dropdown
            options={sortOptions}
            value={sortKey}
            placeholder="Sort By"
            onChange={onSortChange}
          />
        </div>
        <div className="p-col-6" style={{ textAlign: 'right' }}>
          <DataViewLayoutOptions
            layout={layout}
            onChange={(e) => setLayout(e.value)}
          />
        </div>
      </div>
      <DataView
        className="w-100"
        value={sortedTransaction}
        layout={layout}
        itemTemplate={itemTemplate}
        paginator
        rows={5}
        first={first}
        sortField={sortField}
        emptyMessage="No history found"
        sortOrder={sortOrder}
        onPage={(e) => setFirst(e.first)}
      />
    </div>
  );
};

ProfileContainer.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = createSelector(R.path(['user']), (user) => ({
  user,
}));

export default connect(mapStateToProps)(ProfileContainer);
