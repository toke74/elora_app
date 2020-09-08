import React, { useEffect } from 'react';
import StickyBox from 'react-sticky-box';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//MUI stuff
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ProfileHeader from './ProfileHeader';
import ProfileInfo from './ProfileInfo';

//Local stuff
import { getUserProfileById, followUser, unfollowUser } from '../userActions';
import Spinner from '../../../app/layout/Spinner';

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

const ProfilePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { profile, loading } = useSelector((state) => state.profiles);
  const user = useSelector((state) => state.auth.user);
  let { id } = useParams();

  const paramsId = id;

  useEffect(
    () => {
      dispatch(getUserProfileById(id));
    },
    [dispatch, id]
  );

  return loading || profile === null ? (
    <Spinner />
  ) : (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={1} md={1} />
        <Grid item xs={10} md={6}>
          <ProfileHeader
            profile={profile}
            user={user}
            dispatch={dispatch}
            paramsId={paramsId}
            followUser={followUser}
            unfollowUser={unfollowUser}
          />
          <ProfileInfo profile={profile} user={user} paramsId={paramsId} />
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

export default ProfilePage;
