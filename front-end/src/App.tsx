import "./App.css";
import { Router } from "@solidjs/router";
import { lazy } from "solid-js";

const routes = [
  {
    path: "/",
    component: lazy(() => import("./pages/Home/index.tsx")),
  },
  {
    path: "/test",
    component: lazy(() => import("./pages/Test/index.tsx")),
  },
  {
    path: "/template",
    component: lazy(() => import("./pages/Template/index.tsx")),
  },
];

export default function App() {
  return <Router>{routes}</Router>;
}
