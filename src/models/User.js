const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, 'can\'t be empty'],
      match: [/^[a-zA-Z0-9]+$/, 'invalid username'],
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
    },
    token: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);
UserSchema.plugin(uniqueValidator, { message: 'is already taken' });

module.exports.UserModel = mongoose.model('User', UserSchema);
