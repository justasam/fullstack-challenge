import React from "react";
import Home from "./views/Home";
import NoMatch from "./views/NoMatch";
import NavBar from "./components/NavBar";
import { Route, Switch, Redirect } from "react-router-dom";

export const Routes = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact={true} path="/Home" component={Home} />
        <Route exact={true} path="/">
          <Redirect to="/Home" />
        </Route>
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
};
