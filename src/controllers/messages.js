const { ObjectId } = require('mongoose').Types;
const ResourceNotFound = require('../errors/ResourceNotFound');
const BadRequest = require('../errors/BadRequest');
const { controllerWrapper } = require('../utils');
const {
  getMessageById,
  getAllMessages,
  createMessage,
  deleteMessageById,
  updateMessage,
} = require('../services/message');

module.exports.resolveMessage = controllerWrapper(async (req, res, next) => {
  const { message_id: messageId } = req.params;

  if (!ObjectId.isValid(messageId)) throw new BadRequest();

  const message = await getMessageById(messageId);

  if (!message) throw new ResourceNotFound();

  req.message = message;
  next();
});

module.exports.createMessage = controllerWrapper(async (req, res) => {
  const { text } = req.body;
  const message = await createMessage({ text });
  return res.json(message);
});

module.exports.getAllMessages = controllerWrapper(async (req, res) => {
  // query params
  const { per_page: perPage = 100, page = 0 } = req.query;

  const pageNumber = Number.parseInt(page, 10);
  const limit = Number.parseInt(perPage, 10);

  const messages = await getAllMessages(limit, pageNumber);

  return res.json(messages);
});

module.exports.getMessage = controllerWrapper(async (req, res) => {
  res.json(req.message);
});

module.exports.putMessage = controllerWrapper(async (req, res) => {
  const { text } = req.body;
  const message = await updateMessage(req.message, { text });
  return res.json(message);
});

module.exports.deleteMessageById = controllerWrapper(async (req, res) => {
  const message = await deleteMessageById(req.message.id);
  res.json(message);
});
