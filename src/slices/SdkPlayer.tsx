import { createSlice } from '@reduxjs/toolkit'

const SdkPlayerSlice = createSlice({
  name: 'SdkReady',
  initialState: {
    sdkPlayer: false
  },
  reducers:{
    SDKPLAYER (state, action){
      state.sdkPlayer = action.payload
    },
  }
});

export const { SDKPLAYER } = SdkPlayerSlice.actions;

export default SdkPlayerSlice;
