export const PlayerInfo = ({ player, handleDelete}) => {
  console.log("player", player);

  let playerText = "";
  let playerComponent =<></>

  if (player) {
    playerText = player?.isActive ? "active" : "not active";

    playerComponent = (
      <div id="selected-player">
        <h1>Selected Player</h1>
        <div className="player-id">{player?.id}</div>
        <div className="player-name">{player?.name}</div>
        <div className="player-status">{playerText}</div>
        <button id="delete-btn" onClick={e => handleDelete(player?.id)}>Delete</button>
      </div>  
    )

  }

  return (  
    <>
    {playerComponent}
    </>
  );
};
