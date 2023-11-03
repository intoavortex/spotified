import { configureStore, createSlice } from '@reduxjs/toolkit'
import { TRACKINFORMATION_T, PLAYERCONTROL_T, PLAYERSDK_T } from '../types/Type'

/**
 * PLAYTRACK
 * - 트랙 이름: TrackName
 * - 앨범 커버: AlbumCover
 * - 가수 정보: ArtistName
 * - 곡의 전체 시분초: Duration
 * - 현재 재생 시분초: PlayTime
 * - 구간 찾기: IsSeeking
 * - 플레이 중인지 아닌지 여부: IsPlay
*/
let PLAYTRACKINFO = createSlice({
  name: 'PLAYTRACKINFO',
  initialState: {
    TrackName: '',
    AlbumCover: '',
    ArtistName: '',
    Duration: 0,
    PlayTime: 0,
    IsSeeking: 0,
    IsPlay: false,
    Shuffles: false,
    Repeats: '',
  },
});

/**
 * PLAYCONTROL
 * - 볼륨
 * - 반복
 * - 좋아요 여부
 * - 랜덤 재생
 * - 커버 토글
 */
let PLAYCONTROL = createSlice({
  name: 'PLAYCONTROL',
  initialState: {
    Volumes: '',
    Likes: false,
    IsCoverToggle: false,
  },
});

/**
 * PLAYERSDK
 * - Player
 * - SDK ready
 */
let PLAYERSDK = createSlice({
  name: 'PLAYERSDK',
  initialState: {
    SpotPlayer: '',
    isSdkReady: false
  },
});

export default configureStore({
  reducer: {
    PLAYTRACKINFO : PLAYTRACKINFO.reducer,
    PLAYCONTROL: PLAYCONTROL.reducer,
    PLAYERSDK: PLAYERSDK.reducer
  }
})
