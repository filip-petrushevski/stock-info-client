import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import theme from "./theme";
import { ThemeProvider } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

const history = createBrowserHistory();


ReactDOM.render(
  <React.Fragment>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
