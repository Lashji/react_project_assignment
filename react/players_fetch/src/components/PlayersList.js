import { PlayerLink } from './PlayerLink';

export const PlayersList = ({ players, onClick }) => {
  console.log("players", players);

  let playersList = <></>

  if (players)
  {
      playersList = players.map(p => {
        return <li id={`player-${p.id}` } key={p.id}><PlayerLink onClick={onClick} url={`/api/players/${p.id}`} name={p.name}  /></li>
      })
  } 
  
  return <div>
    <h1>Players List:</h1>
    <ol id="players-list">
       {playersList}
    </ol>
  </div>;
};
