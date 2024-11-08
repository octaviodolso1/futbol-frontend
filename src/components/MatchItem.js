import React from "react";
import { Link } from "react-router-dom";
import { deleteMatch, deleteResult } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

const MatchItem = ({ match, tournamentId, user, token, setMatches }) => {
  const { token: authToken } = useAuth();

  const handleDeleteMatch = async () => {
    if (window.confirm("¿Seguro de que deseas eliminar este partido?")) {
      try {
        await deleteMatch(tournamentId, match.id, authToken);
        alert("Partido eliminado exitosamente");
        setMatches((prevMatches) =>
          prevMatches.filter((m) => m.id !== match.id)
        );
      } catch (err) {
        console.error("Error al eliminar el partido:", err);
        alert("Error al eliminar el partido");
      }
    }
  };

  const handleDeleteResult = async () => {
    if (
      window.confirm(
        "¿Seguro de que deseas eliminar el resultado de este partido?"
      )
    ) {
      try {
        await deleteResult(tournamentId, match.id, authToken);
        alert("Resultado eliminado exitosamente");
        setMatches((prevMatches) =>
          prevMatches.map((m) =>
            m.id === match.id ? { ...m, result: null } : m
          )
        );
      } catch (err) {
        console.error("Error al eliminar el resultado:", err);
        alert("Error al eliminar el resultado");
      }
    }
  };

  return (
    <li className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-400 text-sm">
          <strong>Fecha:</strong> {new Date(match.fecha).toLocaleDateString()}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold text-white">{match.localTeam.nombre}</p>
        {match.result ? (
          <p className="text-xl font-semibold text-green-400">
            {match.result.goles_local} - {match.result.goles_visitante}
          </p>
        ) : (
          <p className="text-xl font-semibold text-gray-500">-</p>
        )}
        <p className="text-lg font-bold text-white">
          {match.visitorTeam.nombre}
        </p>
      </div>
      {user && (user.rol === "admin" || user.rol === "organizer") && (
        <div className="flex justify-between mt-2 space-x-2">
          {match.result ? (
            <div>
              <Link
                to={`/tournaments/${tournamentId}/matches/${match.id}/result/edit`}
                className="text-blue-400 hover:underline"
              >
                Editar Resultado
              </Link>
              <button
                onClick={handleDeleteResult}
                className="ml-4 text-red-500 hover:underline"
              >
                Eliminar Resultado
              </button>
            </div>
          ) : (
            <Link
              to={`/tournaments/${tournamentId}/matches/${match.id}/result`}
              className="text-green-400 hover:underline"
            >
              Agregar Resultado
            </Link>
          )}
          <div>
            <Link
              to={`/tournaments/${tournamentId}/matches/${match.id}/edit`}
              className="text-yellow-400 hover:underline"
            >
              Editar Partido
            </Link>
            <button
              onClick={handleDeleteMatch}
              className="ml-4 text-red-500 hover:underline"
            >
              Eliminar Partido
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default MatchItem;
