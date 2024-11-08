import React from "react";
import TeamItem from "./TeamItem";

const TeamsList = ({ teams, tournamentId, user, token, setTeams }) => {
  if (teams.length === 0) {
    return (
      <p className="text-white">No hay equipos registrados para este torneo.</p>
    );
  }

  return (
    <ul className="space-y-4">
      {teams.map((team) => (
        <TeamItem
          key={team.id}
          team={team}
          tournamentId={tournamentId}
          user={user}
          token={token}
          setTeams={setTeams}
        />
      ))}
    </ul>
  );
};

export default TeamsList;
