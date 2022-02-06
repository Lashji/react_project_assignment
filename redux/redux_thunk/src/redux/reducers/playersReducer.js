/** @format REDUCERS*/

import { ADD_PLAYER, REMOVE_PLAYER, SET_PLAYERS } from '../constants';

const defaultState = [];

const playersReducer = (state = defaultState, action) => {
	switch (action.type) {

		case ADD_PLAYER: 
			return [...state, action.payload]

		case SET_PLAYERS:
				
			return action.payload?action.payload: []
		
		case REMOVE_PLAYER:
			return [...state].filter(i => i.id !== action.payload)
		
		default:
			return state
	}
};

export default playersReducer;
