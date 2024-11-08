import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/dashboard/Dashboard";

import LandingPage from "../pages/Landing/LandingPage";
import Analysis from "../pages/Analysis/Analysis";
import Tracker from "../pages/Tracker/Tracker";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/analysis", element: <Analysis /> },
      { path: "/tracker", element: <Tracker /> },
    ],
  },
]);