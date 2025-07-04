import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "./app/locales/i18n"; // i18n 초기화

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
