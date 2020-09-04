const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: ObjectId,
      ref: 'Comment',
    },
  ],
  likeCount: {
    type: Number,
    default: 0,
  },
  dislikeCount: {
    type: Number,
    default: 0,
  },
  like: [
    {
      type: ObjectId,
      ref: 'Like',
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', PostSchema);
