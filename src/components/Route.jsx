import React from "react";
import { Switch, Route } from "react-router-dom";

//Pages
import Home from "../pages/Home";
import Page from "../pages/Page";
import Login from "../pages/Login";

import NotFound from "../pages/NotFound";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Page} />
    <Route exact path="/login" component={Login} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
