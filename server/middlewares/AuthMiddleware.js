const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const envConfig = require('../../env.config');

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // eslint-disable-next-line prefer-destructuring
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt !== 'loggedout') {
    token = req.cookies.jwt;
  }
  if (!token) {
    // res.status(200).redirect("login");
    return next(
      new AppError('You are not logged in!. Please log in to get access.', 401),
    );
  }
  // 2) Verification token

  const decoded = await jwt.verify(token, envConfig.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError('User not found', 401));
  }
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});
// Only rendered page ,no errors
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await jwt.verify(req.cookies.jwt, envConfig.JWT_SECRET);
      // 2) Verification token
      // 3) Check if user still exists
      const currentUser = await User.findById(decoded.id);

      if (!currentUser) {
        return next();
      }

      // There is a logged in user
      res.locals.user = currentUser;
      return next();
    } catch (e) {
      console.log(e);
    }
  }
  // 1) Getting token and check of it's there
  next();
};
