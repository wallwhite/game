import { combineReducers } from 'redux';
import game from './game';

const reducers = {
    game,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
