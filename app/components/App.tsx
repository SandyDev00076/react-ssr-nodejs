import React from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../routes";
import NoMatch from "./NoMatch";

const App = () => {
  return (
    <Switch>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          exact
          component={route.component}
        />
      ))}
      <Route path="*" component={NoMatch} />
    </Switch>
  );
};

export default App;
