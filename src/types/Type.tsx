export interface TRACKINFORMATION_T {
  TrackName: string,
  AlbumCover: string,
  ArtistName: string,
  AllDuration: number,
  PlayTime: number,
  IsSeeking: number,
  IsPlay: boolean,
}

export interface PLAYERCONTROL_T {
  Volumes: string,
  Repeats: string,
  Likes: boolean,
  Shuffles: boolean,
  IsCoverToggle: boolean,
}

export interface PLAYERSDK_T {
  SpotPlayer: any,
  isSdkReady: boolean
}
