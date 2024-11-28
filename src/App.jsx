import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/context"; // Asegúrate de importar el context
import Auth from "./components/auth";
import Dashboard from "./components/dashboard";
import Admin from "./components/admin";
import SearchCitasModule from "./components/searchCitas";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify"; // Asegúrate de importar ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importar los estilos de Toastify

const App = () => {
  // Usar el contexto de autenticación para verificar si el usuario ya está logueado
  const { user } = useAuth();

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta por defecto para redirigir automáticamente a dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          
          {/* Ruta de login */}
          <Route path="/login" element={<Auth />} />

          {/* Ruta Dashboard (Home) */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Ruta Admin - Solo accesible por usuarios con rol 'admin' */}
          <Route
            path="/admin"
            element={
              
                <Admin />
              
            }
          />

          {/* Ruta de búsqueda de citas, accesible solo para usuarios autenticados */}
          <Route
            path="/search-citas"
            element={
              <ProtectedRoute>
                <SearchCitasModule />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* ToastContainer para mostrar las notificaciones */}
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </Router>
    </AuthProvider>
  );
};

export default App;
