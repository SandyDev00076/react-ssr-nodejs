const PORT = 3000;

import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import serialize from "serialize-javascript";
import { StaticRouter } from "react-router";

import App from "../app/components/App";

import fs from "fs";
import path from "path";

import routes from "../app/routes";

// Creating the express app
const app = express();

// As we are using ejs for HTML templating, we need to tell express
app.set("view engine", "ejs");
// Location of our ejs views
app.set("views", path.join(__dirname, "views"));

// we need resources from /static
app.use("/", express.static(path.join(__dirname, "static")));

// reading the manifest file generated by webpack-client
// which contains the fileName and its mapped generated file name
const manifest = fs.readFileSync(
  path.join(__dirname, "static/manifest.json"),
  "utf-8"
);

// get all assets from the manifest file
const assets = JSON.parse(manifest);

// On all routes
app.get("*", (req, res, next) => {
  // get the active route out of all routes
  const activeRoute = routes.find((route) => route.path === req.url);

  // get the promise that needs to be settled for getting the data for the route
  const promiseToSettle =
    activeRoute && activeRoute.fetchInitialData
      ? activeRoute.fetchInitialData(activeRoute.path)
      : Promise.resolve();

  promiseToSettle
    .then((data) => {
      // data obtained from the promise the route needs to execute
      // will get attached to window.__INITIAL_DATA__ binding
      const initialData = serialize(data);
      // convert your component tree to string using renderToString method
      const component = ReactDOMServer.renderToString(
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
      );
      // take the client.ejs file and pass it assets, component and initialData
      res.render("client", { assets, component, initialData });
    })
    .catch(next);
});

app.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}`);
});
