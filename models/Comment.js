const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const CommentSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User',
  },
  post: {
    type: ObjectId,
  },
  text: {
    type: String,
    required: true,
  },
  parentId: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Comment', CommentSchema);
