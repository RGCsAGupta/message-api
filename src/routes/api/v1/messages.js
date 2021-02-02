const router = require('express').Router();
const {
  getAllMessages,
  createMessage,
  resolveMessage,
  getMessage,
  deleteMessage,
  putMessage,
} = require('../../../controllers/messages');

router.param('message_id', resolveMessage);

router.post('/', createMessage);

router.get('/', getAllMessages);

router.get('/:message_id', getMessage);

router.put('/:message_id', putMessage);

router.delete('/:message_id', deleteMessage);

module.exports.messagesApiRouter = router;
