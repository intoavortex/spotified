import { combineReducers } from 'redux';
import SdkReadySlice from "../slices/SdkReady";
import SdkPlayerSlice from "../slices/SdkPlayer";

const Reducer = combineReducers({
  SdkReady: SdkReadySlice.reducer,
  SdkPlayer: SdkPlayerSlice.reducer,
});


export default Reducer;
