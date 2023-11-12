import { combineReducers } from 'redux';
import SdkReadySlice from "../slices/SdkReady";

const Reducer = combineReducers({
  SdkReady: SdkReadySlice.reducer,
});


export type RootState = ReturnType<typeof Reducer>;
export default Reducer;
