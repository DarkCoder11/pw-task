const catchAsync = require('../utils/catchAsync');
const TransModel = require('../models/T_Model');
const User = require('../models/User');

exports.getAllTransactions = catchAsync(async (req, res) => {
  if (!req.user) {
    res.status(401).json({
      message: 'Invalid user',
    });
  }

  const transactions = await TransModel.find({ user: req.user.id });

  res.status(200).json({
    trans_token: transactions,
  });
});

exports.createTransaction = catchAsync(async (req, res) => {
  const { name, amount } = req.body;

  if (!req.user) {
    res.status(401).json({
      message: 'Invalid user',
    });
  }

  await User.findByIdAndUpdate(
    { _id: req.user._id },
    { balance: req.user.balance - amount },
  );

  const Trans = await TransModel.create({
    username: name,
    amount,
    balance: req.user.balance - amount,
    user: req.user._id,
  });

  res.status(200).json({
    status: 'success',
    trans_token: Trans,
  });
});
exports.getUser = catchAsync(async (req, res) => {
  if (!req.user) {
    res.status(400).json({
      message: 'user not found',
    });
  } else {
    let user = await User.findById({ _id: req.user.id });
    user = { id: user._id, name: user.username, ...user._doc };
    res.status(200).json({
      user,
    });
  }
});
exports.filterUser = catchAsync(async (req, res) => {
  const { filter } = req.body;

  const users = await User.find({ username: filter }).select('_id, username');
  res.status(200).json({
    users,
  });
});
