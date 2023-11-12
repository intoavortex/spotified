import { createSlice } from '@reduxjs/toolkit'

const SdkReadySlice = createSlice({
  name: 'SdkReady',
  initialState: {
    isSdkReady: false
  },
  reducers:{
    SDKREADY (state, action){
      state.isSdkReady = action.payload
    },
  }
});

export const { SDKREADY } = SdkReadySlice.actions;

export default SdkReadySlice;
