const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const isAuth = require('../../middleware/isAuth');
const checkObjectId = require('../../middleware/checkObjectId');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Comment = require('../../models/Comment');
const Notification = require('../../models/Notification');
const Like = require('../../models/Like');

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  '/',
  [isAuth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const newPost = new Post({
        text: req.body.text,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Public
router.get('/post', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ date: -1 })
      .populate('like', ['user', 'postId', 'like', 'dislike'])
      .populate('comments')
      .populate('user', ['firstName', 'lastName', 'avatar']);

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Public
router.get('/:id', checkObjectId('id'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('like', ['user', 'postId', 'like', 'dislike'])
      .populate({ path: 'comments', populate: { path: 'user' } })
      .populate('user', ['firstName', 'lastName', 'avatar']);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    Update api/posts/:id
// @desc     Update a put
// @access   Private
router.put('/:id', [isAuth, checkObjectId('id')], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const updatePost = {
      text: req.body.text,
    };
    let updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updatePost },
      { new: true }
    );
    res.json(updatedPost);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});
// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', [isAuth, checkObjectId('id')], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post deleted successfully' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    GET api/posts/comment/:id
// @desc     Get comment by ID
// @access   Public
router.get('/comment/:id', checkObjectId('id'), async (req, res) => {
  try {
    const comment = await Comment.find({
      post: req.params.id,
    }).populate('user', ['firstName', 'lastName', 'avatar']);

    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    res.json(comment);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  '/comment/:id',
  [
    isAuth,
    checkObjectId('id'),
    [check('text', 'Text is required').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = new Comment({
        text: req.body.text,
        parentId: req.body.parentId,
        user: req.user.id,
        post: req.params.id,
      });

      const savedComment = await newComment.save();

      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            comments: savedComment._id,
          },
        },
        { new: true }
      );

      //create Notification On Comment
      if (!(post.user.toString() === req.user.id)) {
        const newNotification = new Notification({
          postId: post._id,
          recipient: post.user.toString(),
          sender: req.user.id,
          type: 'comment',
          commentId: savedComment._id,
        });
        await newNotification.save();
      }

      res.json({ mgs: 'Comment Created Seccussfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/posts/comment/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:comment_id', isAuth, async (req, res) => {
  try {
    // const post = await Post.findById (req.params.postId);
    const comment = await Comment.findById(req.params.comment_id);

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // const postId = comment.post;
    await comment.remove();

    //delete Notification On delete Comment
    await Notification.deleteOne({
      commentId: req.params.comment_id,
      type: 'comment',
    });

    res.json({ mgs: 'Comment deleted seccussfully' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
