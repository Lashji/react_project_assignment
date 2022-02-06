/** @format THUNK*/

import { ERROR, LOADING, READY } from "../../constants";
import { addPlayer } from "../playersActions";
import { clearSelectedPlayer } from "../selectedPlayerActions";
import { setStatus } from "../statusActions";

/**
 * @description thunk for posting a new player.
 * Upon starting, Dispatches
 * - setStatus-action with "LOADING"-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with "READY" string as param,
 * - addPlayer-action with returned player-object
 * - clearSelectedPlayer-action with no parameters
 *
 *  Else Fetch fails, Dispatches:
 * - setStatus-action with "ERROR" string as param
 * @param {Object} newPlayer -  The player to be added
 * @return {Function} - thunk
 */
export const postPlayer = (newPlayer) => {
  return function (dispatch, getState) {
    
    dispatch(setStatus(LOADING));

    fetch("/api/players", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newPlayer),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          dispatch(setStatus(READY));
          dispatch(addPlayer(result));
          dispatch(clearSelectedPlayer());
        },
        (error) => {
          dispatch(setStatus(ERROR));
        }
      );
  };
};
