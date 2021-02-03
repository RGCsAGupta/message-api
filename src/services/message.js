const { MessageModel } = require('../models/Message');

module.exports.getMessageById = async (id) => MessageModel.findById(id);

module.exports.getAllMessages = async (limit, page) => {
  // prepare db query
  const query = {};

  // load db data
  const total = await MessageModel.countDocuments(query);
  const messages = await (MessageModel.find(query).skip(limit * page).limit(limit));

  return {
    total,
    messages,
    page,
    pageSize: messages.length,
  };
};

module.exports.createMessage = async ({ text }) => {
  const message = new MessageModel({ text });
  return message.save();
};

module.exports.updateMessage = async (message, { text }) => {
  const messageToUpdate = message;
  if (text !== undefined) {
    messageToUpdate.text = text;
  }
  return messageToUpdate.save();
};

module.exports.deleteMessage = async (message) => message.remove();

module.exports.deleteAll = async () => {
  await MessageModel.deleteMany({});
};
