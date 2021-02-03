const { ObjectId } = require('mongoose').Types;
const ResourceNotFound = require('../errors/ResourceNotFound');
const BadRequest = require('../errors/BadRequest');
const { controllerWrapper } = require('../utils');
const {
  getMessageById,
  getAllMessages,
  createMessage,
  deleteMessage,
  updateMessage,
} = require('../services/message');
/**
 * @openapi
 * components:
 *   responses:
 *     200OkMessage:
 *       description: successful message
 *       content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/Message'
 */
/**
 * @openapi
 * components:
 *   requestBodies:
 *     MessageBody:
 *       description: A JSON object containing pet information
 *       required: true
 *         content:
 *           application/json:
 *         schemas:
 *           Message:
 *             title: A message
 *             type: object
 *             properties:
 *               text:
 *                 required: true
 *                 type: string
 *                 description: message text
 */

module.exports.resolveMessage = controllerWrapper(async (req, res, next) => {
  const { message_id: messageId } = req.params;

  if (!ObjectId.isValid(messageId)) throw new BadRequest();

  const message = await getMessageById(messageId);

  if (!message) throw new ResourceNotFound();

  req.message = message;
  next();
});

/**
 * @openapi
 * /api/v1/messages:
 *   post:
 *     description: create a message
 *     produces:
 *      - application/json
 *     requestBody:
 *       $ref: '#/components/requestBodies/MessageBody'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200OkMessage'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       404:
 *         $ref: '#/components/responses/404NotFound'
 *       500:
 *         $ref: '#/components/responses/500InternalServerError'
 */
module.exports.createMessage = controllerWrapper(async (req, res) => {
  const { text } = req.body;
  const message = await createMessage({ text });
  return res.json(message.toJSON({ virtuals: true }));
});

/**
 * @openapi
 * /api/v1/messages:
 *  get:
 *    description: returns all messages
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: page
 *        in: query
 *        description: page number
 *        schema:
 *          type: integer
 *      - name: per_page
 *        in: query
 *        description: messages per page
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: All messages were returned
 *        content:
 *          application/json:
 *             schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Message'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      400:
 *        $ref: '#/components/responses/400BadRequest'
 *      404:
 *        $ref: '#/components/responses/404NotFound'
 *      500:
 *        $ref: '#/components/responses/500InternalServerError'
 */
module.exports.getAllMessages = controllerWrapper(async (req, res) => {
  // query params
  const { per_page: perPage = 100, page = 0 } = req.query;

  const pageNumber = Number.parseInt(page, 10);
  const limit = Number.parseInt(perPage, 10);

  const { messages, ...restResult } = await getAllMessages(limit, pageNumber);

  return res.json({
    ...restResult,
    messages: messages.map((m) => m.toJSON({ virtuals: true })),
  });
});

/**
 * @openapi
 * /api/v1/messages/{messageId}:
 *  get:
 *    description: returns a message
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: messageId
 *        in: path
 *        required: true
 *        description: Numeric ID of the message to get
 *        schema:
 *          type: mongoose.Types.ObjectId
 *    responses:
 *      200:
 *        $ref: '#/components/responses/200OkMessage'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      400:
 *        $ref: '#/components/responses/400BadRequest'
 *      404:
 *        $ref: '#/components/responses/404NotFound'
 *      500:
 *        $ref: '#/components/responses/500InternalServerError'
 */
module.exports.getMessage = controllerWrapper(async (req, res) => {
  res.json(req.message.toJSON({ virtuals: true }));
});

/**
 * @openapi
 * /api/v1/messages/{messageId}:
 *   put:
 *     description: update a message
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: messageId
 *        in: path
 *        required: true
 *        description: Numeric ID of the message to get
 *        schema:
 *          type: mongoose.Types.ObjectId
 *     requestBody:
 *      $ref: '#/components/requestBodies/MessageBody'
 *     responses:
 *      200:
 *        $ref: '#/components/responses/200OkMessage'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      400:
 *        $ref: '#/components/responses/400BadRequest'
 *      404:
 *        $ref: '#/components/responses/404NotFound'
 *      500:
 *        $ref: '#/components/responses/500InternalServerError'
 */
module.exports.putMessage = controllerWrapper(async (req, res) => {
  const { text } = req.body;
  const message = await updateMessage(req.message, { text });
  return res.json(message.toJSON({ virtuals: true }));
});

/**
 * @openapi
 * /api/v1/messages/{messageId}:
 *  delete:
 *    description: deletes a message
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: messageId
 *        in: path
 *        required: true
 *        description: Numeric ID of the message to get
 *        schema:
 *          type: mongoose.Types.ObjectId
 *    responses:
 *      200:
 *        $ref: '#/components/responses/200OkMessage'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      400:
 *        $ref: '#/components/responses/400BadRequest'
 *      404:
 *        $ref: '#/components/responses/404NotFound'
 *      500:
 *        $ref: '#/components/responses/500InternalServerError'
 */
module.exports.deleteMessage = controllerWrapper(async (req, res) => {
  const message = await deleteMessage(req.message);
  res.json(message.toJSON({ virtuals: true }));
});
