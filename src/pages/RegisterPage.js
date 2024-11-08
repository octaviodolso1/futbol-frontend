import React, { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    rol: "player",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await registerUser(userData);
      console.log("Registro exitoso:", response);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-400">
          Registro de Usuario
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Nombre:
            </label>
            <input
              type="text"
              name="nombre"
              value={userData.nombre}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Correo:
            </label>
            <input
              type="email"
              name="correo"
              value={userData.correo}
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
              value={userData.contraseña}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
          >
            Registrarse
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;
