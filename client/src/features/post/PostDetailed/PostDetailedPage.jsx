import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StickyBox from 'react-sticky-box';
import { useParams } from 'react-router-dom';
//MUI stuff
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

//local stuff
import Spinner from '../../../app/layout/Spinner';
import PostDetailedInfo from './PostDetailedInfo';
import PostDetailedHeader from './PostDetailedHeader';
import PostDetailedComment from './PostDetailedComment';
import { getPost, createComment, deleteComment } from '../postActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  sideBar: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const PostDetailedPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(
    () => {
      dispatch(getPost(id));
    },
    [dispatch, id]
  );

  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.auth.user);

  const { post, loading } = posts;
  const likes = post && post.like;

  let disliked = false;
  let liked = false;

  likes &&
    user &&
    post &&
    likes.map((like) => {
      if (
        user._id === like.user &&
        like.like === true &&
        like.postId === post._id
      ) {
        liked = true;
      }
      if (
        user._id === like.user &&
        like.dislike === true &&
        like.postId === post._id
      ) {
        disliked = true;
      }
      return null;
    });

  return loading || post === null ? (
    <Spinner />
  ) : (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={1} md={1} />
        <Grid item xs={10} md={6}>
          {/* <PostDetailedHeader /> */}
          <PostDetailedInfo
            post={post}
            comments={post.comments}
            disliked={disliked}
            liked={liked}
            user={user}
            dispatch={dispatch}
          />
          <PostDetailedComment
            comments={post.comments}
            post={post}
            user={user}
            createComment={createComment}
            deleteComment={deleteComment}
            dispatch={dispatch}
          />
        </Grid>
        <Grid className={classes.sideBar} item md={4}>
          <StickyBox offsetTop={80} offsetBottom={40}>
            <Paper className={classes.paper}>
              For if we go on sinning deliberately after receiving the knowledge
              of the truth, there no longer remains a sacrifice for sins, but a
              fearful expectation of judgment, and a fury of fire that will
              consume the adversaries. Anyone who has set aside the law of Moses
              dies without mercy on the evidence of two or three witnesses. How
              much worse punishment, do you think, will be deserved by the one
              who has spurned the Son of God, and has profaned the blood of the
              covenant by which he was sanctified, and has outraged the Spirit
              of grace? For we know him who said, “Vengeance is mine; I will
              repay.” And again, “The Lord will judge his people.” ...
            </Paper>
          </StickyBox>
        </Grid>
        <Grid item xs={1} md={1} />
      </Grid>
    </div>
  );
};
export default PostDetailedPage;
