const isStringEmpty = (text) => {
  return typeof text === 'string'
    ? !text || text === '' || text.trim() === ''
    : false;
};

const isNegativeNumber = (num) => {
  // eslint-disable-next-line no-restricted-globals
  return isNaN(num) ? true : Number(num) <= 0;
};

const isValidLength = (str, length) => {
  return str.length >= length;
};

const isEmail = (email) => {
  /* eslint-disable-next-line */
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export { isStringEmpty, isEmail, isValidLength, isNegativeNumber };
