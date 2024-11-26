import React, { useState } from "react";
import { auth } from "../firebase"; // Importa tu configuración de Firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { useAuth } from "../context/context"; // Usar el contexto

const Auth = () => {
  const { setUser } = useAuth(); // Usar contexto para manejar el usuario
  const navigate = useNavigate(); // Hook para redireccionar
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  // Manejar autenticación
  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        // Iniciar sesión
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user); // Actualizar el contexto con el usuario
        navigate("/search-citas"); // Redirigir a search-citas
      } else {
        // Registrar nuevo usuario
        if (!name || !lastName) {
          setError("Por favor, completa todos los campos.");
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user); // Actualizar el contexto con el usuario
        navigate("/search-citas"); // Redirigir a search-citas
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </h2>
        {error && (
          <p className="text-red-500 text-center mb-4">
            Error: {error}
          </p>
        )}
        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Apellido"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 border rounded"
                required
              />
            </>
          )}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition"
          >
            {isLogin ? "Iniciar Sesión" : "Registrarse"}
          </button>
        </form>
        <p className="text-center mt-4">
          {isLogin ? (
            <>
              ¿No tienes cuenta?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-green-600 underline"
              >
                Regístrate
              </button>
            </>
          ) : (
            <>
              ¿Ya tienes cuenta?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-green-600 underline"
              >
                Inicia sesión
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Auth;
