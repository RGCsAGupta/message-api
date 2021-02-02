const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
}, { timestamps: true });

// Create a virtual property `isPalindrome` that's computed from `text`.
messageSchema.virtual('isPalindrome').get(function isPalindrome() {
  return !!this.text;
});

module.exports.MessageModel = mongoose.model('Message', messageSchema);
