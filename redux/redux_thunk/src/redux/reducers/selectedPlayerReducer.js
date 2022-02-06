/** @format REDUCERS*/

import { CLEAR_SELECTED_PLAYER, SET_SELECTED_PLAYER } from '../constants';

const selectedPlayerReducer = (state = {}, action) => {

    switch(action.type)
    {
        case SET_SELECTED_PLAYER: 
            return action.payload
            
        
        
        case CLEAR_SELECTED_PLAYER:
            return {}
            
        default: 
            return state
    }

};

export default selectedPlayerReducer;
