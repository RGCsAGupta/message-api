const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *   schemas:
 *     Message:
 *       title: A message
 *       type: object
 *       properties:
 *         _id:
 *           type: mongoose.Types.ObjectId
 *           description: unique identifier
 *         createdAt:
 *           type: Date
 *           description: created at date
 *         updatedAt:
 *           type: Date
 *           description: last updated at date
 *         text:
 *           type: string
 *           description: Message text
 *         isPalindrome:
 *           type: boolean
 *           description: flag to tell if the message string is palindrome
 *       required:
 *         - text
 */
const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
}, { timestamps: true });

// Create a virtual property `isPalindrome` that's computed from `text`.
messageSchema.virtual('isPalindrome').get(function isPalindrome() {
  const text = this.text.toLowerCase();
  const len = text.length;
  for (let i = 0; i < len / 2; i += 1) {
    if (text[i] !== text[len - 1 - i]) {
      return false;
    }
  }
  return true;
});

module.exports.MessageModel = mongoose.model('Message', messageSchema);
