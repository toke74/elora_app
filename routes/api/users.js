const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const isAuth = require('../../middleware/isAuth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
// const api_key = config.get('api_key');

// @route    POST api/users
// @desc     Register User
// @access   Public
router.post(
  '/',
  [
    check('firstName', 'First Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName, email, password } = req.body;

    try {
      /* Steps to complete here
      1.see if user exist
      2.Get user gravatar
      3.Encript password
      4.Return jsonwebtoken */

      /*1.See if user exist*/
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      /*2.Get user gravatar */
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new User({
        firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
        lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
        email,
        avatar,
        password,
      });

      /*3.Encript password */
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //then save the user in database
      await user.save();
      console.log(user);
      /*
     4.Return jsonwebtoken
      */
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      const profileFields = {
        firstName: user.firstName,
        lastName: user.lastName,
      };

      await Profile.findOneAndUpdate(
        { user: user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/users/change-password
// @desc     Change  User Password
// @access   Private
router.post(
  '/change-password',
  [
    isAuth,
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { password } = req.body;

    try {
      /*See if user exist*/
      let user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ errors: [{ msg: 'User not found ' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Please enter another password' }] });
      }

      /*Encript password */
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //then save the user in database
      await user.save();
      console.log(user);

      res.json({ msg: 'Password successfully changed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/users/forgot-password
// @desc     Change  User Password
// @access   Private
router.post('/forgot-password', async (req, res) => {
  try {
    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        console.log(err);
      }

      const token = buffer.toString('hex');
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res
          .status(422)
          .json({ error: 'User dont exists with that email' });
      }

      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      await user.save();

      transporter.sendMail({
        to: user.email,
        from: 'no-replay@insta.com',
        subject: 'password reset',
        html: `
                     <p>You requested for password reset</p>
                     <h5>click in this <a href="http://localhost:5000/users/forgot-password/${token}">link</a> to reset password</h5>
                     `,
      });
      res.json({ message: 'check your email' });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/users/img
// @desc     Update user avatar
// @access   Private
router.post('/img', isAuth, async (req, res) => {
  try {
    let profileImage = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        avatar: req.body.avatar,
        $push: {
          image: req.body.avatar,
        },
      },
      { new: true }
    );

    res.json(profileImage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/users/update
// @desc     Update main profile photo
// @access   Private
router.post('/main', isAuth, async (req, res) => {
  try {
    let profileImage = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        avatar: req.body.avatar,
      },
      { new: true }
    );

    res.json(profileImage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/users
// @desc     Update user avatar
// @access   Private
router.put('/', isAuth, async (req, res) => {
  try {
    let profileImage = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $pull: {
          image: req.body.avatar,
        },
      },
      { new: true }
    );

    res.json(profileImage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
