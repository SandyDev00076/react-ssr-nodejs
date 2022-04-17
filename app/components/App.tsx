import React from "react";
import { Route } from "react-router-dom";
import routes from "../routes";
import NoMatch from "./NoMatch";

const App = () => {
  return (
    <>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} component={route.component} />
      ))}
      <Route path="*" component={NoMatch} />
    </>
  );
};

export default App;
