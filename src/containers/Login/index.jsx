import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Router from 'next/router';
import { connect } from 'react-redux';
import { Growl } from 'primereact/growl';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';

import { paths } from '../../routes';
import { useForm } from '../../utils';
import { login } from '../../ducks/auth';

const LoginContainer = ({ loginExecuter }) => {
  const growl = useRef(null);
  const { values, handleChange, handleFocus } = useForm();
  const { email = {}, password = {} } = values;
  const emailInputClasses = classNames('form__input', {
    form__input__invalid: !email.isValid && (email.isFocus || email.value),
  });
  const passwordInputClasses = classNames('form__input', {
    form__input__invalid:
      !password.isValid && (password.isFocus || password.value),
  });
  const buttonDisabled = !email.isValid || !password.isValid;

  const loginHandler = async (event) => {
    if (event) event.preventDefault();

    try {
      await loginExecuter(email.value, password.value);
      Router.push(paths.profile);
    } catch (error) {
      growl.current.show({
        severity: 'error',
        summary: 'Login failed',
        detail: error,
      });
    }
  };

  return (
    <form className="form" onSubmit={loginHandler}>
      <InputText
        name="email"
        onFocus={handleFocus}
        onChange={handleChange}
        placeholder="Email"
        value={email.value || ''}
        className={emailInputClasses}
      />
      <Password
        name="password"
        feedback={false}
        onFocus={handleFocus}
        onChange={handleChange}
        value={password.value || ''}
        placeholder="Password"
        className={passwordInputClasses}
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

LoginContainer.propTypes = {
  loginExecuter: PropTypes.func.isRequired,
};

const mapDispatchToProps = { loginExecuter: login };

export default connect(null, mapDispatchToProps)(LoginContainer);
