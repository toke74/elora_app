import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PostDashboard from '../../features/post/PostDashboard/PostDashboard';
import PostDetailedPage from '../../features/post/PostDetailed/PostDetailedPage';
import Register from '../../features/auth/Register';
import Login from '../../features/auth/Login';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';

const Routes = (props) => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={PostDashboard} />
        <Route exact path="/post-detail/:id" component={PostDetailedPage} />
        <PrivateRoute path="/settings" component={SettingsDashboard} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
