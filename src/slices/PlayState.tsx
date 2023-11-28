import { createSlice } from '@reduxjs/toolkit'

const PlayStateSlice = createSlice({
  name: 'PlayState',
  initialState: {
    AlbumCover: '',
    TrackName: '',
    ArtistName: '',
    Duration: 0,
    NowPlayPosition: 0,
    VolumeRange: 0,
    isCoverToggle: false,
    IsPlay: false,
    IsPause: true,
    IsShuffle: false,
    IsRepeat: 'off',
    volumeBtn: '',
    deviceId: '',
    PlayerToken: '',
  },
  reducers:{
    getUserToken(state, action){
      state.PlayerToken = action.payload
    },

    getDeviceId(state, action){
      state.deviceId = action.payload
    },

    UpdatePlayerState(state, action){
      state.AlbumCover = action.payload.track_window.current_track.album.images[2].url === null? '':action.payload.track_window.current_track.album.images[2].url
      state.TrackName = action.payload.track_window.current_track.name === null? '':action.payload.track_window.current_track.name;
      state.ArtistName = action.payload.track_window.current_track.artists[0].name === null? '':action.payload.track_window.current_track.artists[0].name;
      // 어떻게 관리할지 고민하기
      state.Duration = action.payload.duration
      state.NowPlayPosition = action.payload.position
    },

    IsCoverToggle(state, action){
      state.isCoverToggle = action.payload
    },

    PlayTrackState(state, action){
      state.Duration = action.payload.duration;
      state.NowPlayPosition = action.payload.position;
    },

    PlayTrack(state, action){
      state.IsPause = action.payload;
    },

    ShuffleTrack(state, action){
      state.IsShuffle = action.payload;
    },

    NowPlayChange(state, action){
      state.NowPlayPosition = action.payload.position;
    },

    setVolume(state, action){

      state.VolumeRange = action.payload
      console.log(action.payload);
      console.log(state.VolumeRange);
    },

    volumeControl(state, action){

      // if(action.payload > 1 && action.payload <= 50 ){
        //   state.VolumeRange = 100
        // }
        if(action.payload > 1 && action.payload <= 100){
          state.VolumeRange = 0
        }
        if(action.payload < 1){
          state.VolumeRange = 100
        }

    },

    SetRepeat(state, action){
      if(action.payload === 'off') { state.IsRepeat = 'context' }
      if(action.payload === 'context') { state.IsRepeat = 'track' }
      if(action.payload === 'track') { state.IsRepeat = 'off' }
    }

  }
});

export const {
  UpdatePlayerState,
  IsCoverToggle,
  PlayTrack,
  NowPlayChange,
  setVolume,
  volumeControl,
  getUserToken,
  getDeviceId,
  ShuffleTrack,
  SetRepeat,
} = PlayStateSlice.actions;

export default PlayStateSlice;
