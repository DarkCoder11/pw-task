import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Growl } from 'primereact/growl';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';

import Router from 'next/router';
import { paths } from '../../routes';
import { useForm } from '../../utils';
import { register } from '../../ducks/auth';

const RegisterContainer = ({ registerExecuter }) => {
  const growl = useRef(null);
  const { values, handleChange, handleFocus } = useForm();
  const {
    email = {},
    username = {},
    password = {},
    confirmPassword = {},
  } = values;
  const buttonDisabled =
    !email.isValid ||
    !password.isValid ||
    !username.isValid ||
    !confirmPassword.isValid;
  const usernameInputClasses = classNames('form__input', {
    form__input__invalid:
      !username.isValid && (username.isFocus || username.value),
  });
  const emailInputClasses = classNames('form__input', {
    form__input__invalid: !email.isValid && (email.isFocus || email.value),
  });
  const passwordInputClasses = classNames('form__input', {
    form__input__invalid:
      !password.isValid && (password.isFocus || email.password),
  });
  const confirmPasswordInputClasses = classNames('form__input', {
    form__input__invalid:
      !confirmPassword.isValid &&
      (confirmPassword.isFocus || confirmPassword.value),
  });

  const registerHandler = async (event) => {
    if (event) event.preventDefault();

    try {
      await registerExecuter(username.value, password.value, email.value);
      Router.push(paths.profile);
    } catch (error) {
      growl.current.show({
        severity: 'error',
        summary: 'Registration failed',
        detail: error,
      });
    }
  };

  return (
    <form className="form" onSubmit={registerHandler}>
      <InputText
        name="username"
        type="text"
        onFocus={handleFocus}
        onChange={handleChange}
        placeholder="Username"
        value={username.value || ''}
        className={usernameInputClasses}
      />
      <InputText
        name="email"
        type="email"
        onFocus={handleFocus}
        onChange={handleChange}
        value={email.value || ''}
        placeholder="Email"
        className={emailInputClasses}
      />
      <Password
        name="password"
        feedback={false}
        onFocus={handleFocus}
        onChange={handleChange}
        placeholder="Password"
        value={password.value || ''}
        className={passwordInputClasses}
      />
      <Password
        feedback={false}
        onFocus={handleFocus}
        name="confirmPassword"
        onChange={handleChange}
        placeholder="Confirm password"
        value={confirmPassword.value || ''}
        className={confirmPasswordInputClasses}
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

RegisterContainer.propTypes = {
  registerExecuter: PropTypes.func.isRequired,
};

const mapDispatchToProps = { registerExecuter: register };

export default connect(null, mapDispatchToProps)(RegisterContainer);
