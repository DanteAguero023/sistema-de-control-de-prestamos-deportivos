import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SistemaControlPrestamos from "./SistemaControlPrestamos.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SistemaControlPrestamos />
  </StrictMode>,
);