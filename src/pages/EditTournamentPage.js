import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const EditTournamentPage = () => {
  const { tournamentId } = useParams();
  const [nombre, setNombre] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token } = useAuth();
  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/tournaments/${tournamentId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al cargar los detalles del torneo");
        }

        const tournament = await response.json();
        setNombre(tournament.nombre);
        setFechaInicio(tournament.fecha_inicio);
        setFechaFin(tournament.fecha_fin);
        setUbicacion(tournament.ubicacion);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTournament();
  }, [tournamentId, token]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `http://localhost:3000/tournaments/${tournamentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nombre,
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin,
            ubicacion,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el torneo");
      }
      navigate("/tournaments");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="edit-tournament-container bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-400">
          Editar Torneo
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Nombre:
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Fecha de Inicio:
            </label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              required
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Fecha de Fin:
            </label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              required
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Ubicación:
            </label>
            <input
              type="text"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              required
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full transition duration-300"
          >
            Actualizar Torneo
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default EditTournamentPage;
