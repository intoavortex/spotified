import { combineReducers } from 'redux';
import Player from "../components/common/Player";

const rootReducer = combineReducers({
  Player
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
