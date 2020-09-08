import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//MUI stuff
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

//local stuff
import PostDetaiedCommentForm from './PostDetaiedCommentForm';
import { createDataTree } from '../../../app/common/util/helper';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    boxShadow:
      '0px 0px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 0px rgba(0,0,0,0.14), 0px 0px 3px 0px rgba(0,0,0,0.12)',
  },

  headerContent: {
    paddingBottom: 5,
  },
  title: {
    textAlign: 'center',
    backgroundColor: '#2bbbff',
    // backgroundColor: '#00bcd4',
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    color: '#fff',
  },
  contentWrapper: {
    paddingBottom: 0,
    paddingTop: 0,
  },
  body: {
    paddingTop: 0,
    marginLeft: '57px',
    paddingBottom: 0,
    fontSize: '0.86rem',
  },
  replyAction: {
    marginLeft: theme.spacing(6),
    paddingTop: 0,
  },
  replyBtn: {
    color: '#c5c5c5',
    textTransform: 'capitalize',
  },
  replyContent: {
    marginLeft: theme.spacing(3),
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const PostDetailedComment = ({
  post,
  user,
  comments,
  createComment,
  deleteComment,
  dispatch,
}) => {
  const classes = useStyles();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);

  let commentTree = comments && createDataTree(comments);

  const handleOpenReplyForm = (id) => () => {
    setShowReplyForm(true);
    setSelectedChatId(id);
  };

  const handleCloseReplyForm = () => {
    setShowReplyForm(false);
    setSelectedChatId(null);
  };

  dayjs.extend(relativeTime);
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          Comment on this Post{' '}
        </Typography>
        <Typography style={{ marginLeft: 10 }}>
          {comments && comments.length} Comments
        </Typography>
        <Divider />
      </CardContent>
      {commentTree &&
        commentTree.map((comment) => (
          <CardContent key={comment._id} className={classes.contentWrapper}>
            <CardHeader
              avatar={
                <Avatar
                  component={Link}
                  to={`/profile/${post.user._id}`}
                  alt="user img"
                  src={comment.user.avatar || '/assets/user.png'}
                />
              }
              title={` ${comment.user.firstName} ${comment.user.lastName}`}
              subheader={`. ${dayjs(comment.date).fromNow()}`}
              className={classes.headerContent}
            />
            <CardContent className={classes.body}>{comment.text}</CardContent>
            <CardActions className={classes.replyAction}>
              <Button
                onClick={handleOpenReplyForm(comment._id)}
                className={classes.replyBtn}
                size="small"
              >
                Reply
              </Button>
              {user &&
              user._id === comment.user._id && (
                <Button
                  onClick={() => dispatch(deleteComment(comment._id, post._id))}
                  style={{ textTransform: 'capitalize' }}
                  color="secondary"
                >
                  Delete
                </Button>
              )}
            </CardActions>
            {showReplyForm &&
            selectedChatId === comment._id && (
              <PostDetaiedCommentForm
                form={`reply_${comment._id}`}
                closeForm={handleCloseReplyForm}
                parentId={comment._id}
                createComment={createComment}
                postId={post._id}
                dispatch={dispatch}
                width="80%"
                left="35px"
              />
            )}
            {comment.children &&
              comment.children.map((firstChild) => (
                <CardContent
                  key={firstChild._id}
                  style={{ paddingBottom: 0, marginBottom: 0 }}
                  className={classes.replyContent}
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        component={Link}
                        to={`/profile/${post.user._id}`}
                        alt="user img"
                        src={firstChild.user.avatar || '/assets/user.png'}
                      />
                    }
                    title={` ${firstChild.user.firstName} ${firstChild.user
                      .lastName}`}
                    subheader={`. ${dayjs(firstChild.date).fromNow()}`}
                    className={classes.headerContent}
                  />
                  <CardContent className={classes.body}>
                    {firstChild.text}
                  </CardContent>
                  <CardActions className={classes.replyAction}>
                    <Button
                      onClick={handleOpenReplyForm(firstChild._id)}
                      className={classes.replyBtn}
                      size="small"
                    >
                      Reply
                    </Button>
                    {user &&
                    user._id === firstChild.user._id && (
                      <Button
                        onClick={() =>
                          dispatch(deleteComment(firstChild._id, post._id))}
                        style={{ textTransform: 'capitalize' }}
                        color="secondary"
                      >
                        Delete
                      </Button>
                    )}
                  </CardActions>
                  {showReplyForm &&
                  selectedChatId === firstChild._id && (
                    <PostDetaiedCommentForm
                      form={`reply_${firstChild._id}`}
                      closeForm={handleCloseReplyForm}
                      parentId={firstChild._id}
                      createComment={createComment}
                      postId={post._id}
                      dispatch={dispatch}
                      width="80%"
                      left="35px"
                    />
                  )}
                  {firstChild.children &&
                    firstChild.children.map((secondChild) => (
                      <CardContent
                        key={secondChild._id}
                        style={{ paddingBottom: 0 }}
                        className={classes.replyContent}
                      >
                        <CardHeader
                          avatar={
                            <Avatar
                              component={Link}
                              to={`/profile/${post.user._id}`}
                              alt="user img"
                              src={
                                secondChild.user.avatar || '/assets/user.png'
                              }
                            />
                          }
                          title={` ${secondChild.user.firstName} ${secondChild
                            .user.lastName}`}
                          subheader={`. ${dayjs(secondChild.date).fromNow()}`}
                          className={classes.headerContent}
                        />
                        <CardContent className={classes.body}>
                          {secondChild.text}
                        </CardContent>
                        <CardActions className={classes.replyAction}>
                          {user &&
                          user._id === secondChild.user._id && (
                            <Button
                              onClick={() =>
                                dispatch(
                                  deleteComment(secondChild._id, post._id)
                                )}
                              style={{ textTransform: 'capitalize' }}
                              color="secondary"
                            >
                              Delete
                            </Button>
                          )}
                        </CardActions>
                      </CardContent>
                    ))}
                </CardContent>
              ))}
          </CardContent>
        ))}
      <PostDetaiedCommentForm
        createComment={createComment}
        postId={post._id}
        form={'newComment'}
        parentId={0}
        dispatch={dispatch}
      />
    </Card>
  );
};

export default PostDetailedComment;
