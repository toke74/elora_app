import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import moment from 'moment';

//MUI stuff
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Button from '@material-ui/core/Button';

//Local stuff
import { followUser, unfollowUser } from '../userActions';
import { CardContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  profileCard: {
    width: '90%',
    height: '150px',
    marginBottom: theme.spacing(2),
    boxShadow:
      '0px 0px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 0px rgba(0,0,0,0.14), 0px 0px 3px 0px rgba(0,0,0,0.12)',
    marginLeft: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      width: '90%',
      marginLeft: theme.spacing(2),
    },
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  userName: {
    color: '#2bbbff',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontFamily: 'Times New Roman',
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      fontSize: '0.9rem',
    },
  },
  joinDate: {
    color: '#b3bbc3',
    fontSize: '0.9rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.75rem',
    },
  },
  profileBtn: {
    marginTop: theme.spacing(4),
    marginRight: theme.spacing(2),
    textTransform: 'capitalize',
    borderRadius: '25px',
  },
  follow: {
    textDecoration: 'none',
    color: '#7f8e9a',
    fontSize: '0.9rem',
    marginLeft: theme.spacing(1),
  },
}));

export default function ListOfUserProfiles({ profile, user }) {
  const classes = useStyles();
  const isCurrentUser =
    user && profile && profile.user && user._id === profile.user._id;

  let isFollowers = false;
  const dispatch = useDispatch();
  let history = useHistory();

  profile &&
    user &&
    profile.followers.map((follower) => {
      if (follower._id === user._id) {
        isFollowers = true;
      }
      return null;
    });

  const profilesBtn = (profileUser) =>
    isCurrentUser ? (
      <Button
        variant="contained"
        color="primary"
        className={classes.profileBtn}
      >
        Set up profile
      </Button>
    ) : !isFollowers ? (
      <Button
        onClick={
          user ? (
            () => dispatch(followUser(profileUser._id))
          ) : (
            () => history.push('/login')
          )
        }
        variant="contained"
        color="primary"
        className={classes.profileBtn}
      >
        Follow
      </Button>
    ) : (
      <Button
        onClick={() => dispatch(unfollowUser(profileUser._id))}
        variant="contained"
        color="primary"
        className={classes.profileBtn}
      >
        Unfollow
      </Button>
    );

  const name = (profileUser) => (
    <Fragment>
      <Link className={classes.userName} to={`/profile/${profileUser._id}`}>
        {' '}
        {profileUser.firstName} {profileUser.lastName}
      </Link>{' '}
    </Fragment>
  );

  console.log(profile);

  const joinDate = (profileUser) => (
    <span className={classes.joinDate}>
      Member Since: {moment(profileUser.createdAt).format('DD MMM YYYY')}
    </span>
  );

  //   <div className={classes.btn}>Following</div>

  return (
    <Card className={classes.profileCard}>
      <CardHeader
        avatar={
          <Avatar
            component={Link}
            to={`/profile/${profile.user._id}`}
            alt="user profile"
            src={profile.user.avatar || '/assets/user.png'}
            className={classes.avatar}
          />
        }
        action={profilesBtn(profile.user)}
        title={name(profile.user)}
        subheader={joinDate(profile.user)}
      />
      <CardContent>
        <Link className={classes.follow} to={`/following/${profile.user._id}`}>
          {' '}
          {profile.following.length} Following{' '}
        </Link>
        <Link className={classes.follow} to={`/followers/${profile.user._id}`}>
          {' '}
          {profile.followers.length} Followers
        </Link>
      </CardContent>
    </Card>
  );
}
