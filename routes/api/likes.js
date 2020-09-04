const express = require ('express');
const router = express.Router ();
const isAuth = require ('../../middleware/isAuth');
const checkObjectId = require ('../../middleware/checkObjectId');
const Post = require ('../../models/Post');
const Notification = require ('../../models/Notification');
const Like = require ('../../models/Like');

// @route    PUT api/likes/like/:id
// @desc     Like a post
// @access   Private
router.put ('/like/:id', [isAuth, checkObjectId ('id')], async (req, res) => {
  try {
    const post = await Post.findById (req.params.id);

    //it was liked then remove the like
    const removeLike = await Like.findOne ({
      postId: req.params.id,
      user: req.user.id,
      like: true,
      dislike: false,
    });
    if (removeLike) {
      removeLike.remove ();
      const updatedPost = await Post.findOneAndUpdate (
        {_id: req.params.id},
        {likeCount: post.likeCount - 1},
        {new: true}
      );
      updatedPost.like.pull (removeLike);
      await updatedPost.save ();

      await Notification.findOneAndRemove ({
        postId: req.params.id,
        recipient: post.user.toString (),
        sender: req.user.id,
        type: 'like',
      });
      return res.json (removeLike);
    }

    //it was disliked then like it again
    const dislikeToLike = await Like.findOneAndUpdate (
      {
        postId: req.params.id,
        user: req.user.id,
        like: false,
        dislike: true,
      },
      {$set: {like: true, dislike: false}},
      {new: true}
    );

    if (dislikeToLike) {
      const updatedPost = await Post.findOneAndUpdate (
        {_id: req.params.id},
        {
          likeCount: post.likeCount + 1,
          dislikeCount: post.dislikeCount - 1,
        }
      );

      updatedPost.like.push (dislikeToLike);
      await updatedPost.save ();

      //add  like to notification
      if (!(post.user.toString () === req.user.id)) {
        const newNotification = new Notification ({
          postId: req.params.id,
          recipient: post.user.toString (),
          sender: req.user.id,
          type: 'like',
        });
        await newNotification.save ();
      }

      //remove the dislike from notification
      await Notification.findOneAndRemove ({
        postId: req.params.id,
        recipient: post.user.toString (),
        sender: req.user.id,
        type: 'dislike',
      });

      return res.json (dislikeToLike);
    }

    //was not liked or dislike but liked now
    const like = await Like.findOneAndUpdate (
      {
        postId: req.params.id,
        user: req.user.id,
        like: false,
        dislike: false,
      },
      {$set: {like: true, dislike: false}},
      {new: true, upsert: true}
    );
    if (like) {
      const updatedPost = await Post.findOneAndUpdate (
        {_id: req.params.id},
        {
          likeCount: post.likeCount + 1,
        }
      );

      updatedPost.like.push (like);
      await updatedPost.save ();

      //create Notification On Like
      if (!(post.user.toString () === req.user.id)) {
        const newNotification = new Notification ({
          postId: req.params.id,
          recipient: post.user.toString (),
          sender: req.user.id,
          type: 'like',
        });
        await newNotification.save ();
      }
      return res.json (like);
    }
  } catch (err) {
    console.error (err.message);
    res.status (500).send ('Server Error');
  }
});

// @route    PUT api/likes/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put (
  '/dislike/:id',
  [isAuth, checkObjectId ('id')],
  async (req, res) => {
    try {
      const post = await Post.findById (req.params.id);

      //it was disliked then remove the dislike
      const removeDislike = await Like.findOne ({
        postId: req.params.id,
        user: req.user.id,
        like: false,
        dislike: true,
      });
      if (removeDislike) {
        removeDislike.remove ();

        const updatedPost = await Post.findOneAndUpdate (
          {_id: req.params.id},
          {
            dislikeCount: post.dislikeCount - 1,
          }
        );
        updatedPost.like.pull (removeDislike);
        await updatedPost.save ();

        await Notification.findOneAndRemove ({
          postId: req.params.id,
          recipient: post.user.toString (),
          sender: req.user.id,
          type: 'dislike',
        });

        return res.json (removeDislike);
      }

      //it was liked then dislike it again
      const likeToDislike = await Like.findOneAndUpdate (
        {
          postId: req.params.id,
          user: req.user.id,
          like: true,
          dislike: false,
        },
        {$set: {like: false, dislike: true}},
        {new: true}
      );

      if (likeToDislike) {
        const updatedPost = await Post.findOneAndUpdate (
          {_id: req.params.id},
          {
            likeCount: post.likeCount - 1,
            dislikeCount: post.dislikeCount + 1,
          }
        );

        updatedPost.like.push (likeToDislike);
        await updatedPost.save ();

        //add disline to notification
        if (!(post.user.toString () === req.user.id)) {
          const newNotification = new Notification ({
            postId: req.params.id,
            recipient: post.user.toString (),
            sender: req.user.id,
            type: 'dislike',
          });
          await newNotification.save ();
        }

        //remove the like from notification
        await Notification.findOneAndRemove ({
          postId: req.params.id,
          recipient: post.user.toString (),
          sender: req.user.id,
          type: 'like',
        });

        return res.json (likeToDislike);
      }

      //was not liked or dislike but disliked it now
      const dislike = await Like.findOneAndUpdate (
        {
          postId: req.params.id,
          user: req.user.id,
          like: false,
          dislike: false,
        },
        {$set: {like: false, dislike: true}},
        {new: true, upsert: true}
      );
      if (dislike) {
        const updatedPost = await Post.findOneAndUpdate (
          {_id: req.params.id},
          {
            dislikeCount: post.dislikeCount + 1,
          }
        );

        updatedPost.like.push (dislike);
        await updatedPost.save ();

        //create Notification On Like
        if (!(post.user.toString () === req.user.id)) {
          const newNotification = new Notification ({
            postId: req.params.id,
            recipient: post.user.toString (),
            sender: req.user.id,
            type: 'dislike',
          });
          await newNotification.save ();
        }
        return res.json (dislike);
      }
    } catch (err) {
      console.error (err.message);
      res.status (500).send ('Server Error');
    }
  }
);

module.exports = router;
