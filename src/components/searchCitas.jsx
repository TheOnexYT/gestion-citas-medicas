import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Importa Firestore
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import Sidebar from "./slidebar"; // Importa el componente Sidebar
import { toast, ToastContainer } from "react-toastify"; // Importa toastify
import "react-toastify/dist/ReactToastify.css"; // Estilos para el toast

const SearchCitasModule = () => {
  const [especialidades, setEspecialidades] = useState([]); // Almacena especialidades desde Firestore
  const [citas, setCitas] = useState([]); // Almacena citas disponibles desde Firestore
  const [selectedEspecialidad, setSelectedEspecialidad] = useState(""); // Especialidad seleccionada
  const [loading, setLoading] = useState(false); // Indica si los datos se están cargando
  const [error, setError] = useState(""); // Para manejar errores
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Estado para mostrar/ocultar Sidebar
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
  const [selectedCita, setSelectedCita] = useState(null); // Almacenar la cita seleccionada

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

  // Abrir el modal con los detalles de la cita seleccionada
  const handleCitaSelect = (cita) => {
    setSelectedCita(cita);
    setIsModalOpen(true);
  };

  // Confirmar la cita (se puede actualizar la base de datos o el estado)
  const handleConfirmCita = async () => {
    if (selectedCita) {
      try {
        // Actualizar Firestore para marcar la cita como confirmada
        const citaRef = doc(db, "horarios", selectedCita.id);
        await updateDoc(citaRef, {
          status: "confirmed", // Actualizamos el estado de la cita
        });

        // Mostrar el Toast de confirmación
        toast.success(`Cita confirmada: ${selectedCita.horario}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setIsModalOpen(false); // Cerrar el modal
      } catch (error) {
        console.error("Error al confirmar cita:", error);
        setError("No se pudo confirmar la cita.");
      }
    }
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
                  <li
                    key={cita.id}
                    className="p-4 border rounded shadow-md bg-white cursor-pointer"
                    onClick={() => handleCitaSelect(cita)} // Al hacer clic se abre el modal
                  >
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

      {/* Modal de Confirmación de Cita */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Confirmar Cita</h2>
            <p>Horario: <span className="font-semibold">{selectedCita?.horario}</span></p>
            <p>Especialidad: {selectedCita?.specialtyName}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleConfirmCita}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Confirmar
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchCitasModule;
