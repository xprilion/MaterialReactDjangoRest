import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { history } from './helpers';
import { PrivateRoute } from './components/privateRoute';

import loadable from '@loadable/component';

const HomeComponent = loadable(() => import('./components/home' /* webpackChunkName: "home" */))
const SettingsComponent = loadable(() => import('./components/settings' /* webpackChunkName: "settings" */))
const LoginComponent = loadable(() => import('./components/login' /* webpackChunkName: "login" */))

class App extends React.Component {

  render() {
    return (
      <Router history={history}>
        <div>
          <PrivateRoute exact path="/settings" component={SettingsComponent} />
          <Route path="/login" component={LoginComponent} />
          <Route exact path="/" component={HomeComponent} />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  alert: PropTypes.string
};

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export default connectedApp;
