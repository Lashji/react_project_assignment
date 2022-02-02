import * as actions from './actionTypes.js';

export default (state = [], action) => {

  switch (action.type) {
    case actions.ADD_PLAYER:


      const player = {
        ...action.payload,
        id: state.length +1 
      }

      return [...state, player]
      
    case actions.REMOVE_PLAYER:
      return [...state].filter(i => i.id !== action.payload.id)
     
    case actions.TOGGLE_PLAYER_STATUS:
      return [...state].map(i => {
          if (i.id === action.payload.id) {
            i.isActive = !i.isActive
        }
          return i
        })
      
    
    default:
      return state
  }

};
