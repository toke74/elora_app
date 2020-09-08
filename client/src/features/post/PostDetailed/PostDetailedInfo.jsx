import React, { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//MUI stuff
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import ShareIcon from '@material-ui/icons/Share';
import Tooltip from '@material-ui/core/Tooltip';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

//local stuff
import { addLike, addDislike, deletePost } from '../postActions';
import { openModal } from '../../../app/modals/modalActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // marginBottom: theme.spacing(3),
    boxShadow:
      '0px 0px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 0px rgba(0,0,0,0.14), 0px 0px 3px 0px rgba(0,0,0,0.12)',
  },

  sideBar: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  userName: {
    color: '#2bbbff',
    // color: '#00bcd4',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontFamily: 'Times New Roman',
    // fontFamily: "'Italianno', cursive",
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      fontSize: '0.9rem',
    },
  },
  cardHeader: {
    paddingBottom: 0,
  },
  cardContent: {
    paddingTop: 10,
    paddingBottom: 0,
  },
  cardAction: {
    display: 'flex',
  },
  cardIcon: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  cardTypo: {
    textDecoration: 'none',
  },
  liked: {
    color: '#0076ff',
    // color: '#00bcd4',
  },
  disliked: {
    color: '#dc3545',
  },
  actionBtns: {
    display: 'flex',
    marginRight: theme.spacing(4),
  },
  editBtn: {
    marginLeft: 'auto',
  },
}));
const PostDetailedInfo = ({
  post,
  liked,
  disliked,
  user,
  comments,
  dispatch,
}) => {
  const classes = useStyles();
  const postId = post && post._id;
  const isOwnerOfData = user && user._id === post.user._id;

  dayjs.extend(relativeTime);
  let history = useHistory();

  const name = (
    <Fragment>
      <Link className={classes.userName} to={`/profile/${post.user._id}`}>
        {' '}
        {post.user.firstName} {post.user.lastName}
      </Link>{' '}
      <span style={{ color: '#b3bbc3', fontSize: '0.84rem' }}>
        . {dayjs(post.date).fromNow()}
      </span>
    </Fragment>
  );
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            component={Link}
            to={`/profile/${post.user._id}`}
            alt="user img"
            src={post.user.avatar || '/assets/user.png'}
          />
        }
        action={
          <IconButton
            component={Link}
            to={`/post-detail/${post._id}`}
            aria-label="settings"
          >
            <Tooltip title="Post Detail" aria-label="detail">
              <MoreVertIcon />
            </Tooltip>
          </IconButton>
        }
        title={name}
        className={classes.cardHeader}
      />
      <CardContent className={classes.cardContent}>
        <Typography
          variant="body2"
          color="textSecondary"
          component={Link}
          to={`/post-detail/${post._id}`}
          className={classes.cardTypo}
        >
          {post.text}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardAction} disableSpacing>
        <span>
          <IconButton
            component={Link}
            to={`/post-detail/${post._id}`}
            aria-label="comment"
          >
            <CommentIcon style={{ fontSize: '1.2rem' }} color="primary" />
          </IconButton>
          <span style={{ fontSize: '0.85rem' }}>
            {comments && comments.length}
          </span>
        </span>

        <span className={classes.cardIcon}>
          <span style={{ marginRight: 5 }}>
            <IconButton
              onClick={() => dispatch(addLike(post._id, history))}
              aria-label="like"
            >
              <ThumbUpIcon
                className={liked ? classes.liked : ''}
                style={{ fontSize: '1.1rem' }}
              />
            </IconButton>
            <span style={{ fontSize: '0.85rem' }}>
              {/* <span style={{ fontSize: '1.1rem', color: '#00bcd4' }}> */}
              {post.likeCount}
            </span>
          </span>

          <span>
            <IconButton
              onClick={() => dispatch(addDislike(post._id, history))}
              aria-label="dislike"
            >
              <ThumbDownIcon
                className={disliked ? classes.disliked : ''}
                style={{ fontSize: '1.1rem' }}
              />
            </IconButton>
            <span style={{ fontSize: '0.85rem' }}>
              {/* <span style={{ fontSize: '1.1rem', color: '#00bcd4' }}> */}
              {post.dislikeCount}
            </span>
          </span>
        </span>

        <IconButton aria-label="share">
          <ShareIcon style={{ fontSize: '1.2rem' }} color="primary" />
        </IconButton>
      </CardActions>
      {isOwnerOfData && (
        <CardActions className={classes.actionBtns}>
          <IconButton
            onClick={() => dispatch(openModal('EditPostModal', { postId }))}
            className={classes.editBtn}
            aria-label="edit"
          >
            <EditIcon style={{ fontSize: '1.2rem' }} color="primary" />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => dispatch(deletePost(post._id))}
            color="secondary"
          >
            <DeleteIcon style={{ fontSize: '1.2rem' }} />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default PostDetailedInfo;
