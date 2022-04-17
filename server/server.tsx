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

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/", express.static(path.join(__dirname, "static")));

const manifest = fs.readFileSync(
  path.join(__dirname, "static/manifest.json"),
  "utf-8"
);

const assets = JSON.parse(manifest);

app.get("*", (req, res, next) => {
  const activeRoute = routes.find((route) => route.path === req.url);
  const promiseToSettle =
    activeRoute && activeRoute.fetchInitialData
      ? activeRoute.fetchInitialData(activeRoute.path)
      : Promise.resolve();
  promiseToSettle
    .then((data) => {
      const initialData = serialize(data);
      const component = ReactDOMServer.renderToString(
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
      );
      res.render("client", { assets, component, initialData });
    })
    .catch(next);
});

app.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}`);
});
