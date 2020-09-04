const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth');
const Notification = require('../../models/Notification');

// @route    GET api/notification
// @desc     Get user Notification
// @access   Private

router.get('/', isAuth, async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user.id,
    })
      .sort({ createdAt: -1 })
      .populate('sender', ['firstName', 'lastName', 'avatar']);
    res.json(notifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/notification/markNotificationRead
// @desc     Update user Notification
// @access   Private

router.put('/markNotificationRead', isAuth, async (req, res) => {
  try {
    req.body.forEach(async (notificationId) => {
      const notification = await Notification.findOneAndUpdate(
        {
          _id: notificationId,
        },
        { read: true },
        { new: true }
      );
      console.log(notification);
    });
    res.json('Notification mark read');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
