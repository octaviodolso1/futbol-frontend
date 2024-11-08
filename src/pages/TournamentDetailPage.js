import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  getTournamentById,
  getMatchesByTournamentId,
  getTeamsByTournamentId,
} from "../services/api";
import MatchesList from "../components/MatchesList";
import TeamsList from "../components/TeamsList";

const TournamentDetailPage = () => {
  const { tournamentId } = useParams();
  const [tournament, setTournament] = useState(null);
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        const data = await getTournamentById(tournamentId, token);
        setTournament(data);
      } catch (err) {
        console.error("Error al obtener los detalles del torneo:", err);
        setError("Error al obtener los detalles del torneo");
      }
    };

    const fetchMatches = async () => {
      try {
        const data = await getMatchesByTournamentId(tournamentId, token);
        setMatches(data);
      } catch (err) {
        console.error("Error al obtener los partidos del torneo:", err);
        setError("Error al obtener los partidos del torneo");
      }
    };

    const fetchTeams = async () => {
      try {
        const data = await getTeamsByTournamentId(tournamentId, token);
        setTeams(data);
      } catch (err) {
        console.error("Error al obtener los equipos del torneo:", err);
        setError("Error al obtener los equipos del torneo");
      }
    };

    fetchTournamentDetails();
    fetchMatches();
    fetchTeams();
  }, [tournamentId, token]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!tournament) {
    return <p className="text-gray-300">Cargando detalles del torneo...</p>;
  }

  return (
    <div className="bg-navy-700 min-h-screen text-white py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl text-green-400 font-bold mb-6">
          {tournament.nombre}
        </h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 transition duration-300 ease-in-out hover:shadow-2xl">
          <p className="text-xl font-semibold">
            Nombre: <span className="font-light">{tournament.nombre}</span>
          </p>
          <p className="text-xl font-semibold">
            Fecha de Inicio:{" "}
            <span className="font-light">
              {new Date(tournament.fecha_inicio).toLocaleDateString()}
            </span>
          </p>
          <p className="text-xl font-semibold">
            Fecha de Fin:{" "}
            <span className="font-light">
              {new Date(tournament.fecha_fin).toLocaleDateString()}
            </span>
          </p>
          <p className="text-xl font-semibold">
            Ubicación:{" "}
            <span className="font-light">{tournament.ubicacion}</span>
          </p>
        </div>
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Partidos</h3>
          <MatchesList
            matches={matches}
            tournamentId={tournamentId}
            user={user}
            setMatches={setMatches}
          />
        </div>
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Equipos</h3>
          <TeamsList
            teams={teams}
            tournamentId={tournamentId}
            user={user}
            token={token}
            setTeams={setTeams}
          />
        </div>

        {user && (user.rol === "admin" || user.rol === "organizer") && (
          <div className="mb-6">
            <Link
              to={`/tournaments/${tournamentId}/teams/new`}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mr-4 shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Agregar Equipo
            </Link>
            <Link
              to={`/tournaments/${tournamentId}/matches/new`}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Agregar Partido
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentDetailPage;
