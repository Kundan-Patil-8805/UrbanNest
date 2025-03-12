const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
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
    },
    refreshTokens: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Method to compare passwords
userSchema.methods.isMatch = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id, email: this.email }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m', // Short-lived
  });
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRY || '7d', // Long-lived
  });
};

// Method to add refresh token to the database
userSchema.methods.addRefreshToken = async function (refreshToken) {
  this.refreshTokens.push(refreshToken);
  await this.save();
};

// Method to validate refresh token
userSchema.statics.validateRefreshToken = async function (refreshToken) {
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const user = await this.findById(decoded.id);
  if (!user || !user.refreshTokens.includes(refreshToken)) {
    throw new Error('Invalid refresh token');
  }
  return user;
};

// Method to revoke refresh token (logout)
userSchema.methods.revokeRefreshToken = async function (refreshToken) {
  this.refreshTokens = this.refreshTokens.filter((token) => token !== refreshToken);
  await this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User;
