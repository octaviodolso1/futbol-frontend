const API_URL = "http://localhost:3000";

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al registrar el usuario");
  }

  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al iniciar sesión");
  }

  return response.json();
};

export const getTournaments = async (token) => {
  const response = await fetch(`${API_URL}/tournaments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los torneos");
  }

  return response.json();
};

export const getTournamentById = async (tournamentId, token) => {
  const response = await fetch(`${API_URL}/tournaments/${tournamentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los detalles del torneo");
  }

  return response.json();
};

export const deleteTournament = async (tournamentId, token) => {
  const response = await fetch(`${API_URL}/tournaments/${tournamentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al eliminar el torneo");
  }

  return response.json();
};

export const addTournament = async (tournamentData, token) => {
  const response = await fetch(`${API_URL}/tournaments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tournamentData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al agregar el torneo");
  }

  return response.json();
};

export const editTournament = async (tournamentId, tournamentData, token) => {
  const response = await fetch(`${API_URL}/tournaments/${tournamentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tournamentData),
  });

  if (!response.ok) {
    throw new Error("Error al editar el torneo");
  }

  return response.json();
};

export const getTeamsByTournamentId = async (tournamentId, token) => {
  const response = await fetch(`${API_URL}/tournaments/${tournamentId}/teams`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los equipos del torneo");
  }

  return response.json();
};

export const getTeamById = async (tournamentId, teamId, token) => {
  const response = await fetch(
    `${API_URL}/tournaments/${tournamentId}/teams/${teamId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Error al obtener los detalles del equipo"
    );
  }

  return response.json();
};

export const addTeam = async (tournamentId, teamData, token) => {
  const response = await fetch(`${API_URL}/tournaments/${tournamentId}/teams`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(teamData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al agregar el equipo");
  }

  return response.json();
};

export const editTeam = async (tournamentId, teamId, teamData, token) => {
  const response = await fetch(
    `${API_URL}/tournaments/${tournamentId}/teams/${teamId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(teamData),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al editar el equipo");
  }

  return response.json();
};

export const deleteTeam = async (tournamentId, teamId, token) => {
  const response = await fetch(
    `${API_URL}/tournaments/${tournamentId}/teams/${teamId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error al eliminar el equipo");
  }

  return response.json();
};

export const addMatch = async (tournamentId, matchData, token) => {
  const response = await fetch(
    `${API_URL}/tournaments/${tournamentId}/matches`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(matchData),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al agregar el partido");
  }

  return response.json();
};

export const editMatch = async (tournamentId, matchId, matchData, token) => {
  const response = await fetch(
    `${API_URL}/tournaments/${tournamentId}/matches/${matchId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(matchData),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al editar el partido");
  }

  return response.json();
};

export const deleteMatch = async (tournamentId, matchId, token) => {
  const response = await fetch(
    `${API_URL}/tournaments/${tournamentId}/matches/${matchId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al eliminar el partido");
  }

  return response.json();
};

export const getMatchesByTournamentId = async (tournamentId, token) => {
  const response = await fetch(
    `${API_URL}/tournaments/${tournamentId}/matches`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error al obtener los partidos del torneo");
  }

  return response.json();
};

export const addOrUpdateResult = async (
  tournamentId,
  matchId,
  resultData,
  token
) => {
  const response = await fetch(
    `${API_URL}/tournaments/${tournamentId}/matches/${matchId}/result`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(resultData),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Error al agregar/actualizar el resultado"
    );
  }

  return response.json();
};

export const editResult = async (tournamentId, matchId, resultData, token) => {
  const response = await fetch(
    `${API_URL}/tournaments/${tournamentId}/matches/${matchId}/result`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(resultData),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al editar el resultado");
  }

  return response.json();
};

export const deleteResult = async (tournamentId, matchId, token) => {
  const response = await fetch(
    `${API_URL}/tournaments/${tournamentId}/matches/${matchId}/result`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al eliminar el resultado");
  }

  return response.json();
};

export const getMatchesToday = async (date) => {
  const response = await fetch(`${API_URL}/matches/date?date=${date}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Error al obtener los partidos de hoy"
    );
  }

  return response.json();
};
