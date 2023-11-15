import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux"
import styled from 'styled-components';
import axios from 'axios';

import { RootState } from "../../types/Type";
import { SDKREADY } from "../../slices/SdkReady";
import { UpdatePlayerState } from "../../slices/PlayState";

import playTrackInfo from "../../js/api/playTrackInfo";

import PlayInfo from '../player/layout/PlayInfo'
import TrackBar from '../player/layout/TrackBar'
import PlayControl from '../player/layout/PlayControl'

const Container = styled.div`
  position:relative;
  /* overflow:hidden; */
  width:100%;
  height:90px;
  background-color:#181818;
  border-top:1px solid #282828;
  box-sizing: border-box;
  color:#fff;
  z-index:10;

  display:flex;
  flex-direction:row;
  flex-wrap:nowrap;
  justify-content:space-between;
  align-items:center;
  padding:0 16px;

  > div{
    width: 100%;
    max-width: 528px;
  }

  > div:first-child + div{
    width:100%;
    max-width:704px;
    /* margin-top:-4px; */
  }

  button .svgIcon{
    transition: all .3s ease;
    fill:hsla(0,0%,100%,.7);
  }
  button:hover .svgIcon{
    fill:#fff;
  }
  button .svgStrokeIcon{
    transition: all .3s ease;
    stroke:hsla(0,0%,100%,.7);
  }
  button:hover .svgStrokeIcon{
    stroke:#fff;
  }

  .playerBarBox:hover a,
  .playerBarBox:hover .svgIcon{
    transition: all .13s ease;
  }
  .playerBarBox:hover a{
    /* background-color:#1ed760; */
    background-color:#feac00;
  }
  .playerBarBox:hover .svgIcon{
    fill:#fff;
  }

  .playerBarBox:hover > div > div{
    opacity:1;
    transition: all .13s ease;
  }
`

const Player = (props) => {
  const isSdkReady = useSelector((state: RootState) => state.SdkReady.isSdkReady);
  const dispatch = useDispatch();
  const [sdkPlayer, setSdkPlayer] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      dispatch(SDKREADY(true));
    };
  }, []);

  const initPlayer = async () => {
    try {
      if (!props.token) {
        console.error('Token is undefined.');
        return;
      }

      const player = new window.Spotify.Player({
        name: 'zei Web Player',
        getOAuthToken: cb => { cb(props.token); },
        volume: 1
      });

      setSdkPlayer(player);

      // player ready
      player.addListener('ready', ({ device_id }) => {
        playTrackInfo(device_id, props.token)
      });

      // state가 변경될 때
      player.addListener('player_state_changed', (state) => {
        if (!state) {
          return;
        }
        // 최근 state 가져오기
        // player.getCurrentState().then( state => {
        //   if (!state) {
        //     console.error('User is not playing music through the Web Playback SDK');
        //     return;
        //   }
        //   console.log('❤️‍🔥 current', state);
        // });
        dispatch(UpdatePlayerState(state))
      });

      // player connect
      player.connect();

    } catch (error) {
      console.error('Error initializing player:', error);
    }
  };

  useEffect(() => {
    if (isSdkReady) {
      initPlayer();
    }
  }, [isSdkReady, props.token]);

  return (
    <Container>
      <PlayInfo />
      <TrackBar player={sdkPlayer} token={props.token}/>
      <PlayControl/>
    </Container>
  );
}

export default Player;
