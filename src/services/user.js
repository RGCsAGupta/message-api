const { UserModel } = require('../models/User');

module.exports.loadByToken = (token, cb) => {
  UserModel.findOne({ token }, cb);
};

module.exports.createUser = async (data) => {
  const user = new UserModel(data);
  return user.save();
};

module.exports.deleteAll = async () => {
  await UserModel.deleteMany({});
};
