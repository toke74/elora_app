import React, {Fragment, useEffect} from 'react';
import Navbar from '../../features/nav/Navbar/Navbar';
import {Switch, Route} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Login from '../../features/auth/Login';
import Register from '../../features/auth/Register';
import PostDashboard from '../../features/post/PostDashboard/PostDashboard';
import setAuthToken from '../common/util/setAuthToken';
import {loadUser} from '../../features/auth/authActions';
import store from '../store/store';
import PostForm from '../../features/post/PostForm/PostForm';
import ModalManager from '../modals/ModalManager';
import PostDetailedPage
  from '../../features/post/PostDetailed/PostDetailedPage';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';

if (localStorage.token) {
  setAuthToken (localStorage.token);
}
function App () {
  useEffect (() => {
    setAuthToken (localStorage.token);
    store.dispatch (loadUser ());
  }, []);

  return (
    <Fragment>
      <ModalManager />
      <Navbar />
      <Container style={{marginTop: 105}}>
        <Switch>
          <Route exact path="/" component={PostDashboard} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/post-form" component={PostForm} />
          <Route exact path="/settings" component={SettingsDashboard} />
          <Route exact path="/post-detail/:id" component={PostDetailedPage} />
        </Switch>
      </Container>
    </Fragment>
  );
}

export default App;
