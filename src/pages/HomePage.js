import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTournaments, getMatchesToday } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { format } from "date-fns";

function HomePage() {
  const { token } = useAuth();
  const [tournaments, setTournaments] = useState([]);
  const [matchesToday, setMatchesToday] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const data = await getTournaments(token);
        setTournaments(data);
      } catch (err) {
        console.error("Error al obtener los torneos:", err);
        setError("Error al cargar los torneos");
      }
    };

    const fetchMatchesToday = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const matches = await getMatchesToday(today, token);
        setMatchesToday(matches);
      } catch (err) {
        console.error("Error al obtener los partidos de hoy:", err);
      }
    };

    fetchTournaments();
    fetchMatchesToday();
  }, [token]);

  return (
    <div className="min-h-screen flex">
      <aside className="w-1/4 bg-gray-800 p-6 text-white">
        <h2 className="text-xl font-semibold mb-4">Torneos Disponibles</h2>
        {error && <p className="text-red-500">{error}</p>}
        <ul className="space-y-4">
          {tournaments.length > 0 ? (
            tournaments.map((tournament) => (
              <li key={tournament.id}>
                <Link
                  to={`/tournaments/${tournament.id}`}
                  className="block bg-gray-700 hover:bg-gray-600 p-3 rounded-lg transition-colors"
                >
                  {tournament.nombre}
                </Link>
              </li>
            ))
          ) : (
            <p>No hay torneos disponibles</p>
          )}
        </ul>
      </aside>
      <main className="w-3/4 flex flex-col items-center justify-center bg-gray-900 text-white p-6">
        <h1 className="text-4xl font-bold mb-6">Partidos de Hoy</h1>

        {matchesToday.length === 0 ? (
          <p className="text-lg">No hay partidos programados para hoy.</p>
        ) : (
          <div className="space-y-6">
            {matchesToday.map((match) => (
              <div
                key={match.id}
                className="bg-gray-800 p-4 rounded-lg shadow-md"
              >
                <h3 className="text-2xl font-bold text-green-400 mb-2">
                  {match.relatedTournament.nombre}
                </h3>
                <div className="flex justify-between items-center text-lg">
                  <span>{match.localTeam.nombre}</span>
                  <span>
                    {match.result
                      ? `${match.result.goles_local} - ${match.result.goles_visitante}`
                      : "vs"}
                  </span>
                  <span>{match.visitorTeam.nombre}</span>
                </div>
                <p className="text-gray-400 mt-2">
                  Hora: {format(new Date(match.fecha), "HH:mm")}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default HomePage;
