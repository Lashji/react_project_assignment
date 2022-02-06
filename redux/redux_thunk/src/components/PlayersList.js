/** @format COMPONENTS */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlayers } from "../redux/actionCreators/thunks/PlayersList";

import { PlayerLink } from "./PlayerLink";

export const PlayersList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlayers());
  }, []);

  const players = useSelector((state) => {
    console.log("players", state);
    return state.players;
  });

  let playersList = <></>;

  if (players) {
    playersList = players?.map((p) => {
      return (
        <li id={`player-${p.id}`} key={p.id}>
          <PlayerLink url={`/api/players/${p.id}`} name={p.name} />
        </li>
      );
    });
  }

  return (
    <div>
      <h1>Players List:</h1>
      <ol id="players-list">{playersList}</ol>
    </div>
  );
};
