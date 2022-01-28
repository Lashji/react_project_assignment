import { PlayerLink } from './PlayerLink';

export const PlayersList = ({ players, fetchPlayer }) => {

  const playersList = players.map(p => {
    return <li id={`player-${p.id}`}><PlayerLink onClick={fetchPlayer} url={`http://localhost:3001/api/players/${p.id}`} name={p.name} key={p.id} /></li>
  })
  
  return <div>
    <h1>Players List:</h1>
    <ol id="players-list">
       {playersList}
    </ol>
  </div>;
};
