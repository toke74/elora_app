import React, { Fragment, useEffect } from 'react';
import Navbar from '../../features/nav/Navbar/Navbar';
import { Switch, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import setAuthToken from '../common/util/setAuthToken';
import { loadUser } from '../../features/auth/authActions';
import store from '../store/store';
import ModalManager from '../modals/ModalManager';
import Routes from '../routing/Routes';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Fragment>
      <ModalManager />
      <Navbar />
      <Container style={{ marginTop: 105 }}>
        <Switch>
          <Switch>
            <Route component={Routes} />
          </Switch>
        </Switch>
      </Container>
    </Fragment>
  );
}

export default App;
