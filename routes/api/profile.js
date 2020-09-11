const express = require('express');
const router = express.Router();
const normalize = require('normalize-url');
const isAuth = require('../../middleware/isAuth');
const Profile = require('../../models/Profile');
const checkObjectId = require('../../middleware/checkObjectId');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const Notification = require('../../models/Notification');

// @route    GET api/profile/id
// @desc     Get  users profile by id
// @access   Private
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.id,
    })
      .populate('user', ['firstName', 'lastName', 'avatar', 'createdAt'])
      .populate('followers', ['firstName', 'lastName', 'avatar', 'createdAt'])
      .populate('following', ['firstName', 'lastName', 'avatar', 'createdAt']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find()
      .populate('user', ['firstName', 'lastName', 'avatar', 'createdAt'])
      .populate('followers', ['firstName', 'lastName', 'avatar', 'createdAt'])
      .populate('following', ['firstName', 'lastName', 'avatar', 'createdAt']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post('/', isAuth, async (req, res) => {
  const {
    DateOfBrith,
    gender,
    website,
    bio,
    about,
    interests,
    currentCity,
    relationshipStatus,
    school,
    origin,
    occupation,
    firstName,
    lastName,
  } = req.body;
  const updateUser = {
    firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
    lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
  };

  const profileFields = {
    user: req.user.id,
    DateOfBrith,
    gender,
    currentCity,
    website:
      website && website !== '' ? normalize(website, { forceHttps: true }) : '',
    bio,
    interests: Array.isArray(interests)
      ? interests
      : interests.split(',').map((interest) => ' ' + interest.trim()),
    about,
    relationshipStatus,
    school,
    origin,
    occupation,
  };

  try {
    // Using upsert option (creates new doc if no match is found):
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      {
        $set: profileFields,
      },
      { new: true, upsert: true }
    );

    //Update first Name and Last name in user data
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: updateUser },
      { new: true }
    );

    //Update first Name and Last name in Post data
    await Post.updateMany({ user: req.user.id }, { $set: updateUser });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', isAuth, async (req, res) => {
  try {
    // Remove user Posts
    await Post.deleteMany({ user: req.user.id });

    // Remove user Comments
    await Comment.deleteMany({ user: req.user.id });

    // Remove user Notifications
    await Notification.deleteMany({ recipient: req.user.id });

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    //Remove User from following
    await User.updateMany(
      { following: req.user.id },
      {
        $pull: {
          following: req.user.id,
        },
      }
    );

    //Remove User from followers
    await User.updateMany(
      { followers: req.user.id },
      {
        $pull: {
          followers: req.user.id,
        },
      }
    );

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/profile/follow/:id
// @desc     Follow User
// @access   Private
router.put('/follow/:id', [isAuth, checkObjectId('id')], async (req, res) => {
  try {
    const followersProfile = await Profile.findOneAndUpdate(
      { user: req.params.id },
      {
        $push: {
          followers: req.user.id,
        },
      },
      {
        new: true,
      }
    );
    if (!followersProfile) {
      return res.status(422).json({ msg: 'User not found' });
    } else {
      const followingsProfile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        {
          $push: {
            following: req.params.id,
          },
        },
        { new: true }
      );
      return res.json(followingsProfile);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/users/unfollow/:id
// @desc     UnFollow User
// @access   Private
router.put('/unfollow/:id', [isAuth, checkObjectId('id')], async (req, res) => {
  try {
    const followersProfile = await Profile.findOneAndUpdate(
      { user: req.params.id },
      {
        $pull: {
          followers: req.user.id,
        },
      },
      {
        new: true,
      }
    );

    if (!followersProfile) {
      return res.status(422).json({ msg: 'Unprocessable Entity' });
    } else {
      const followingsProfile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        {
          $pull: {
            following: req.params.id,
          },
        },
        { new: true }
      );
      return res.json(followingsProfile);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
