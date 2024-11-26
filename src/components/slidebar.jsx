import React from "react";
import { useAuth } from "../context/context"; // Importa el hook useAuth

const Sidebar = ({ isVisible }) => {
  const { user } = useAuth(); // Obtén el usuario desde el contexto

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-green-100 transition-transform duration-300 ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      } w-64 shadow-md`}
    >
      {/* Contenido del Sidebar */}
      <div className="p-4">
        <i className="fa-solid fa-stethoscope text-green-600 text-3xl mb-6"></i>
        <ul>
          <li className="mb-2">
            <a href="/" className="text-green-600">Inicio</a>
          </li>
          <li className="mb-2">
            <a href="/citas" className="text-green-600">Citas</a>
          </li>
          <li className="mb-2">
            <a href="/admin" className="text-green-600">Admin</a>
          </li>
          <li className="mt-4">
            <a href="/logout" className="text-red-600">Cerrar sesión</a>
          </li>
        </ul>
      </div>
      {/* Mostrar el nombre del usuario en la parte inferior */}
      <div className="absolute bottom-4 left-4 flex items-center space-x-2">
        <div className="bg-green-400 w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold">
          {user?.displayName?.charAt(0) || "U"} {/* Primera letra del nombre */}
        </div>
        <span className="text-green-600 font-semibold">
          {user?.displayName || "Usuario"} {/* Nombre del usuario o valor por defecto */}
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
