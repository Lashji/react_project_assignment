/** @format */

import { INIT_AUTH, REMOVE_AUTH } from "../constants";
/**
 * Implement authReducer that handles following cases:
 * 1) INIT_AUTH: returns the actions payload
 * 2) REMOVE_AUTH: replaces current auth details with guest-role.
 * @param {Object} state old state of auth.
 * @param {Object} action the action that calls the reducer.
 * @returns {Object} new state for auth
 */
const authReducer = (state = {
  role: 'guest'
}, action) => {
  switch (action.type) {
    case INIT_AUTH:
      return action.payload.user;

    case REMOVE_AUTH:
      console.log("REMOVE AUTH")
      return {role: 'quest' };

    default:
      return state;
  }
};

export default authReducer;
