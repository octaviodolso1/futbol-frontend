import React, { useState } from "react";
import { loginUser } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    correo: "",
    contraseña: "",
  });
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { user, token } = await loginUser(credentials);
      console.log("Datos del usuario desde el backend:", user);
      console.log("Token desde el backend:", token);
      login(user, token);
    } catch (err) {
      console.error("Error en el inicio de sesión:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="login-container min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-400">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Correo:
            </label>
            <input
              type="email"
              name="correo"
              value={credentials.correo}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Contraseña:
            </label>
            <input
              type="password"
              name="contraseña"
              value={credentials.contraseña}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
          >
            Iniciar Sesión
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
