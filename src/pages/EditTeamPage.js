import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getTeamById, editTeam } from "../services/api";

const EditTeamPage = () => {
  const { tournamentId, teamId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const team = await getTeamById(tournamentId, teamId, token);
        setNombre(team.nombre);
        setCiudad(team.ciudad);
      } catch (err) {}
    };

    fetchTeam();
  }, [tournamentId, teamId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await editTeam(tournamentId, teamId, { nombre, ciudad }, token);
      alert("Equipo actualizado exitosamente");
      navigate(`/tournaments/${tournamentId}`);
    } catch (err) {
      console.error("Error al editar el equipo:", err);
      setError(err.message || "Error al editar el equipo");
    }
  };

  return (
    <div className="edit-team-container bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-400">
          Editar Equipo
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Nombre del Equipo:
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Ciudad del Equipo:
            </label>
            <input
              type="text"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              required
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full transition duration-300"
          >
            Actualizar Equipo
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default EditTeamPage;
