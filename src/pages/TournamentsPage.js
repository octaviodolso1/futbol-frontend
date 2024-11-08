import React, { useEffect, useState } from "react";
import { getTournaments, deleteTournament } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const TournamentsPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const data = await getTournaments(token);
        setTournaments(data);
      } catch (err) {
        console.error("Error al obtener los torneos:", err);
      }
    };

    fetchTournaments();
  }, [token]);

  const handleDelete = async (tournamentId) => {
    try {
      await deleteTournament(tournamentId, token);
      setTournaments(tournaments.filter((t) => t.id !== tournamentId));
    } catch (err) {
      console.error("Error al eliminar el torneo:", err);
    }
  };

  const handleViewDetails = (tournamentId) => {
    navigate(`/tournaments/${tournamentId}`);
  };

  const handleAdd = () => {
    navigate("/tournaments/new");
  };

  return (
    <div className="bg-navy-700 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-green-400 mb-6">
          Lista de Torneos
        </h2>

        {user && user.rol === "admin" && (
          <button
            onClick={handleAdd}
            className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded mb-4 transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl"
          >
            Agregar Torneo
          </button>
        )}

        <ul className="space-y-6">
          {tournaments.map((tournament) => (
            <li
              key={tournament.id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out"
            >
              <div>
                <p className="text-xl font-semibold text-green-400">
                  {tournament.nombre}
                </p>
                <p className="text-gray-300 text-sm">{tournament.ubicacion}</p>
              </div>

              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleViewDetails(tournament.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-all duration-200 ease-in-out"
                >
                  Ver Detalles
                </button>

                {user && user.rol === "admin" && (
                  <>
                    <button
                      onClick={() =>
                        navigate(`/tournaments/${tournament.id}/edit`)
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded transition-all duration-200 ease-in-out"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(tournament.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-all duration-200 ease-in-out"
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TournamentsPage;
