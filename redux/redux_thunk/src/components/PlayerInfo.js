/** @format COMPONENTS */

import { useDispatch, useSelector } from "react-redux";
import { deleteSelectedPlayer } from "../redux/actionCreators/thunks/PlayerInfo";

export const PlayerInfo = () => {
  let playerText = "";
  let playerComponent = <></>;

  const dispatch = useDispatch();

  const player = useSelector((state) => {
    return state.selectedPlayer;
  });

  const handleDelete = async (id) => {
    dispatch(deleteSelectedPlayer(id));
  };

  if (Object.keys(player).length > 0) {
    playerText = player?.isActive ? "active" : "not active";

    playerComponent = (
      <div id="selected-player">
        <h1>Selected Player</h1>
        <div className="player-id">{player?.id}</div>
        <div className="player-name">{player?.name}</div>
        <div className="player-status">{playerText}</div>
        <button id="delete-btn" onClick={(e) => handleDelete(player?.id)}>
          Delete
        </button>
      </div>
    );
  }

  return <>{playerComponent}</>;
};
