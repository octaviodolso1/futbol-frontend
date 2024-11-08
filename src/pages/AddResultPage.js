import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { addOrUpdateResult } from "../services/api";

const AddResultPage = () => {
  const { token, user } = useAuth();
  const { tournamentId, matchId } = useParams();
  const [golesLocal, setGolesLocal] = useState("");
  const [golesVisitante, setGolesVisitante] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isAuthorized =
    user && (user.rol === "organizer" || user.rol === "admin");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isAuthorized) {
      setError("No tienes permisos para realizar esta acción.");
      return;
    }

    if (golesLocal === "" || golesVisitante === "") {
      setError("Por favor, completa ambos campos.");
      return;
    }

    try {
      const resultData = {
        goles_local: parseInt(golesLocal),
        goles_visitante: parseInt(golesVisitante),
      };

      const response = await addOrUpdateResult(
        tournamentId,
        matchId,
        resultData,
        token
      );

      alert(response.message);
      navigate(`/tournaments/${tournamentId}`);
    } catch (err) {
      setError(err.message || "Error al agregar el resultado.");
    }
  };

  return (
    <div className="min-h-screen bg-navy-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-green-400">
          Agregar/Actualizar Resultado del Partido
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Goles del Equipo Visitante"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Agregar/Actualizar Resultado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResultPage;
