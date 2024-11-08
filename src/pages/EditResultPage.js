import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getMatchesByTournamentId, editResult } from "../services/api";

const EditResultPage = () => {
  const { tournamentId, matchId } = useParams();
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [golesLocal, setGolesLocal] = useState("");
  const [golesVisitante, setGolesVisitante] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const matches = await getMatchesByTournamentId(tournamentId, token);
        const match = matches.find((m) => m.id === parseInt(matchId, 10));
        if (match && match.result) {
          setGolesLocal(match.result.goles_local);
          setGolesVisitante(match.result.goles_visitante);
        } else {
          setError("Resultado no encontrado para este partido");
        }
      } catch (err) {
        console.error("Error al obtener los detalles del partido:", err);
        setError("Error al obtener los detalles del partido");
      }
    };

    fetchMatchDetails();
  }, [tournamentId, matchId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (golesLocal === "" || golesVisitante === "") {
      setError("Por favor, completa ambos campos.");
      return;
    }

    try {
      await editResult(
        tournamentId,
        matchId,
        {
          goles_local: parseInt(golesLocal, 10),
          goles_visitante: parseInt(golesVisitante, 10),
        },
        token
      );
      alert("Resultado actualizado exitosamente");
      navigate(`/tournaments/${tournamentId}`);
    } catch (err) {
      console.error("Error al editar el resultado:", err);
      setError(err.message || "Error al editar el resultado");
    }
  };

  return (
    <div className="min-h-screen bg-navy-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-green-400">
          Editar Resultado del Partido
        </h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form
          className="mt-8 space-y-6 bg-gray-800 p-8 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="golesLocal" className="sr-only">
                Goles del Equipo Local
              </label>
              <input
                id="golesLocal"
                name="golesLocal"
                type="number"
                value={golesLocal}
                onChange={(e) => setGolesLocal(e.target.value)}
                required
                min="0"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Goles del Equipo Local"
              />
            </div>

            <div>
              <label htmlFor="golesVisitante" className="sr-only">
                Goles del Equipo Visitante
              </label>
              <input
                id="golesVisitante"
                name="golesVisitante"
                type="number"
                value={golesVisitante}
                onChange={(e) => setGolesVisitante(e.target.value)}
                required
                min="0"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Goles del Equipo Visitante"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Actualizar Resultado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditResultPage;
