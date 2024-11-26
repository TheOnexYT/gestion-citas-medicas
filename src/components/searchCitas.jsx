import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Importa Firestore
import { collection, getDocs, query, where } from "firebase/firestore";
import Sidebar from "./slidebar"; // Importa el componente Sidebar

const SearchCitasModule = () => {
  const [especialidades, setEspecialidades] = useState([]); // Almacena especialidades desde Firestore
  const [citas, setCitas] = useState([]); // Almacena citas disponibles desde Firestore
  const [selectedEspecialidad, setSelectedEspecialidad] = useState(""); // Especialidad seleccionada
  const [loading, setLoading] = useState(false); // Indica si los datos se están cargando
  const [error, setError] = useState(""); // Para manejar errores
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Estado para mostrar/ocultar Sidebar

  // Obtener especialidades desde Firestore
  useEffect(() => {
    const fetchEspecialidades = async () => {
      setLoading(true);
      setError("");
      try {
        const especialidadesSnapshot = await getDocs(collection(db, "especialidades"));
        const especialidadesData = especialidadesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEspecialidades(especialidadesData);
      } catch (err) {
        console.error("Error al cargar especialidades:", err.message);
        setError("No se pudieron cargar las especialidades.");
      } finally {
        setLoading(false);
      }
    };

    fetchEspecialidades();
  }, []);

  // Manejar el cambio de especialidad y obtener citas
  const handleEspecialidadChange = async (e) => {
    const especialidadId = e.target.value;
    setSelectedEspecialidad(especialidadId);

    if (!especialidadId) {
      setCitas([]);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const q = query(collection(db, "horarios"), where("specialtyId", "==", especialidadId));
      const horariosSnapshot = await getDocs(q);
      const citasData = horariosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCitas(citasData);
    } catch (err) {
      console.error("Error al cargar citas:", err.message);
      setError("No se pudieron cargar las citas disponibles.");
    } finally {
      setLoading(false);
    }
  };

  // Manejar la visibilidad del Sidebar
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isVisible={isSidebarVisible} />

      {/* Contenido principal */}
      <div className={`flex-1 transition-transform duration-300 ${isSidebarVisible ? "ml-64" : "ml-0"}`}>
        {/* Ícono para alternar el Sidebar */}
        <i
          className={`fa-solid fa-stethoscope fixed top-4 left-4 z-50 text-green-600 text-3xl cursor-pointer transition-opacity duration-300 ${
            isSidebarVisible ? "opacity-50" : "opacity-100"
          }`}
          onClick={toggleSidebar}
        ></i>

        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
          <h1 className="text-2xl font-bold mb-6">Buscar Citas Médicas</h1>

          <div className="w-full max-w-md mb-6">
            <label htmlFor="especialidad" className="block text-lg mb-2">
              Selecciona una especialidad:
            </label>
            <select
              id="especialidad"
              value={selectedEspecialidad}
              onChange={handleEspecialidadChange}
              className="w-full p-3 border rounded"
            >
              <option value="">-- Selecciona una especialidad --</option>
              {especialidades.map((especialidad) => (
                <option key={especialidad.id} value={especialidad.id}>
                  {especialidad.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Citas Disponibles</h2>
            {loading && <p className="text-blue-500">Cargando...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {citas.length > 0 ? (
              <ul className="space-y-4">
                {citas.map((cita) => (
                  <li key={cita.id} className="p-4 border rounded shadow-md bg-white">
                    <p className="text-lg">
                      Horario: <span className="font-semibold">{cita.horario}</span>
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              !loading && (
                <p className="text-gray-600">No hay citas disponibles para esta especialidad.</p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCitasModule;
