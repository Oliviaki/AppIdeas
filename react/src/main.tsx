import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "normalize.css";
import "@/utils/reset.scss";
import { BrowserRouter } from "react-router-dom";
import "@/utils/mapRoutesToMenuItem.ts"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
