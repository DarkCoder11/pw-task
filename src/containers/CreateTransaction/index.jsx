import React, { useRef, useState } from 'react';
import * as R from 'ramda';
import Router from 'next/router';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Growl } from 'primereact/growl';
import { Button } from 'primereact/button';
import { Spinner } from 'primereact/spinner';
import { AutoComplete } from 'primereact/autocomplete';

import { paths } from '../../routes';
import { getUsers } from '../../ducks/users';
import { ItemTemplate } from '../../components';
import { useForm, sortArrByDate } from '../../utils';
import { createUserTransation } from '../../ducks/user';

const CreateTransaction = ({
  getUsersHandler,
  transations,
  createUserTransationExecuter,
}) => {
  const growl = useRef(null);
  const [transactionID, setTransactionID] = useState('');
  const [coorespondName, setCoorespondName] = useState('');
  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const {
    values,
    setValues,
    handleChange,
    handleBlur,
    handleFocus,
  } = useForm();
  const sortedTransaction = sortArrByDate(transations, 'date', 'desc');
  const { amount = {} } = values;
  const amountInputClasses = classNames('form__input', {
    form__input__invalid: !amount.isValid && (amount.isFocus || amount.value),
  });
  const buttonDisabled =
    !amount.isValid ||
    !coorespondName ||
    (typeof coorespondName === 'object' && !coorespondName.name);
  const transationValue = transactionID.id
    ? `${transactionID.username} transaction #${transactionID.id}`
    : transactionID;

  const createUserTransactionHandler = async (event) => {
    if (event) event.preventDefault();

    try {
      await createUserTransationExecuter(coorespondName, amount.value);
      Router.push(paths.profile);
    } catch (error) {
      growl.current.show({
        severity: 'error',
        summary: 'Create a transation failed.',
        detail: error,
      });
    }
  };

  const suggestNames = async (event) => {
    try {
      const data = await getUsersHandler(event.query);
      setNameSuggestions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const itemTemplate = (transation) => <ItemTemplate {...transation} />;

  const filterTransactions = (event) => {
    setTimeout(() => {
      let results;

      if (event.query.length === 0) {
        results = [...sortedTransaction];
      } else {
        results = sortedTransaction.filter((transation) =>
          transation.username
            .toLowerCase()
            .startsWith(event.query.toLowerCase()),
        );
      }

      setFilteredTransactions(results);
    }, 250);
  };

  const setBasisHandler = ({ value }) => {
    if (value.id) {
      const transaction = transations.find(
        (transation) => transation.id === value.id,
      );
      setValues((prevValues) => ({
        ...prevValues,
        amount: {
          value: Math.abs(transaction.amount),
          isValid: true,
          isFocus: false,
        },
      }));
      setCoorespondName({ name: transaction.username });
      setTransactionID({ username: value.username, id: value.id });
    } else {
      setTransactionID(value);
    }
  };

  return (
    <form className="form" onSubmit={createUserTransactionHandler}>
      <AutoComplete
        value={transationValue}
        suggestions={filteredTransactions}
        completeMethod={filterTransactions}
        size={30}
        minLength={1}
        placeholder="Recent transactions"
        dropdown
        itemTemplate={itemTemplate}
        onChange={setBasisHandler}
      />
      <AutoComplete
        value={coorespondName}
        suggestions={nameSuggestions}
        completeMethod={suggestNames}
        field="name"
        size={30}
        minLength={1}
        className="form__input"
        placeholder="Username"
        onChange={(e) => setCoorespondName(e.value)}
      />
      <Spinner
        name="amount"
        feedback={false}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={handleChange}
        value={amount.value || ''}
        placeholder="Amount"
        className={amountInputClasses}
      />
      <Button
        label="Submit"
        className="form__button"
        disabled={buttonDisabled}
      />
      <Growl ref={growl} />
    </form>
  );
};

CreateTransaction.defaultProps = {
  transations: [],
};

CreateTransaction.propTypes = {
  transations: PropTypes.any,
  getUsersHandler: PropTypes.func.isRequired,
  createUserTransationExecuter: PropTypes.func.isRequired,
};

const mapStateToProps = createSelector(
  R.path(['user', 'trans_token']),
  (transations) => ({
    transations,
  }),
);

const mapDispatchToProps = {
  createUserTransationExecuter: createUserTransation,
  getUsersHandler: getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTransaction);
