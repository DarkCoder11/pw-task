import { useState } from 'react';
import {
  isEmail,
  isStringEmpty,
  isValidLength,
  isNegativeNumber,
} from '../helpers/validations';

const useForm = () => {
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    let isValid = false;
    const { value, name } = event.target;

    switch (name) {
      case 'email':
        isValid = !isStringEmpty(value) && isEmail(value);
        break;
      case 'password':
        isValid = isValidLength(value, 7);
        break;
      case 'confirmPassword':
        isValid = isValidLength(value, 7) && value === values.password.value;
        break;
      case 'username':
        isValid = !isStringEmpty(value);
        break;
      case 'amount':
        isValid = !isNegativeNumber(value);
        break;

      default:
        isValid = false;
        break;
    }

    setValues((prevValues) => ({
      ...prevValues,
      [name]: {
        ...prevValues[name],
        isValid,
        value,
      },
    }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: {
        ...prevValues[name],
        isFocus: false,
      },
    }));
  };

  const handleFocus = (event) => {
    const { name } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: {
        ...prevValues[name],
        isFocus: true,
      },
    }));
  };

  return {
    handleChange,
    handleBlur,
    handleFocus,
    values,
    setValues,
  };
};

export default useForm;
