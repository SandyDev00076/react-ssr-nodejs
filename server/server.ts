const PORT = 3000;

import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import App from "../client/components/App";
import fs from "fs";
import path from "path";

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/", express.static(path.join(__dirname, "static")));

const manifest = fs.readFileSync(
  path.join(__dirname, "static/manifest.json"),
  "utf-8"
);

const assets = JSON.parse(manifest);

app.get("/", (req, res) => {
  const component = ReactDOMServer.renderToString(React.createElement(App));
  res.render("client", { assets, component });
});

app.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}`);
});
