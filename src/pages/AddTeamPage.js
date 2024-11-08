import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AddTeamPage = () => {
  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [error, setError] = useState("");
  const { tournamentId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!token) {
        throw new Error("Token de autenticación no disponible");
      }

      const response = await fetch(
        `http://localhost:3000/tournaments/${tournamentId}/teams`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ nombre, ciudad }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            "Token inválido o expirado. Por favor, inicie sesión nuevamente."
          );
        } else {
          throw new Error("Error al agregar el equipo");
        }
      }

      navigate(`/tournaments/${tournamentId}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-navy-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-green-400">
          Agregar Equipo
        </h2>
        <form
          className="mt-8 space-y-6 bg-gray-800 p-8 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="nombre" className="sr-only">
                Nombre del Equipo
              </label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Nombre del Equipo"
              />
            </div>
            <div>
              <label htmlFor="ciudad" className="sr-only">
                Ciudad del Equipo
              </label>
              <input
                type="text"
                name="ciudad"
                id="ciudad"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Ciudad del Equipo"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Agregar Equipo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeamPage;
