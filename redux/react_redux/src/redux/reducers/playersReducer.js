/** @format REDUCERS*/

import { ADD_PLAYER, REMOVE_PLAYER } from '../constants';

export const initialState = {
	players: []
};

export function playersReducer(state = initialState, action) {

  if (Array.isArray(state))
  {
    console.log("MORPHING STATE TO CORRECT FORM");
    state = {
      players: state
    }
  }
	
  switch (action.type) {
	  case ADD_PLAYER:

      console.log("ADD PLAYER", state.players);

		  const player = {
			  ...action.payload,
			  id: state.players.length
		  }

		  return {
			  ...state,
			  players: [...state.players, player]
		  }
      
    case REMOVE_PLAYER:
      
      return {
        ...state,
			  players:[...state.players].filter(i => parseInt(i.id) != parseInt(action.payload))
		  }
   
    
    default:
      return state
  }
};


