import React from "react";
import AnotherPage from "./components/AnotherPage";
import FirstPage from "./components/FirstPage";

interface Route {
  path: string;
  component: React.ComponentType;
  fetchInitialData?: (p: string) => Promise<any>;
}

const routes: Route[] = [
  {
    path: "/",
    component: FirstPage,
  },
  {
    path: "/another",
    component: AnotherPage,
  },
];

export default routes;
