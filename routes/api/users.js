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

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: config.get('api_key'),
    },
  })
);

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

      // transporter.sendMail({
      //   to: user.email,
      //   from: 'shalompc74@gmail.com',
      //   subject: 'signup success',
      //   html: '<h1>welcome to instagram</h1>',
      // });

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
          .json({ error: "User don't exists with that email" });
      }

      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      await user.save();

      const message = ` <h4> Hi ${user.firstName} ${user.lastName}</h4>
      <p>
        You recently requested to reset your password for your Elora app
        account, Click the Link below to reset it,
      </p>
      <p>
      <a href="${config.get(
        'email_reset_link'
      )}/forgot-password/${token}"> Reset Password Link</a></p>
      <p>
        
        If you did not requested a pssword reset, please ignore this email or
        reply to let us know. This password reset is only valid for the next 60
        minutes.
      </p>

      <p> Thanks,<br/>
       Elora App Team</p>

      <p>
        P.S. We also love hearing from you and helping you with any issues you
        have. Please reply to this email if you want to ask a question.
      </p>

      <p>
        If you are having trouble clicking the password reset Link , copy and
        paste the URL below into your web browser.
        
      </p>
      <p>${config.get('email_reset_link')}/forgot-password/${token}</p>
      `;

      transporter.sendMail({
        to: user.email,
        from: 'shalompc74@gmail.com',
        subject: 'Password reset',
        html: message,
      });
      res.json({ message: 'check your email' });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/users/change-password
// @desc     Change  User Password
// @access   Private
router.post('/new-password', async (req, res) => {
  const password = req.body.password;
  const sentToke = req.body.token;

  try {
    /*See if user exist*/
    let user = await User.findOne({
      resetToken: sentToke,
      expireToken: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(404).json({
        errors: [{ msg: 'Try again session expired' }],
      });
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
    user.resetToken = undefined;
    user.expireToken = undefined;
    //then save the user in database
    await user.save();
    console.log(user);
    res.json({ msg: 'Password successfully changed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
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
