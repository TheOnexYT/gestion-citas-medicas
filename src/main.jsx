import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/context"; // Ajusta según el nombre real

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider> {/* Envuelve la aplicación con el proveedor del contexto */}
      <App />
    </AuthProvider>
  </StrictMode>
);

