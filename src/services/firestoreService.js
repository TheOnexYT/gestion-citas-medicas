import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// Guardar una nueva especialidad
export const addSpecialty = async (specialtyName) => {
  const docRef = await addDoc(collection(db, "especialidades"), {
    name: specialtyName,
    createdAt: new Date(),
  });
  return docRef.id;
};

// Guardar un nuevo horario
export const addSchedule = async (specialtyId, schedule) => {
  const docRef = await addDoc(collection(db, "horarios"), {
    specialtyId,
    schedule,
    createdAt: new Date(),
  });
  return docRef.id;
};

// Obtener todas las especialidades
export const getSpecialties = async () => {
  const querySnapshot = await getDocs(collection(db, "especialidades"));
  const specialties = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return specialties;
};

// Obtener horarios por especialidad
export const getSchedulesBySpecialty = async (specialtyId) => {
  const q = query(
    collection(db, "horarios"),
    where("specialtyId", "==", specialtyId)
  );
  const querySnapshot = await getDocs(q);
  const schedules = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return schedules;
};
