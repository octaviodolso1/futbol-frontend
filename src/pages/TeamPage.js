import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getTeamById, deleteTeam } from "../services/api";

const TeamPage = () => {
  const { teamId } = useParams();
  const { token, user } = useAuth();
  const [team, setTeam] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await getTeamById(teamId, token);
        setTeam(data);
      } catch (err) {
        console.error("Error al obtener los detalles del equipo:", err);
        setError("Error al obtener los detalles del equipo");
      }
    };

    fetchTeam();
  }, [teamId, token]);

  const handleDeleteTeam = async () => {
    try {
      await deleteTeam(teamId, token);
      alert("Equipo eliminado exitosamente");
      navigate("/tournaments");
    } catch (err) {
      console.error("Error al eliminar el equipo:", err);
      alert("Error al eliminar el equipo");
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!team) {
    return <p>Cargando detalles del equipo...</p>;
  }

  return (
    <div>
      <h2>Detalles del Equipo</h2>
      <p>
        <strong>Nombre:</strong> {team.nombre}
      </p>
      <p>
        <strong>Ciudad:</strong> {team.ciudad}
      </p>

      {user && (user.rol === "admin" || user.rol === "organizer") && (
        <div>
          <Link to={`/tournaments/${team.tournamentId}/teams/${teamId}/edit`}>
            Editar Equipo
          </Link>
          <button onClick={handleDeleteTeam}>Eliminar Equipo</button>
        </div>
      )}
    </div>
  );
};

export default TeamPage;
