import React from 'react';
import PropTypes from 'prop-types';

const ItemTemplate = ({ id, username }) => (
  <div className="p-clearfix">
    <div>{`${username} transaction #${id}`}</div>
  </div>
);

ItemTemplate.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default ItemTemplate;
