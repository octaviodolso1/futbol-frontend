import React from "react";
import { Link } from "react-router-dom";
import { deleteTeam } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

const TeamItem = ({ team, tournamentId, user, setTeams }) => {
  const { token: authToken } = useAuth();

  const handleDeleteTeam = async (teamId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este equipo?")) {
      try {
        await deleteTeam(tournamentId, teamId, authToken);
        alert("Equipo eliminado exitosamente");
        setTeams((prevTeams) => prevTeams.filter((t) => t.id !== teamId));
      } catch (err) {
        console.error("Error al eliminar el equipo:", err);
        alert("Error al eliminar el equipo");
      }
    }
  };

  return (
    <li className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <p className="text-lg font-bold text-white">{team.nombre}</p>
        <p className="text-gray-300">Ciudad: {team.ciudad}</p>
      </div>

      {user && (user.rol === "admin" || user.rol === "organizer") && (
        <div className="flex space-x-2">
          <Link
            to={`/tournaments/${tournamentId}/teams/${team.id}/edit`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded"
          >
            Editar
          </Link>
          <button
            onClick={() => handleDeleteTeam(team.id)}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
          >
            Eliminar
          </button>
        </div>
      )}
    </li>
  );
};

export default TeamItem;
