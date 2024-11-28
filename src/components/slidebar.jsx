import React from "react";
import { useAuth } from "../context/context"; // Importa el hook useAuth
import { useNavigate } from "react-router-dom"; // Importa useNavigate para redirección

const Sidebar = ({ isVisible }) => {
  const { user, logout } = useAuth(); // Obtén el usuario y la función de logout desde el contexto
  const navigate = useNavigate(); // Hook para redirección

  const handleLogout = () => {
    logout(); // Llama a la función de logout
    navigate("/dashboard"); // Redirige al dashboard
  };

  const handleCitasClick = () => {
    if (user) {
      navigate("/search-citas");
    } else {
      navigate("/login");
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
      {/* Sidebar para formato web */}
      <div
        className={`fixed top-0 left-0 h-full bg-green-100 transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        } w-64 shadow-md hidden md:block`}
      >
        {/* Contenido del Sidebar */}
        <div className="p-4">
          <i className="fa-solid fa-stethoscope text-green-600 text-3xl mb-6"></i>
          <ul>
            <li className="mb-2">
              <a href="/" className="text-green-600">Inicio</a>
            </li>
            <li className="mb-2">
              <a onClick={handleCitasClick} className="text-green-600 cursor-pointer">Citas</a>
            </li>
            <li className="mb-2">
              <a href="/admin" className="text-green-600">Admin</a>
            </li>
            <li className="mt-4">
              <button onClick={handleLogout} className="text-red-600">Cerrar sesión</button>
            </li>
          </ul>
        </div>
        {/* Mostrar el nombre del usuario en la parte inferior */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
          <div className="bg-green-400 w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold">
            {user && user.displayName ? user.displayName.charAt(0) : 'L'} {/* Primera letra del nombre o 'L' */}
          </div>
          <span 
            className="text-green-600 font-semibold cursor-pointer"
            onClick={!user ? handleLoginClick : null}
          >
            {user && user.displayName ? user.displayName : 'Login'} {/* Nombre del usuario o 'Login' */}
          </span>
        </div>
      </div>

      {/* Sidebar para formato móvil */}
      <div
        className={`fixed top-0 left-0 h-full bg-green-100 transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        } w-64 shadow-md block md:hidden`}
      >
        {/* Contenido del Sidebar */}
        <div className="p-4">
          <i className="fa-solid fa-stethoscope text-green-600 text-3xl mb-6"></i>
          <ul>
            <li className="mb-2">
              <a href="/" className="text-green-600">Inicio</a>
            </li>
            <li className="mb-2">
              <a onClick={handleCitasClick} className="text-green-600 cursor-pointer">Citas</a>
            </li>
            <li className="mb-2">
              <a href="/admin" className="text-green-600">Admin</a>
            </li>
            <li className="mt-4">
              <button onClick={handleLogout} className="text-red-600">Cerrar sesión</button>
            </li>
          </ul>
        </div>
        {/* Mostrar el nombre del usuario en la parte inferior */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
          <div className="bg-green-400 w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold">
            {user && user.displayName ? user.displayName.charAt(0) : 'L'} {/* Primera letra del nombre o 'L' */}
          </div>
          <span 
            className="text-green-600 font-semibold cursor-pointer"
            onClick={!user ? handleLoginClick : null}
          >
            {user && user.displayName ? user.displayName : 'Login'} {/* Nombre del usuario o 'Login' */}
          </span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;