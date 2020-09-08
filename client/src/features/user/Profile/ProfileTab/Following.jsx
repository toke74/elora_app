import React, { useEffect, Fragment } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

//MUI stuff
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

//Local stuff
import { getUserProfileById } from '../../userActions';
import Spinner from '../../../../app/layout/Spinner';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  noFollowingWrapper: {
    textAlign: 'center',
    boxShadow:
      '0px 0px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 0px rgba(0,0,0,0.14), 0px 0px 3px 0px rgba(0,0,0,0.12)',
    width: '90%',
    marginLeft: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      width: '90%',
      marginLeft: theme.spacing(2),
    },
  },
  noFollowingTitle: {
    fontSize: '1.2rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
    },
  },
  noFollowingSubheader: {
    fontSize: '1rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.9rem',
    },
  },
  followingCard: {
    width: '90%',
    height: '100px',
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
  btn: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(2),
    textTransform: 'capitalize',
    fontSize: '0.8rem',
    backgroundColor: '#2bbbff',
    color: '#fff',
    padding: theme.spacing(1, 2),
    borderRadius: '25px',
  },
}));

const Following = ({ isCurrentUser }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let { id } = useParams();

  const { profile, loading } = useSelector((state) => state.profiles);
  const { user } = useSelector((state) => state.auth);

  const paramsId = id;
  const isCurrentUser1 = user && user._id === paramsId;

  useEffect(
    () => {
      dispatch(getUserProfileById(paramsId));
    },
    [dispatch, paramsId]
  );

  const title = (str) => <div className={classes.noFollowingTitle}>{str}</div>;
  const subheader = (subheader) => (
    <div className={classes.noFollowingSubheader}>{subheader}</div>
  );

  const name = (following) => (
    <Fragment>
      <Link className={classes.userName} to={`/profile/${following._id}`}>
        {' '}
        {following.firstName} {following.lastName}
      </Link>{' '}
    </Fragment>
  );
  const joinDate = () => (
    <span className={classes.joinDate} style={{}}>
      Jion Since: {moment(profile.user.createdAt).format('DD MMM YYYY')}
    </span>
  );

  return loading || profile === null ? (
    <Spinner />
  ) : (
    <div>
      <h3 style={{ textAlign: 'center' }}>
        {profile.user.firstName} {profile.user.lastName} Followings
      </h3>
      {profile.following.length === 0 ? isCurrentUser || isCurrentUser1 ? (
        <Card className={classes.noFollowingWrapper}>
          <CardHeader
            title={title('You don’t have any following yet')}
            subheader={subheader(
              'When you follow someone, you’ll see them here'
            )}
          />
        </Card>
      ) : (
        <Card className={classes.noFollowingWrapper}>
          <CardHeader
            title={title('This user don’t have any following yet')}
            subheader={subheader(
              'When a user follow someone, you’ll see them here'
            )}
          />
        </Card>
      ) : (
        profile &&
        profile.following.map((following, index) => (
          <Card key={index} className={classes.followingCard}>
            <CardHeader
              avatar={
                <Avatar
                  component={Link}
                  to={`/profile/${following._id}`}
                  alt="user profile"
                  src={following.avatar || '/assets/user.png'}
                  className={classes.avatar}
                />
              }
              action={<div className={classes.btn}>Following</div>}
              title={name(following)}
              subheader={joinDate()}
            />
          </Card>
        ))
      )}
    </div>
  );
};

export default Following;
