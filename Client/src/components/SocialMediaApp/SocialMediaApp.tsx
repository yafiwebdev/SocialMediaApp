import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Login, Signup } from '../../Pages/Auth';
import { Feed } from '../../Pages';
import { Topbar } from './components';

const SocialMediaApp = () => {
  return (
    <Router>
      <Topbar />
      <Switch>
        <Route exact path="/">
          <Feed />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </Router>
  );
};

export default SocialMediaApp;
