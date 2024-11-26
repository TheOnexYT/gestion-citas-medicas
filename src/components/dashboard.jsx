import React, { useState } from "react";
import { useAuth } from "../context/context";// Importa el contexto de autenticación
import Sidebar from "./slidebar";
import MainContent from "./maincontent";

const Dashboard = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { user, logout } = useAuth();
  
  console.log('user',user)// Obtén el usuario y la función para cerrar sesión del contexto

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="relative flex">
      {/* Botón flotante con ícono */}
      <i
        className={`fa-solid fa-stethoscope fixed top-4 left-4 z-50 text-3xl text-green-600 cursor-pointer transition-opacity duration-300 ${
          isSidebarVisible ? "opacity-50" : "opacity-100"
        }`}
        onClick={toggleSidebar}
      ></i>

      {/* Sidebar */}
      <Sidebar isVisible={isSidebarVisible}
                user={user}>
                    

        <div className="flex flex-col items-center p-4">
          {/* Información del usuario autenticado */}
          {user && (
            <>
              <p className="text-lg font-semibold text-gray-700">
                Bienvenido, {user.displayName || "Usuario"}
              </p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </>
          )}
          {/* Botón para cerrar sesión */}
          <button
            onClick={logout}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </Sidebar>

      {/* Contenido principal */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarVisible ? "ml-64" : "ml-0"
        }`}
      >
        <MainContent />
      </div>
    </div>
  );
};

export default Dashboard;
