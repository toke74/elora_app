import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import App from './app/layout/App.jsx';
import * as serviceWorker from './serviceWorker';
import store from './app/store/store';
import {ThemeProvider} from '@material-ui/styles';
import theme from './app/common/util/theme';

ReactDOM.render (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ThemeProvider>,
  document.getElementById ('root')
);

serviceWorker.unregister ();
