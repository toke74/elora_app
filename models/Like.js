const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const LikeSchema = new Schema({
  postId: {
    type: ObjectId,
  },
  user: {
    type: ObjectId,
  },
  like: {
    type: Boolean,
    default: false,
  },
  dislike: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Like', LikeSchema);
