import { createSlice } from '@reduxjs/toolkit'

const PlayStateSlice = createSlice({
  name: 'PlayState',
  initialState: {
    AlbumCover: '',
    TrackName: '',
    ArtistName: '',
    Duration: 0,
    NowPlayPosition: 0,
    VolumeRange: 100,
    isCoverToggle: false,
    IsPlay: false,
    IsPause: true,
    volumeBtn: '',
  },
  reducers:{
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

    NowPlayChange(state, action){
      state.NowPlayPosition = action.payload.position;
    },

    setVolume(state, action){
      state.VolumeRange = action.payload
    },

    volumeControl(state, action){

      if(action.payload < 1){
        state.VolumeRange = 100
      }
      // if(action.payload > 1 && action.payload <= 50 ){
      //   state.VolumeRange = 100
      // }
      if(action.payload > 1 && action.payload <= 100){
        state.VolumeRange = 0
      }

    }

  }
});

export const {
  UpdatePlayerState,
  IsCoverToggle,
  PlayTrack,
  NowPlayChange,
  setVolume,
  volumeControl
} = PlayStateSlice.actions;

export default PlayStateSlice;
