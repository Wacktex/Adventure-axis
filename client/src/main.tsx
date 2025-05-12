import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { GlobalStyle } from "./GlobalStyle";

createRoot(document.getElementById("root")!).render(
  <>
    <GlobalStyle />
    <App />
  </>
);
