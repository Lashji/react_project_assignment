/** @format THUNK*/

import { ERROR, LOADING, READY } from "../../constants";
import { removePlayer } from "../playersActions";
import { clearSelectedPlayer } from "../selectedPlayerActions";
import { setStatus } from "../statusActions";

/**
 * @description thunk for deleting the selected player.
 * Upon starting, Dispatches
 * - setStatus-action with "LOADING"-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with "READY" string as param,
 * - removePlayer-action with selectedPlayer.id as param
 * - clearSelectedPlayer-action with no parameters
 *
 *  Else Fetch fails, Dispatches:
 * - setStatus-action with "ERROR" string as param
 * @return {Function} - thunk
 */
export const deleteSelectedPlayer = (id) => {
  return function (dispatch, getState) {
    dispatch(setStatus(LOADING));

    fetch(`/api/players/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          dispatch(removePlayer(id));
          dispatch(clearSelectedPlayer());
          dispatch(setStatus(READY));
        },
        (error) => {
          dispatch(setStatus(ERROR));
        }
      );
  };
};
