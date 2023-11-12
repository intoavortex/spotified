import { createSlice } from '@reduxjs/toolkit'

const SdkReadySlice = createSlice({
  name: 'SdkReady',
  initialState: {
    isSdkReady: false
  },
  reducers:{
    SDKREADY (state){
      state.isSdkReady = true;
    },
  }
});

export const { SDKREADY } = SdkReadySlice.actions;

export default SdkReadySlice;
