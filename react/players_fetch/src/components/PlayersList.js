import { PlayerLink } from './PlayerLink';

export const PlayersList = ({ players, fetchPlayer }) => {
  console.log("players", players);
  const playersList = players.map(p => {
    return <li id={`player-${p.id}` } key={p.id}><PlayerLink onClick={fetchPlayer} url={`/api/players/${p.id}`} name={p.name}  /></li>
  })
  
  return <div>
    <h1>Players List:</h1>
    <ol id="players-list">
       {playersList}
    </ol>
  </div>;
};
