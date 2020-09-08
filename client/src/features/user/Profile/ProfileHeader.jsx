import React from 'react';
import { useHistory } from 'react-router-dom';

//MUI stuff
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '270px',
    boxShadow: '0 -19px 19px 2px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.down('sm')]: {
      height: '260px',
    },
  },
  coverImg: {
    filter: 'brightness(50%)',
    width: '100%',
    height: '200px',
  },
  avatar: {
    width: theme.spacing(13),
    height: theme.spacing(13),
    position: 'absolute',
    top: '145px',
    left: 15,
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      top: '155px',
    },
  },
  profileBtn: {
    textTransform: 'capitalize',
    marginRight: 20,
    marginTop: 10,
    borderRadius: '25px',
  },
}));

const ProfileHeader = ({
  profile,
  paramsId,
  followUser,
  dispatch,
  user,
  unfollowUser,
}) => {
  const classes = useStyles();
  let history = useHistory();

  const isCurrentUser = user && user._id === paramsId;
  let isFollowers = false;

  
  profile &&
    user &&
    profile.followers.map((follower) => {
      if (follower._id === user._id) {
        isFollowers = true;
      }
      return null;
    });
  return (
    <Paper className={classes.root}>
      <img src="/assets/travel.jpg" alt="img" className={classes.coverImg} />
      <Avatar
        alt="user img"
        src={profile.user.avatar || '/assets/user.png'}
        className={classes.avatar}
      />
      <div style={{ display: 'flex' }}>
        <span style={{ marginRight: 'auto' }} />{' '}
        {isCurrentUser && (
          <Button
            variant="outlined"
            color="primary"
            className={classes.profileBtn}
          >
            Set up profile
          </Button>
        )}
        {!isCurrentUser &&
        !isFollowers && (
          <Button
            onClick={
              user ? (
                () => dispatch(followUser(paramsId))
              ) : (
                () => history.push('/login')
              )
            }
            variant="outlined"
            color="primary"
            className={classes.profileBtn}
          >
            Follow
          </Button>
        )}
        {!isCurrentUser &&
        isFollowers && (
          <Button
            onClick={() => dispatch(unfollowUser(paramsId))}
            variant="outlined"
            color="primary"
            className={classes.profileBtn}
          >
            Unfollow
          </Button>
        )}
      </div>
    </Paper>
  );
};

export default ProfileHeader;
