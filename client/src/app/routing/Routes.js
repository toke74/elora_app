import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PostDashboard from '../../features/post/PostDashboard/PostDashboard';
import PostDetailedPage from '../../features/post/PostDetailed/PostDetailedPage';
import Register from '../../features/auth/Register';
import Login from '../../features/auth/Login';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import ProfilePage from '../../features/user/Profile/ProfilePage';
import FollowingPage from '../../features/user/Profile/FollowingPage';
import FollowersPage from '../../features/user/Profile/FollowersPage';
import ProfilesDashboard from '../../features/user/Profiles/ProfilesDashboard';
import ResetPassword from '../../features/auth/ResetPassword';
import NewPassword from '../../features/auth/NewPassword';

const Routes = (props) => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot-password" component={ResetPassword} />
        <Route exact path="/forgot-password/:token" component={NewPassword} />
        <Route exact path="/" component={PostDashboard} />
        <Route exact path="/post-detail/:id" component={PostDetailedPage} />
        <Route exact path="/profile/:id" component={ProfilePage} />
        <Route exact path="/profiles" component={ProfilesDashboard} />
        <PrivateRoute path="/settings" component={SettingsDashboard} />
        <Route exact path="/following/:id" component={FollowingPage} />
        <Route exact path="/followers/:id" component={FollowersPage} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
