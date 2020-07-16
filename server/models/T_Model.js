const mongoose = require('mongoose');
const User = require('./User');
const AppError = require('./../utils/AppError');

const transSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxlength: 100,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  amount: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

transSchema.pre('save', async function (next) {
  const user = await User.findById({ _id: this.user });
  if (this.amount > user.balance) {
    return next(
      new AppError('Discount balance amount need below balance', 401),
    );
  }
  next();
});

const TransModel = mongoose.model('TransModel', transSchema);
module.exports = TransModel;
