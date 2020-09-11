import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/styles';

//Local stuff
import './index.css';
import App from './app/layout/App.jsx';
import store from './app/store/store';
import theme from './app/common/util/theme';
import ScrollToTop from './app/common/util/ScrollToTop';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <App />
      </Router>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
