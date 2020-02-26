import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from './components/404/NotFound.js';
import Login from './pages/login';
import Menu from './pages/menu';
import Navbar from './components/Navbar';

const Router = () => (
  <>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/menu" component={Menu} />
      <Route component={NotFound} />
    </Switch>
  </>
);

export default Router;
