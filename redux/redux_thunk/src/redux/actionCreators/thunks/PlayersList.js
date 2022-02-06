/** @format THUNK*/

import { ERROR, LOADING, READY } from "../../constants";
import { setPlayers } from "../playersActions";
import { setStatus } from "../statusActions";

/**
 * @description thunk for getting all players.
 * Whenever called, dispatches
 * - setStatus-action with "LOADING"-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with "READY" string as param,
 * - setPlayers-action with response array as param
 * If Fetch fails, Dispatches:
 * - setStatus-action with "ERROR" string as param
 * @return {Function} - thunk
 */
export const getPlayers = () => {
  return (dispatch, getState) => {
    dispatch(setStatus(LOADING));
    fetch("/api/players", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (res) => {
          dispatch(setStatus(READY));
          dispatch(setPlayers(res));
        },
        (error) => {
          dispatch(setStatus(ERROR));
        }
      );
  };
};
