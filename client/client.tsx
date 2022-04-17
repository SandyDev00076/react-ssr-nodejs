import React from "react";
import ReactDOM from "react-dom";
import App from "../app/components/App";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.hydrate(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
