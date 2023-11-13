import { combineReducers } from 'redux';
import SdkReadySlice from "../slices/SdkReady";
import SdkPlayerSlice from "../slices/SdkPlayer";
import PlayStateSlice from "../slices/PlayState";

const Reducer = combineReducers({
  SdkReady: SdkReadySlice.reducer,
  SdkPlayer: SdkPlayerSlice.reducer,
  playState: PlayStateSlice.reducer,
});


export default Reducer;
