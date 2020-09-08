import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

//MUI stuff
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DateRangeIcon from '@material-ui/icons/DateRange';

//local stuff
import ProfileTab from './ProfileTab/ProfileTab';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
  },
  profileInfo: {
    marginLeft: 20,
  },
  userName: {
    color: '#2bbbff',
    fontSize: '1.1rem',
  },
  joinDate: {
    marginTop: 16,
    color: '#7f8e9a',
    fontSize: '0.98rem',
    marginBottom: 16,
  },
  following: {
    fontSize: '1rem',
    textDecoration: 'none',
    color: '#7f8e9a',
    marginRight: 12,
  },
}));

const ProfileInfo = ({ profile, paramsId, user }) => {
  const classes = useStyles();
  const isCurrentUser = user && user._id === paramsId;

  return (
    <Paper className={classes.root}>
      <div className={classes.profileInfo}>
        <div className={classes.userName}>
          {profile.user.firstName} {profile.user.lastName}
        </div>
        <div className={classes.joinDate}>
          <DateRangeIcon style={{ fontSize: '0.96rem' }} />
          <span style={{ marginRight: '10px', marginLeft: '10px' }}>
            Joined
          </span>

          {profile.user.createdAt &&
            moment(profile.user.createdAt).format('MMMM YYYY')}
        </div>
        <div>
          <Link
            className={classes.following}
            to={`/following/${profile.user._id}`}
          >
            {' '}
            {profile.following.length} Following{' '}
          </Link>
          <Link
            className={classes.following}
            to={`/followers/${profile.user._id}`}
          >
            {' '}
            {profile.followers.length} Followers
          </Link>
        </div>
      </div>
      <ProfileTab profile={profile} isCurrentUser={isCurrentUser} />
    </Paper>
  );
};

export default ProfileInfo;
