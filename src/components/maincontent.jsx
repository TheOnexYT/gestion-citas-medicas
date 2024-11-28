import React from "react";
import { useNavigate } from "react-router-dom";

const MainContent = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/login"); // Navega a la ruta de registro/inicio de sesión
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between min-h-screen px-6 md:px-32 bg-white">
      {/* Sección de texto */}
      <div className="max-w-3xl p-4 md:p-8"> {/* Reducido p-12 a p-8 */}
        <h1 className="text-[2.5rem] md:text-[3.5rem] font-bold text-black leading-tight mb-2 md:mb-4 text-wrap"> {/* Reducido mb-4 a mb-2 */}
          Gestiona tus citas médicas de manera rápida y sencilla
        </h1>
        <p className="text-gray-600 text-sm md:text-lg mb-4 text-wrap"> {/* Reducido mb-6 a mb-4 */}
          Disponibilidad citas médicas con proceso de reserva y seguimiento donde
          podrán buscar y reservar su cita ideal.
        </p>
        <button
          onClick={handleNavigation}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all"
        >
          Estoy interesado
        </button>
      </div>

      {/* Sección de imagen */}
      <div className="mt-4 md:mt-0"> {/* Reducido mt-8 a mt-4 */}
        <img
          src="https://dormakaba.rokka.io/prod-detail-square/40c33d/1505728367_FSW_ES_shoppingmall_CMYK%201528.jpg"
          alt="Centro Médico"
          className="rounded-xl shadow-lg max-w-full md:max-w-md"
        />
      </div>
    </div>
  );
};

export default MainContent;