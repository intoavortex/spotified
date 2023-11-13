import { createSlice } from '@reduxjs/toolkit'

const PlayStateSlice = createSlice({
  name: 'PlayState',
  initialState: {
    AlbumCover: '',
    TrackName: '',
    ArtistName: '',
    Duration: 0,
    // PlayTime: 0,
    // IsSeeking: 0,
    IsPlay: false,
    IsPause: true,
    // Shuffles: false,
    // Repeats: '',
  },
  reducers:{
    UpdatePlayerState (state, action){
      state.AlbumCover = action.payload.track_window.current_track.album.images[2].url === null? '':action.payload.track_window.current_track.album.images[2].url
      state.TrackName = action.payload.track_window.current_track.name === null? '':action.payload.track_window.current_track.name;
      state.ArtistName = action.payload.track_window.current_track.artists[0].name === null? '':action.payload.track_window.current_track.artists[0].name;
      state.Duration = action.payload.duration;
      // state.IsPause === true? setIsPlay(false) : setIsPlay(true);
    },
  }
});

export const { UpdatePlayerState } = PlayStateSlice.actions;

export default PlayStateSlice;
