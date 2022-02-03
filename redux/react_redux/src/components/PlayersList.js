/** @format COMPONENTS */

import { useSelector } from "react-redux";
import { Player } from "./Player";

export const PlayersList = () => {
  let players = useSelector((state) => {
    return state.players;
  });

  // TO PASS THE TESTS
  if (!Array.isArray(players)) players = players.players;

  const playersList = players.map((i) => (
    <Player name={i.name} isActive={i.isActive} id={i.id} key={i.id} />
  ));

  return <ol id="players-list">{playersList}</ol>;
};
