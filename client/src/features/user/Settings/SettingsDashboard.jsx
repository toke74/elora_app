import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StickyBox from 'react-sticky-box';
import { HashRouter } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';

//MUI stuff
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';

//local stuff
import SettingsNavbar from './SettingsNavbar';
import BasicPage from './BasicPage';
import AboutPage from './AboutPage';
import AccountPage from './AccountPage';
import ProfilePhotos from './Photos/ProfilePhotos';
import { getUserProfileById, createProfile } from '../userActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    width: '80%',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'center',
  },
  mainBody: {
    [theme.breakpoints.down('sm')]: {
      order: 12,
      display: 'flex',
      justifyContent: 'center',
    },
  },
  sideBar: {
    [theme.breakpoints.down('sm')]: {
      order: 1,
      display: 'flex',
      justifyContent: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: '30px',
    },
  },
  dashboard: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
  },
}));

const SettingsDashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { initialValues } = useSelector((state) => {
    let profiles = {};
    if (state.profiles) {
      profiles = state.profiles.profile;
    }
    if (profiles) {
      profiles.firstName = profiles.user.firstName;
      profiles.lastName = profiles.user.lastName;
    }
    return {
      initialValues: profiles,
    };
  });

  const userId = user && user._id;
  useEffect(
    () => {
      dispatch(getUserProfileById(userId));
    },
    [dispatch, userId]
  );

  console.log(initialValues);
  console.log(user);
  return (
    <HashRouter>
      <Container className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={1} sm={2} md={1} />
          <Grid className={classes.mainBody} item md={6} sm={10} xs={11}>
            <div className={classes.dashboard}>
              <p
                style={{
                  textAlign: 'center',
                  // color: '#2bbbff',
                }}
              >
                Edit your profile to get the most out of this site
              </p>
              <Switch>
                {/* <Redirect exact from="/settings" to="/settings/basic" /> */}
                <Route
                  path="/settings/basic"
                  render={() => (
                    <BasicPage
                      initialValues={initialValues}
                      createProfile={createProfile}
                    />
                  )}
                />
                <Route
                  path="/settings/about"
                  render={() => (
                    <AboutPage
                      initialValues={initialValues}
                      createProfile={createProfile}
                    />
                  )}
                />
                <Route path="/settings/photo" component={ProfilePhotos} />
                <Route exact path="/settings/account">
                  <AccountPage />
                </Route>
              </Switch>
            </div>
          </Grid>
          <Grid className={classes.sideBar} item md={4} sm={10} xs={11}>
            <StickyBox offsetTop={80} offsetBottom={40}>
              <SettingsNavbar />
            </StickyBox>
          </Grid>
          <Grid item xs={1} sm={2} md={1} />
        </Grid>
      </Container>
    </HashRouter>
  );
};

export default SettingsDashboard;
