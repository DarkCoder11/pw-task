const mongoose = require('mongoose');
const { hash, compare } = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  balance: {
    type: Number,
    required: true,
    default: 500,
  },
});
userSchema.pre('save', async function (next) {
  this.password = await hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  const hashedPassword = this.password;
  return await compare(password, hashedPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
