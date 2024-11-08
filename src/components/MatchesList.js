import React from 'react';
import MatchItem from './MatchItem';

const MatchesList = ({ matches, tournamentId, user, setMatches }) => {
  if (matches.length === 0) {
    return <p className="text-gray-400">No hay partidos programados para este torneo.</p>;
  }

  return (
    <ul className="space-y-4">
      {matches.map(match => (
        <li key={match.id} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <MatchItem
            match={match}
            tournamentId={tournamentId}
            user={user}
            token={match.token}
            setMatches={setMatches}
          />
        </li>
      ))}
    </ul>
  );
};

export default MatchesList;
