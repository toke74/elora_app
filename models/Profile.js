const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  DateOfBrith: {
    type: Date,
  },
  website: {
    type: String,
  },
  gender: {
    type: String,
  },
  about: {
    type: String,
  },
  interests: {
    type: [String],
  },
  currentCity: {
    type: String,
  },
  relationshipStatus: {
    type: String,
  },
  origin: {
    type: String,
  },
  occupation: {
    type: String,
  },
  school: {
    type: String,
  },

  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Profile', ProfileSchema);
