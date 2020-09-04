const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const NotificationSchema = new Schema({
  postId: {
    type: ObjectId,
    ref: 'Post',
  },
  recipient: {
    type: ObjectId,
  },
  sender: {
    type: ObjectId,
    ref: 'User',
  },
  commentId: {
    type: ObjectId,
    ref: 'Comment',
  },
  type: {
    type: String,
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Notification', NotificationSchema);
