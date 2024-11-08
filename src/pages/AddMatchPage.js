import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getTeamsByTournamentId, addMatch } from "../services/api";

const AddMatchPage = () => {
  const { tournamentId } = useParams();
  const [teams, setTeams] = useState([]);
  const [equipoLocalId, setEquipoLocalId] = useState("");
  const [equipoVisitanteId, setEquipoVisitanteId] = useState("");
  const [fecha, setFecha] = useState("");
  const [error, setError] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

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

    fetchTeams();
  }, [tournamentId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (equipoLocalId === equipoVisitanteId) {
      setError("Los equipos seleccionados no pueden ser iguales.");
      return;
    }

    try {
      await addMatch(
        tournamentId,
        { fecha, equipoLocalId, equipoVisitanteId },
        token
      );
      navigate(`/tournaments/${tournamentId}`);
    } catch (err) {
      console.error("Error al agregar el partido:", err);
      setError(err.message || "Error al agregar el partido.");
    }
  };

  return (
    <div className="min-h-screen bg-navy-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-green-400">
          Agregar Partido
        </h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form
          className="mt-8 space-y-6 bg-gray-800 p-8 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="equipoLocalId" className="sr-only">
                Equipo Local
              </label>
              <select
                id="equipoLocalId"
                value={equipoLocalId}
                onChange={(e) => setEquipoLocalId(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              >
                <option value="">Seleccionar equipo visitante</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.nombre}
                  </option>
                ))}
              </select>
            </div>

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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Agregar Partido
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMatchPage;
