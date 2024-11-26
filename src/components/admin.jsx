import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Sidebar from "./slidebar"; // Importa el Sidebar

const Admin = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [nuevaEspecialidad, setNuevaEspecialidad] = useState("");
  const [horarios, setHorarios] = useState([]);
  const [nuevoHorario, setNuevoHorario] = useState("");
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Estado del Sidebar

  // Manejar la visibilidad del Sidebar
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Cargar especialidades y horarios desde Firestore
  useEffect(() => {
    const fetchEspecialidadesYHorarios = async () => {
      setLoading(true);
      setError("");
      try {
        const especialidadesSnapshot = await getDocs(collection(db, "especialidades"));
        const especialidadesData = especialidadesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEspecialidades(especialidadesData);

        const horariosSnapshot = await getDocs(collection(db, "horarios"));
        const horariosData = horariosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHorarios(horariosData);
      } catch (err) {
        console.error("Error al cargar datos:", err.message);
        setError("No se pudieron cargar las especialidades y horarios.");
      } finally {
        setLoading(false);
      }
    };

    fetchEspecialidadesYHorarios();
  }, []);

  // Agregar una nueva especialidad
  const handleAddEspecialidad = async () => {
    if (!nuevaEspecialidad.trim()) {
      setError("El nombre de la especialidad no puede estar vacío.");
      return;
    }
    try {
      const newDoc = await addDoc(collection(db, "especialidades"), {
        name: nuevaEspecialidad,
      });
      setEspecialidades([...especialidades, { id: newDoc.id, name: nuevaEspecialidad }]);
      setNuevaEspecialidad("");
      setError("");
    } catch (err) {
      console.error("Error al agregar especialidad:", err.message);
      setError("No se pudo agregar la especialidad.");
    }
  };

  // Eliminar una especialidad
  const handleDeleteEspecialidad = async (id) => {
    try {
      await deleteDoc(doc(db, "especialidades", id));
      const updatedEspecialidades = especialidades.filter((e) => e.id !== id);
      setEspecialidades(updatedEspecialidades);
    } catch (err) {
      console.error("Error al eliminar especialidad:", err.message);
      setError("No se pudo eliminar la especialidad.");
    }
  };

  // Agregar un nuevo horario
  const handleAddHorario = async () => {
    if (!nuevoHorario.trim() || !especialidadSeleccionada) {
      setError("Debes seleccionar una especialidad y un horario válido.");
      return;
    }
    try {
      const newDoc = await addDoc(collection(db, "horarios"), {
        horario: nuevoHorario,
        specialtyId: especialidadSeleccionada,
      });
      setHorarios([
        ...horarios,
        { id: newDoc.id, horario: nuevoHorario, specialtyId: especialidadSeleccionada },
      ]);
      setNuevoHorario("");
      setError("");
    } catch (err) {
      console.error("Error al agregar horario:", err.message);
      setError("No se pudo agregar el horario.");
    }
  };

  // Eliminar un horario
  const handleDeleteHorario = async (id) => {
    try {
      await deleteDoc(doc(db, "horarios", id));
      const updatedHorarios = horarios.filter((h) => h.id !== id);
      setHorarios(updatedHorarios);
    } catch (err) {
      console.error("Error al eliminar horario:", err.message);
      setError("No se pudo eliminar el horario.");
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

        <div className="p-6 bg-gray-100 min-h-screen">
          <h1 className="text-2xl font-bold mb-6">Módulo de Administración</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {loading && <p className="text-blue-500 mb-4">Cargando datos...</p>}

          {/* Gestión de Especialidades */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Especialidades Médicas</h2>
            <div className="flex space-x-4 mb-4">
              <input
                type="text"
                placeholder="Nueva especialidad"
                value={nuevaEspecialidad}
                onChange={(e) => setNuevaEspecialidad(e.target.value)}
                className="p-2 border rounded w-full"
              />
              <button
                onClick={handleAddEspecialidad}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Agregar
              </button>
            </div>
            <ul className="space-y-2">
              {especialidades.map((especialidad) => (
                <li
                  key={especialidad.id}
                  className="flex justify-between items-center p-2 border rounded bg-white"
                >
                  <span>{especialidad.name}</span>
                  <button
                    onClick={() => handleDeleteEspecialidad(especialidad.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Gestión de Horarios */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Horarios Disponibles</h2>
            <div className="flex space-x-4 mb-4">
              <select
                value={especialidadSeleccionada}
                onChange={(e) => setEspecialidadSeleccionada(e.target.value)}
                className="p-2 border rounded w-full"
              >
                <option value="">Selecciona una especialidad</option>
                {especialidades.map((especialidad) => (
                  <option key={especialidad.id} value={especialidad.id}>
                    {especialidad.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Nuevo horario (e.g., 10:00 AM - 12:00 PM)"
                value={nuevoHorario}
                onChange={(e) => setNuevoHorario(e.target.value)}
                className="p-2 border rounded w-full"
              />
              <button
                onClick={handleAddHorario}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Agregar
              </button>
            </div>
            <ul className="space-y-2">
              {horarios.map((horario) => (
                <li
                  key={horario.id}
                  className="flex justify-between items-center p-2 border rounded bg-white"
                >
                  <span>
                    Especialidad:{" "}
                    {especialidades.find((e) => e.id === horario.specialtyId)?.name} -{" "}
                    {horario.horario}
                  </span>
                  <button
                    onClick={() => handleDeleteHorario(horario.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
