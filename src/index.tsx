import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Loader from "./components/Loader";

const AppRoot = lazy(async () => {
  const [{ default: AppWrapper }, { default: App }] = await Promise.all([
    import("./components/AppWrapper"),
    import("./components/App"),
  ]);
  return {
    default: () => (
      <AppWrapper>
        <App />
      </AppWrapper>
    ),
  };
});

const root = document.createElement("div");
document.body.appendChild(root);
createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <AppRoot />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
);
