export const PlayerInfo = ({ player, handleDelete }) => {
    
  return <div id="selected-player">
    <h1>Selected Player</h1>
    <div id="player-id">{player.id}</div>
    <div id="player-name">{player.name}</div>
    <div id="player-status">{player.active? "active": "not active"}</div>
  </div>
};
