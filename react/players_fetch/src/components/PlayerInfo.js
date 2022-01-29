export const PlayerInfo = ({ player }) => {
  let playerText = "";
  if (player) {
    playerText = player?.isActive ? "active" : "not active";
  }

  return (
    <div id="selected-player">
      <h1>Selected Player</h1>
      <div className="player-id">{player?.id}</div>
      <div className="player-name">{player?.name}</div>
      <div className="player-status">{playerText}</div>
    </div>
  );
};
