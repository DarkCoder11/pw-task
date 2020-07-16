const jwt = require('jsonwebtoken');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const envConfig = require('../../env.config');

const createToken = (User, res) => {
  const token = jwt.sign({ id: User._id }, envConfig.JWT_SECRET, {
    expiresIn: envConfig.JWT_EXPIRES_IN,
  });
  const cookieOptions = {
    expires: new Date(
      Date.now() + envConfig.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  res.cookie('jwt', token, cookieOptions);
  res.status(200).json({
    id_token: token,
  });
};

exports.register = catchAsync(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      status: 'error',
      message: 'You must send username and password',
    });
  }
  const user = await User.findOne({ email });
  if (user) {
    res.status(400).json({
      status: 'error',
      message: 'A user with that email already exists',
    });
  } else {
    const newUser = await User.create(req.body);
    // const newUser = req.body
    createToken(newUser, res);
  }
});
exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      status: 'error',
      message: 'You must send username and password',
    });
  }
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    res.status(400).json({
      status: 'error',
      message: 'User not found',
    });
  } else {
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid email or password',
      });
    }
    createToken(user, res);
  }
});
exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};
