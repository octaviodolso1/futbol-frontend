import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  getMatchesByTournamentId,
  getTeamsByTournamentId,
  editMatch,
} from "../services/api";

const EditMatchPage = () => {
  const { tournamentId, matchId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [fecha, setFecha] = useState("");
  const [equipoLocalId, setEquipoLocalId] = useState("");
  const [equipoVisitanteId, setEquipoVisitanteId] = useState("");
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getTeamsByTournamentId(tournamentId, token);
        setTeams(data);
      } catch (err) {
        console.error("Error al obtener los equipos:", err);
        setError("Error al obtener los equipos");
      }
    };

    const fetchMatchDetails = async () => {
      try {
        const matches = await getMatchesByTournamentId(tournamentId, token);
        const match = matches.find((m) => m.id === parseInt(matchId, 10));
        if (match) {
          setFecha(match.fecha.split("T")[0]);
          setEquipoLocalId(match.equipoLocalId);
          setEquipoVisitanteId(match.equipoVisitanteId);
        } else {
          setError("Partido no encontrado");
        }
      } catch (err) {
        console.error("Error al obtener los detalles del partido:", err);
        setError("Error al obtener los detalles del partido");
      }
    };

    fetchTeams();
    fetchMatchDetails();
  }, [tournamentId, matchId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (equipoLocalId === equipoVisitanteId) {
      setError("Los equipos seleccionados no pueden ser iguales.");
      return;
    }

    try {
      await editMatch(
        tournamentId,
        matchId,
        { fecha, equipoLocalId, equipoVisitanteId },
        token
      );
      alert("Partido actualizado exitosamente");
      navigate(`/tournaments/${tournamentId}`);
    } catch (err) {
      console.error("Error al editar el partido:", err);
      setError(err.message || "Error al editar el partido");
    }
  };

  return (
    <div className="min-h-screen bg-navy-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-green-400">
          Editar Partido
        </h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form
          className="mt-8 space-y-6 bg-gray-800 p-8 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="fecha" className="sr-only">
                Fecha del Partido
              </label>
              <input
                id="fecha"
                name="fecha"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="equipoLocalId" className="sr-only">
                Equipo Local
              </label>
              <select
                id="equipoLocalId"
                value={equipoLocalId}
                onChange={(e) => setEquipoLocalId(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              >
                <option value="">Seleccionar equipo local</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="equipoVisitanteId" className="sr-only">
                Equipo Visitante
              </label>
              <select
                id="equipoVisitanteId"
                value={equipoVisitanteId}
                onChange={(e) => setEquipoVisitanteId(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              >
                <option value="">Seleccionar equipo visitante</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Actualizar Partido
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMatchPage;
