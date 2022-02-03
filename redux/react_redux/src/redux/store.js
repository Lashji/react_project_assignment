/** @format STORE */


import { createStore, combineReducers } from 'redux';
import { playersReducer } from './reducers/playersReducer';


const app = combineReducers({playersReducer})

const store = createStore(playersReducer)


export default store