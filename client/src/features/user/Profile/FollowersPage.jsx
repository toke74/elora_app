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
import { getUserProfileById } from '../userActions';
import Followers from './ProfileTab/Followers';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  following: {
    boxShadow:
      '0px 0px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 0px rgba(0,0,0,0.14), 0px 0px 3px 0px rgba(0,0,0,0.12)',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    width: '100%',
  },
  sideBar: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));
const FollowersPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { profiles, loading } = useSelector((state) => state.profiles);
  const user = useSelector((state) => state.auth.user);

  let { id } = useParams();
  const paramsId = id;
  const isCurrentUser = user && user._id === paramsId;

  useEffect(
    () => {
      dispatch(getUserProfileById(id));
    },
    [dispatch, id]
  );

  return loading || profiles === null ? (
    <Spinner />
  ) : (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={1} md={1} />
        <Grid item xs={10} md={6}>
          <Paper className={classes.following}>
            <Followers isCurrentUser={isCurrentUser} />
          </Paper>
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

export default FollowersPage;
