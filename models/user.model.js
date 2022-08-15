const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  department: {
    type: mongoose.Schema.Types.ObjectId      // so user can only see the seats associated with a department which is already assosiated with a floor for grouped seating
  },
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  deleted: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'user'
  }
}, { timestamps: true, collection: 'user' });

userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.hash(user.password, 10).then((hashedPassword) => {
    user.password = hashedPassword;
    return next();
  }, err => next(err));
});

userSchema.methods.comparePassword = function comparePassword(userPassword) {
  return new Promise((resolve, reject) => {
    if (!this.password) {
      return resolve(false)
    }
    bcrypt.compare(userPassword, this.password)
      .then((isMatch) => {
        resolve(isMatch);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

userSchema.index({ department: 1 });
userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);
module.exports = User;
